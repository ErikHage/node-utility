const evaluator = require('../../../../lib/math/expression/evaluator');

const cases = [
    {
        input: '10 + 2',
        expectedResult: 12,
    },
    {
        input: '10 - 2',
        expectedResult: 8,
    },
    {
        input: '10 * 2',
        expectedResult: 20,
    },
    {
        input: '10 / 2',
        expectedResult: 5,
    },
    {
        input: '10 + 2 * 6',
        expectedResult: 22,
    },
    {
        input: '100 * 2 + 12',
        expectedResult: 212,
    },
    {
        input: '10 - 2 * 6',
        expectedResult: -2,
    },
    {
        input: '5 * 10 - 2 * 6 + 100',
        expectedResult: 138,
    },
    {
        input: '5 * 10 * 2 - 2 * 6 + 100',
        expectedResult: 188,
    },
    {
        input: '10 / 5 * 2 + 100',
        expectedResult: 104,
    },
];

describe('String Expression Evaluator', () => {
    cases.forEach(c => {
        it(`when given ${c.input}, expect ${c.expectedResult}`, () => {
            expect(evaluator.evaluate(c.input)).toEqual(c.expectedResult);
        });
    });
});