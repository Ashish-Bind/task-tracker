/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux'
import { deleteTask, setEdit } from '../reducers/taskReducer'
import { Delete, Edit, Up, Down } from '../icons/Icons'
import { useState } from 'react'

function Task({ title, description, id, inputRef }) {
  const [readMore, setReadMore] = useState(false)
  const dispatch = useDispatch()
  return (
    <div className="p-1 my-2 bg-slate-600 text-white rounded-sm relative grid grid-cols-[2fr_0.5fr]">
      <h1 className="font-semibold text-xl col-span-2">{title}</h1>
      <div>
        <button
          onClick={() => setReadMore(!readMore)}
          className="flex items-center gap-1 font-light text-xs text-gray-300 underline"
        >
          {!readMore ? `Read More` : 'Hide More'}
          {!readMore ? <Down /> : <Up />}
        </button>
        {readMore && (
          <div className="font-light text-xs text-gray-300">{description}</div>
        )}
      </div>
      <div className="flex justify-end items-end">
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
