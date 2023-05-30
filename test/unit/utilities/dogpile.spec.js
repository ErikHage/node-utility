const dogpileMitigationDecorator = require('../../../lib/utilities/dogpile');
const { wait } = require('../../helpers/test-utils');

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
    });
});