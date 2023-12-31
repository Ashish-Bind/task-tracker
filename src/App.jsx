import { useDispatch, useSelector } from 'react-redux'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import { useEffect } from 'react'
import { setFilteredTasks, sort } from './reducers/taskReducer'

function App() {
  const { tasks, sortItems } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    dispatch(setFilteredTasks())
  }, [tasks])

  useEffect(() => {
    dispatch(sort())
  }, [sortItems])

  return (
    <div className="lg:px-4 lg:mx-4  px-3 m-1">
      <div>
        <h1 className="font-semibold text-center text-4xl">Task Tracker</h1>
        <TaskInput />
      </div>
      <hr className="my-4" />
      <TaskList />
    </div>
  )
}

export default App
