import { useSelector } from 'react-redux'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import { useEffect, useRef } from 'react'

function App() {
  const inputRef = useRef()

  const { tasks } = useSelector((state) => state)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <div className="lg:px-4 lg:mx-4  px-1 m-1">
      <div>
        <h1 className="font-semibold text-center text-2xl">Task Tracker</h1>
        <TaskInput inputRef={inputRef} />
      </div>
      <TaskList inputRef={inputRef} />
    </div>
  )
}

export default App
