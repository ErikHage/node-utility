const Stack = require('../../../../lib/data-structures/stack/stack');
const { ERROR_EXPECTED_BUT_NOT_THROWN } = require('../../../helpers/constants');

describe('Stack', () => {
    let stack;

    beforeEach(() => {
        stack = new Stack();
    });

    describe('#isEmpty', () => {
        it('should return true when no items in stack', () => {
            expect(stack.isEmpty()).toBeTruthy();
        });

        it('should return false when items in stack', () => {
            stack.push('first');
            expect(stack.isEmpty()).toBeFalsy();
        });
    });

    describe('#push', () => {
        it('should add item to the stack', () => {
            stack.push('first');
            expect(stack.size()).toEqual(1);
        });
    });

    describe('#pop', () => {
        it('should remove last item added to the stack', () => {
            stack.push('first');
            stack.push('second');
            expect(stack.pop()).toEqual('second');
            expect(stack.pop()).toEqual('first');
        });

        it('should throw UNDERFLOW_ERROR if no items in stack', () => {
            try {
                stack.pop();
            } catch (err) {
                expect(err.code).toEqual('STACK_UNDERFLOW_ERROR');
                return;
            }
            throw ERROR_EXPECTED_BUT_NOT_THROWN;
        });
    });

    describe('#print', () => {
        it('should return the contents of the stack as a string', () => {
            stack.push('first');
            stack.push('second');

            const result = stack.print();

            expect(result).toEqual('0: first\n1: second\n');
        });
    });
});