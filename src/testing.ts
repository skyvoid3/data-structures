

 class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

function levelOrder(root: TreeNode | null): number[] {
    const nums: number[] = [];

    if (!root) return nums;

    let queue: TreeNode[] = [root];

    while (queue.length > 0) {
        let current = queue.shift()!;

        nums.push(current.val);

        if (current.left) {
            queue.push(current.left);
        }

        if (current.right) {
            queue.push(current.right);
        }
    }

    return nums;
}

const root = new TreeNode(
    1,
    new TreeNode(
        2,
        new TreeNode(3),
        new TreeNode(4)
    ),
    new TreeNode(
        5,
        null,
        new TreeNode(6)
    )
);

console.log(levelOrder(root)); 

