const dogpileMitigationDecorator = require('../../../lib/utilities/dogpile');
const { wait } = require('../../helpers/test-utils');
const { ERROR_EXPECTED_BUT_NOT_THROWN } = require('../../helpers/constants');

describe('Dogpile Mitigation Decorator', () => {
    describe('when a single call is made to the wrapped function', () => {
        it('should wrap a function without changing the result', async () => {
            const fReturn10 = jest.fn().mockReturnValue(10);
            const fWrapped = dogpileMitigationDecorator(fReturn10);
            const result = await fWrapped();

            expect(fReturn10).toHaveBeenCalledTimes(1);
            expect(result).toEqual(10);
        });

        it('should wrap an async function without changing the result', async () => {
            const fReturn10 = jest.fn().mockResolvedValue(10);
            const fWrapped = dogpileMitigationDecorator(fReturn10);
            const result = await fWrapped();

            expect(fReturn10).toHaveBeenCalledTimes(1);
            expect(result).toEqual(10);
        });

        it('should pass the arguments to the wrapped function', async () => {
            const fReturn10 = jest.fn().mockResolvedValue(10);
            const fWrapped = dogpileMitigationDecorator(fReturn10);
            const result = await fWrapped("some-arg");

            expect(fReturn10).toHaveBeenCalledTimes(1);
            expect(fReturn10).toHaveBeenCalledWith("some-arg");
            expect(result).toEqual(10);
        });

        describe('and the wrapped function is a failed promise', () => {
            it('should pass the promise rejection to the handler', async () => {
                const testError = new Error("test-message");
                const fReturnReject = jest.fn().mockRejectedValue(testError);
                const fWrapped = dogpileMitigationDecorator(fReturnReject);

                try {
                    await fWrapped();
                } catch (err) {
                    expect(fReturnReject).toHaveBeenCalledTimes(1);
                    expect(err).toEqual(testError);
                    return;
                }
                throw ERROR_EXPECTED_BUT_NOT_THROWN;
            });
        });
    });

    describe('when multiple calls made before returning', () => {
        it('only calls the underlying function once', async () => {
            const fReturn10 = jest.fn().mockImplementation(async () => {
                await wait(500);
                return 10;
            });
            const fWrapped = dogpileMitigationDecorator(fReturn10);
            const results = await Promise.all([fWrapped(), fWrapped(), fWrapped()]);

            expect(fReturn10).toHaveBeenCalledTimes(1);
            expect(results).toEqual([10, 10, 10]);
        });

        describe('and the wrapped function is a failed promise', () => {
            it('should pass the promise rejection to all handlers', async () => {
                const testError = new Error("test-message");
                const fReturnReject = jest.fn().mockImplementation(async () => {
                    await wait(500);
                    throw testError;
                });
                const fWrapped = dogpileMitigationDecorator(fReturnReject);

                try {
                    await Promise.all([fWrapped(), fWrapped(), fWrapped()]);
                } catch (err) {
                    expect(fReturnReject).toHaveBeenCalledTimes(1);
                    expect(err).toEqual(testError);
                    return;
                }
                throw ERROR_EXPECTED_BUT_NOT_THROWN;
            });
        });
    });
});