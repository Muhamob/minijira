class TreeNode {
    constructor(task) {
        this.task_id = task._id;
        this.task = task;
        this.subtasks = [];
    }
}

const getRoots = (tasks) => {
    const allParents = new Set(tasks.map((task) => task._id));
    const allChildren = new Set(tasks.reduce((acc, task) => {
        return task.subtasks.size !== 0 ? acc.concat(task.subtasks) : acc;
    }, []));

    return [...allParents].filter(x => !allChildren.has(x));
}

export const createTree = (tasks) => {
    const roots = getRoots(tasks);
    const map = new Map();
    tasks.forEach(task => map.set(task._id, task));

    const createTree_ = (task) => {
        const root = new TreeNode(task);
        const subtasks = map.get(task._id).subtasks;

        if (subtasks.size === 0) {
            return root;
        } else {
            root.subtasks = subtasks.map(subtask => {
                return createTree_(map.get(subtask));
            });
        }

        return root;
    }

    const treeRoots = [];
    for (const root of roots) {
        treeRoots.push(createTree_(map.get(root)));
    }
    return treeRoots;
}
