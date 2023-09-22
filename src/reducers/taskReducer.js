import { createSlice, nanoid } from '@reduxjs/toolkit'

const date = new Date()

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  filteredTasks: [],
  editId: '',
  filterStatus: false,
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, { payload }) => {
      const { title, description } = payload
      if (!title) {
        return
      }
      if (state.editId) {
        state.tasks = state.tasks.map((task) =>
          task.id !== state.editId ? task : { ...task, title, description }
        )
        state.editId = ''
      } else {
        const task = {
          id: nanoid(15),
          title,
          description,
          status: false,
          createdAt: date.toLocaleString(),
        }
        state.tasks.push(task)
      }
    },
    deleteTask: (state, { payload }) => {
      state.tasks = state.tasks.filter((task) => {
        return task.id !== payload
      })
    },
    setEdit: (state, { payload }) => {
      state.editId = payload
    },
    toggleStatus: (state, { payload }) => {
      state.tasks = state.tasks.map((task) => {
        return task.id === payload ? { ...task, status: !task.status } : task
      })
    },
    setFilteredTasks: (state) => {
      state.filteredTasks = state.tasks
    },
    filterCompleted: (state) => {
      state.filteredTasks = state.tasks.filter((task) => task.status === true)
      state.filterStatus = true
    },
    filterNotCompleted: (state) => {
      state.filteredTasks = state.tasks.filter((task) => task.status === false)
      state.filterStatus = true
    },
    clearFilter: (state) => {
      state.filteredTasks = state.tasks
      state.filterStatus = false
    },
  },
})

export const {
  addTask,
  deleteTask,
  setEdit,
  toggleStatus,
  filterCompleted,
  clearFilter,
  setFilteredTasks,
  filterNotCompleted,
} = taskSlice.actions
export default taskSlice.reducer
