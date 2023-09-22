/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux'
import { deleteTask, setEdit, toggleStatus } from '../reducers/taskReducer'
import { Delete, Edit, Up, Down, Tick, Cancel } from '../icons/Icons'
import { useState } from 'react'

function Task({ title, description, id, inputRef, status, createdAt }) {
  const [readMore, setReadMore] = useState(false)
  const dispatch = useDispatch()
  return (
    <div
      className={`p-3 my-2  text-white rounded-md relative grid grid-cols-[2fr_0.5fr] ${
        status ? 'bg-slate-500' : 'bg-slate-600'
      }`}
    >
      <div className="flex col-span-2 justify-between">
        <h1
          className={`font-semibold text-2xl break-all ${
            status && 'line-through'
          }`}
        >
          {title}
        </h1>
        <p>
          Status:{' '}
          {!status ? (
            <span className="text-red-600 font-bold text-lg"> O</span>
          ) : (
            <span className="text-lime-400 font-bold text-lg"> O</span>
          )}
        </p>
      </div>

      <div className="self-end">
        <button
          onClick={() => setReadMore(!readMore)}
          className="flex items-center gap-1  font-light text-base text-gray-300 underline"
        >
          {!readMore ? `Read More` : 'Hide More'}
          {!readMore ? <Down /> : <Up />}
        </button>
        {readMore && (
          <div className="font-medium text-base text-gray-300 break-all">
            {description}
            <p className="font-light text-sm text-gray-400">
              Created at: {createdAt}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end items-end">
        <button onClick={() => dispatch(toggleStatus(id))}>
          {!status ? <Tick /> : <Cancel />}
        </button>
        <button onClick={() => dispatch(deleteTask(id))}>
          <Delete />
        </button>
        <button
          onClick={() => {
            dispatch(setEdit(id))
            inputRef.current.focus()
          }}
        >
          <Edit />
        </button>
      </div>
    </div>
  )
}

export default Task
