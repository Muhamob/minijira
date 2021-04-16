class TreeNode {
  constructor (task) {
    this.task = task
    this.subtasks = []
  }
}

const getRoots = (tasks) => {
  return tasks
    .filter(task => !task.hasOwnProperty('parent'))
    .map(task => task._id)
}

export const createTree = (tasks) => {
  const roots = getRoots(tasks)
  const map = new Map()
  tasks.forEach(task => map.set(task._id, task))

  const addSubtasks = (task) => {
    const root = new TreeNode(task)
    const subtasks = map.get(task._id).subtasks

    if (subtasks.size === 0) {
      return root
    } else {
      root.subtasks = subtasks.map(subtask => {
        return addSubtasks(map.get(subtask))
      })
    }

    return root
  }

  return roots.map(root => addSubtasks(map.get(root)))
}
