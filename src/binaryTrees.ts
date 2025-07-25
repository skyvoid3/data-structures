//@ts-ignore
class TreeNode<T> {
    value: T;
    left: TreeNode<T> | null = null;
    right: TreeNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

class BinaryTree<T> {
    private root: TreeNode<T> | null = null;
    private nodes: number = 0;

    constructor(value?: T) {
        if (value !== undefined) {
            this.root = new TreeNode(value);
        } else {
            this.root = null;
        }
    }

    // Inserts new nodes by filling each level from left to right,
    // placing the new node in the first available left or right child position.
    insert(value: T): void {
        const newNode = new TreeNode(value);
        if (this.root === null) {
            this.root = newNode;
            this.nodes++;
            return;
        }

        // Use a queue to perform a level-order (BFS) traversal,
        // searching for the first available spot to insert the new node.
        // This ensures nodes fill each level from left to right before moving deeper.
        const queue: TreeNode<T>[] = [this.root];

        while (queue.length > 0) {
            const current = queue.shift()!;

            if (current.left === null) {
                current.left = newNode;
                this.nodes++;
                return;
            } else {
                queue.push(current.left);
            }

            if (current.right === null) {
                current.right = newNode;
                this.nodes++;
                return;
            } else {
                queue.push(current.right);
            }
        }
    }

    // Finds the deepest, rightmost node in the tree,
    // swaps its value with the node that needs to be deleted,
    // then removes the deepest, rightmost node from the tree.
    deleteNode(value: T): boolean {
        if (!this.root) {
            return false;
        }

        let nodeToDelete: TreeNode<T> | null = null;
        let deepest: TreeNode<T> | null = null;

        let queue: TreeNode<T>[] = [this.root];

        while (queue.length > 0) {
            let current = queue.shift()!;

            if (current.value === value) {
                nodeToDelete = current;
            }

            if (current.left) {
                queue.push(current.left);
            }

            if (current.right) {
                queue.push(current.right);
            }

            deepest = current;
        }

        if (nodeToDelete && deepest) {
            nodeToDelete.value = deepest.value;

            return this.deleteDeepest(this.root, deepest) ? true : false;
        } else {
            return false;
        }
    }

    // Recursively searches for the deepest rightmost node in the tree,
    // and deletes it by setting its parent's reference to null.
    // Returns true once the node has been deleted, otherwise false.
    private deleteDeepest(
        node: TreeNode<T> | null,
        deepest: TreeNode<T>,
    ): boolean {
        if (!node) {
            return false;
        }

        if (node.left === deepest) {
            node.left = null;
            return true;
        } else if (node.right === deepest) {
            node.right = null;
            return true;
        }

        if (this.deleteDeepest(node.left, deepest)) {
            return true;
        }

        if (this.deleteDeepest(node.right, deepest)) {
            return true;
        }

        return false;
    }

    getDepth(): number {
        function getDepthRecursively(node: TreeNode<T> | null): number {
            if (!node) return -1;

            const leftDepth = getDepthRecursively(node.left);
            const rightDepth = getDepthRecursively(node.right);

            return 1 + Math.max(leftDepth, rightDepth);
        }

        return getDepthRecursively(this.root);
    }

    getBranchCount(): number {
        return this.nodes - 1;
    }

    getNodeCount(): number {
        return this.nodes;
    }

    // Return trees values in an array sorted in preorder method (root->left->right)
    preOrderTraversal(): T[] {
        if (!this.root) {
            return [];
        }

        let result: T[] = [];

        function traverse(node: TreeNode<T> | null): void {
            if (!node) return;

            result.push(node.value);
            traverse(node.left);
            traverse(node.right);
        }

        traverse(this.root);
        return result;
    }

    // Return trees values in an array sorted in inorder method (left->root->right)
    inOrderTraversal(): T[] {
        if (!this.root) {
            return [];
        }

        let result: T[] = [];

        function traverse(node: TreeNode<T> | null): void {
            if (!node) return;

            traverse(node.left);
            result.push(node.value);
            traverse(node.right);
        }

        traverse(this.root);
        return result;
    }

    // Return trees values in an array sorted in postorder method (left->right->root)
    postOrderTraversal(): T[] {
        if (!this.root) {
            return [];
        }

        let result: T[] = [];

        function traverse(node: TreeNode<T> | null): void {
            if (!node) return;

            traverse(node.left);
            traverse(node.right);
            result.push(node.value);
        }

        traverse(this.root);
        return result;
    }
}

class BinarySearchTree<T> {
    private root: TreeNode<T> | null = null;
    private nodes: number = 0;

    constructor(value?: T) {
        if (value !== undefined) {
            this.root = new TreeNode(value);
        } else {
            this.root = null;
        }
    }

    private insertRecursively(
        node: TreeNode<T>,
        newNode: TreeNode<T>,
    ): boolean {
        if (newNode.value === node.value) {
            return false;
        }

        if (newNode.value < node.value) {
            if (!node.left) {
                node.left = newNode;
                return true;
            } else {
                return this.insertRecursively(node.left, newNode);
            }
        } else {
            if (!node.right) {
                node.right = newNode;
                return true;
            } else {
                return this.insertRecursively(node.right, newNode);
            }
        }
    }

    insert(value: T): boolean {
        const newNode = new TreeNode(value);
        if (!this.root) {
            this.root = newNode;
            this.nodes++;
            return true;
        }

        const inserted = this.insertRecursively(this.root, newNode);
        if (inserted) {
            this.nodes++;
            return true;
        }
        return false;
    }

    search(value: T): boolean {
        let current = this.root;
        while (current) {
            if (value === current.value) return true;
            current = value < current.value ? current.left : current.right;
        }
        return false;
    }

    private deleteRecursively(
        node: TreeNode<T> | null,
        value: T,
    ): TreeNode<T> | null {
        if (!node) return null;

        if (value < node.value) {
            node.left = this.deleteRecursively(node.left, value);
        } else if (value > node.value) {
            node.right = this.deleteRecursively(node.right, value);
        } else {
            // Case 1: No children
            if (!node.left && !node.right) {
                return null;
            }

            // Case 2: One child
            if (!node.left) return node.right;
            if (!node.right) return node.left;

            // Case 3: Two children
            const minNode = this.findMin(node.right);
            node.value = minNode.value;
            node.right = this.deleteRecursively(node.right, minNode.value);
        }

        return node;
    }

    private findMin(node: TreeNode<T>): TreeNode<T> {
        while (node.left) {
            node = node.left;
        }
        return node;
    }

    deleteNode(value: T): boolean {
        const exists = this.search(value);
        if (!exists) return false;

        this.root = this.deleteRecursively(this.root, value);
        this.nodes--;
        return true;
    }

    // Returns an array of the trees values (inOrderTraversal or from lowest to highest value)
    toArray(): T[] {
        const result: T[] = [];

        function traverse(node: TreeNode<T> | null): void {
            if (!node) return;
            traverse(node.left);
            result.push(node.value);
            traverse(node.right);
        }

        traverse(this.root);
        return result;
    }

    preOrderTraversal() {}
    inOrderTraversal() {}
    postOrderTraversal() {}
    clear() {}
    getNodeCount() {}
    min() {}
    max() {}
    depth() {}
}

const BSTRoot = new BinarySearchTree(1);

for (let i = 0; i < 500; i++) {
    BSTRoot.insert(i + 1);
}

console.log(BSTRoot.toArray());
