/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'
import Task from './Task'
import { NotFound } from '../icons/Icons'

function TaskList({ inputRef }) {
  const { filteredTasks } = useSelector((state) => state)

  return (
    <div>
      <h2 className="text-2xl font-medium">Task List</h2>
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => {
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
