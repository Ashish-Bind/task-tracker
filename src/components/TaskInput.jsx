/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addTask,
  clearFilter,
  filterCompleted,
  filterNotCompleted,
} from '../reducers/taskReducer'

function TaskInput({ inputRef }) {
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')

  const { editId, filterStatus } = useSelector((state) => state)
  const dispatch = useDispatch()

  return (
    <div>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder={editId ? 'Edit Title..' : 'Enter task title ...'}
        ref={inputRef}
      />
      <br />
      <textarea
        type="text"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder={
          editId ? 'Edit description..' : 'Enter task description ...'
        }
        className="resize-none"
      />
      <br />
      <div className="flex gap-2 lg:flex-row lg:items-center flex-col text-center">
        <button
          onClick={() => {
            dispatch(
              addTask({ title: taskTitle, description: taskDescription })
            )
            setTaskDescription('')
            setTaskTitle('')
          }}
          className="border-none bg-slate-600 py-2 px-4 rounded-md text-white font-medium text-lg"
        >
          {editId ? 'Save Changes' : 'Add Task'}
        </button>
        <span className="text-2xl">Filter: </span>
        <button
          className="border-none bg-slate-500 py-2 px-4 rounded-md text-white font-medium text-lg"
          onClick={() => dispatch(filterCompleted())}
        >
          Completed
        </button>
        <button
          className="border-none bg-slate-500 py-2 px-4 rounded-md text-white font-medium text-lg"
          onClick={() => dispatch(filterNotCompleted())}
        >
          Not Completed
        </button>
        {filterStatus && (
          <button
            className="border-none bg-red-600 py-2 px-4 rounded-md text-white font-medium text-lg"
            onClick={() => dispatch(clearFilter())}
          >
            Clear Filter
          </button>
        )}
        <select name="" id="" className="bg-slate-700 py-2 px-4 rounded-lg">
          <option value="">Sort By Created At</option>
          <option value="">Sort By</option>
        </select>
      </div>
    </div>
  )
}

export default TaskInput
