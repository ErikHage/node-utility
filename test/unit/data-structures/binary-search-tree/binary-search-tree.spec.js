const BinarySearchTree = require('../../../../lib/data-structures/binary-search-tree/binary-search-tree');

describe('Binary Search Tree', () => {
    let tree;

    beforeEach(() => {
        tree = new BinarySearchTree();
    });

    describe('#insert', () => {
        it('should insert the record into the tree', () => {
            tree.insert(5);

            const root = tree.getRootNode();
            expect(root.data).toEqual(5);
        });

        it('should insert multiple records into the tree', () => {
            tree.insert(50);
            tree.insert(11);
            tree.insert(5);
            tree.insert(70);
            tree.insert(75);

            const root = tree.getRootNode();
            expect(root.data).toEqual(50);
            expect(root.left.data).toEqual(11);
            expect(root.left.left.data).toEqual(5);
            expect(root.right.data).toEqual(70);
            expect(root.right.right.data).toEqual(75);
        });
    });

    describe('#remove', () => {
        describe('when root is undefined', () => {
            it('should do nothing', () => {
                tree.remove(1);

                expect(tree.getRootNode()).toBeNull();
            });
        });

        describe('when one record in tree', () => {
            it('should remove the record', () => {
                tree.insert(5);
                expect(tree.root.data).toEqual(5);

                tree.remove(5);
                expect(tree.root).toBeNull();
            });
        });

        describe('when multiple records in tree', () => {
            it('should remove the records', () => {
                tree.insert(50);
                tree.insert(11);
                tree.insert(5);
                tree.insert(70);
                tree.insert(75);

                tree.remove(5);
                expect(tree.root.left.left).toBeNull();

                tree.remove(75);
                expect(tree.root.right.right).toBeNull();
            });

            it('should fix up the tree when non-leaf removed', () => {
                tree.insert(50);
                tree.insert(11);
                tree.insert(5);
                tree.insert(70);
                tree.insert(75);

                tree.remove(11);
                expect(tree.root.left.data).toEqual(5);

                tree.remove(70);
                expect(tree.root.right.data).toEqual(75);
            });
        });
    });

    describe('traversals should print the tree without error', () => {
        it('should print in order traversal', () => {
            tree.insert(50);
            tree.insert(11);
            tree.insert(5);
            tree.insert(70);
            tree.insert(75);

            tree.inorder(tree.root);
        });

        it('should print pre order traversal', () => {
            tree.insert(50);
            tree.insert(11);
            tree.insert(5);
            tree.insert(70);
            tree.insert(75);

            tree.preorder(tree.root);
        });

        it('should print post order traversal', () => {
            tree.insert(50);
            tree.insert(11);
            tree.insert(5);
            tree.insert(70);
            tree.insert(75);

            tree.postorder(tree.root);
        });
    });
});