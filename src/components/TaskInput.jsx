/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask } from '../reducers/taskReducer'

function TaskInput({ inputRef }) {
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')

  const { editId } = useSelector((state) => state)
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
      <button
        onClick={() => {
          dispatch(addTask({ title: taskTitle, description: taskDescription }))
          setTaskDescription('')
          setTaskTitle('')
        }}
        className="border-none bg-slate-800 py-1 px-4 rounded-sm text-white font-light"
      >
        {editId ? 'Save Changes' : 'Add Task'}
      </button>
    </div>
  )
}

export default TaskInput
