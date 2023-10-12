import { createSlice, nanoid } from '@reduxjs/toolkit'
import scheduleTaskNotification from '../helpers/notification'

const date = new Date()

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  filteredTasks: [],
  editId: '',
  filterStatus: false,
  sortItems: 'none',
  sortStatus: false,
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

      scheduleTaskNotification(title)
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
    setSort: (state, { payload }) => {
      state.sortItems = payload
    },
    sort: (state) => {
      switch (state.sortItems) {
        case 'ascending': {
          state.filteredTasks.sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt)
          })
          break
        }

        case 'descending': {
          state.filteredTasks.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
          })
          break
        }

        default:
          state.filteredTasks = state.tasks
      }
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
  setSort,
  sort,
} = taskSlice.actions
export default taskSlice.reducer
