/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'
import Task from './Task'
import { NotFound } from '../icons/Icons'

function TaskList({ inputRef }) {
  const { tasks } = useSelector((state) => state)

  return (
    <div>
      <h2 className="text-xl">Task List</h2>
      {tasks.length > 0 ? (
        tasks.map((task) => {
          return <Task key={task.id} {...task} inputRef={inputRef} />
        })
      ) : (
        <div>
          <NotFound />
          <p>No Items</p>
        </div>
      )}
    </div>
  )
}

export default TaskList
