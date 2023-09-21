import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './reducers/taskReducer'

const taskStore = configureStore({
  reducer: taskReducer,
})

export default taskStore
