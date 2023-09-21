import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  editId: '',
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
  },
})

export const { addTask, deleteTask, setEdit, getTasks } = taskSlice.actions
export default taskSlice.reducer
