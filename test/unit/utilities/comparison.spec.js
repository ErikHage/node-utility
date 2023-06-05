const comparisonUtils = require('../../../lib/utilities/comparison');

describe('Comparison Utils', () => {
    describe('#isSafeEqual', () => {
        it('when both values are undefined', () => {
            expect(comparisonUtils.isSafeEqual(undefined, undefined)).toBeTruthy();
        });

        it('when only one value is undefined', () => {
            expect(comparisonUtils.isSafeEqual(undefined, 1)).toBeFalsy();
            expect(comparisonUtils.isSafeEqual(1, undefined)).toBeFalsy();
        });

        it('when both values are null', () => {
            expect(comparisonUtils.isSafeEqual(null, null)).toBeTruthy();
        });

        it('when only one value is null', () => {
            expect(comparisonUtils.isSafeEqual(null, 1)).toBeFalsy();
            expect(comparisonUtils.isSafeEqual(1, null)).toBeFalsy();
        });

        it('when strings are unequals length', () => {
            expect(comparisonUtils.isSafeEqual("a", "ab")).toBeFalsy();
        });
    });
});