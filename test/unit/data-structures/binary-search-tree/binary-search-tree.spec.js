const BinarySearchTree = require('../../../../lib/data-structures/binary-search-tree/binary-search-tree');

describe('Binary Search Tree', () => {
    let tree;

    beforeEach(() => {
        tree = new BinarySearchTree();
    });

    describe('#insert', () => {
        it('should insert the record into the tree', () => {
            tree.insert(5);

            expect(tree.root.data).toEqual(5);
        });
    });

    describe('#remove', () => {
        describe('when one record in tree', () => {
            it('should remove the record', () => {
                tree.insert(5);
                expect(tree.root.data).toEqual(5);

                tree.remove(5);
                expect(tree.root).toBeNull();
            });
        });
    });
});