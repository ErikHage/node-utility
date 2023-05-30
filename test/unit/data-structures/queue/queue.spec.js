const Queue = require('../../../../lib/data-structures/queue/queue');
const { ERROR_EXPECTED_BUT_NOT_THROWN } = require('../../../helpers/constants');

describe('Queue', () => {
    let queue;

    beforeEach(() => {
        queue = new Queue();
    });

    describe('#isEmpty', () => {
        it('should return true when no items in queue', () => {
            expect(queue.isEmpty()).toBeTruthy();
        });

        it('should return false when items in queue', () => {
            queue.enqueue('first');
            expect(queue.isEmpty()).toBeFalsy();
        });
    });

    describe('#enqueue', () => {
        it('should add an item to the queue', () => {
            queue.enqueue('first');
            expect(queue.isEmpty()).toBeFalsy();
            expect(queue.size()).toEqual(1);
        });
    });

    describe('#peek', () => {
        describe('when queue not empty', () => {
            it('should return the first item', () => {
                queue.enqueue('first');
                queue.enqueue('second');
                expect(queue.peek()).toEqual('first');
            });
        });

        describe('when queue is empty', () => {
            it('should return null', () => {
                expect(queue.peek()).toEqual(null);
            });
        });
    });

    describe('#dequeue', () => {
        describe('when one item in queue', () => {
            it('should return the item', () => {
                queue.enqueue('first');

                expect(queue.dequeue()).toEqual('first');
            });
        });

        describe('when multiple items in queue', () => {
            it('should return the items in the order added', () => {
                queue.enqueue('first');
                queue.enqueue('second');
                queue.enqueue('third');

                expect(queue.dequeue()).toEqual('first');
                expect(queue.dequeue()).toEqual('second');
                expect(queue.dequeue()).toEqual('third');
            });
        });

        describe('when no items in queue', () => {
            it('should throw underflow error', () => {
                try {
                    queue.dequeue();
                } catch (err) {
                    expect(err.code === 'QUEUE_UNDERFLOW_ERROR');
                    return;
                }
                throw ERROR_EXPECTED_BUT_NOT_THROWN;
            });
        });
    });

    describe('#print', () => {
        it('should return the string representation of the queue', () => {
            queue.enqueue('first');
            queue.enqueue('second');

            const result = queue.print();

            expect(result).toEqual('0: first\n1: second\n');
        });
    });
});