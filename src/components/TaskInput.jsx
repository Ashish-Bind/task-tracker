/* eslint-disable react/prop-types */
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addTask,
  clearFilter,
  filterCompleted,
  filterNotCompleted,
  setSort,
} from '../reducers/taskReducer'

function TaskInput() {
  const titleRef = useRef()
  const descriptionRef = useRef()

  const { editId, filterStatus } = useSelector((state) => state)
  const dispatch = useDispatch()

  return (
    <div>
      <input
        id="title-input"
        type="text"
        placeholder={editId ? 'Edit Title..' : 'Enter task title ...'}
        ref={titleRef}
      />
      <br />
      <textarea
        type="text"
        ref={descriptionRef}
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
              addTask({
                title: titleRef.current.value,
                description: descriptionRef.current.value,
              })
            )
            titleRef.current.value = ''
            descriptionRef.current.value = ''
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
        <select
          name="sortItems"
          className="bg-slate-700 py-2 px-4 rounded-lg"
          onChange={(e) => dispatch(setSort(e.target.value))}
        >
          <option value="none">None</option>
          <option value="ascending">Sort by Created at Ascending</option>
          <option value="descending">Sort by Created at Descending</option>
        </select>
      </div>
    </div>
  )
}

export default TaskInput
