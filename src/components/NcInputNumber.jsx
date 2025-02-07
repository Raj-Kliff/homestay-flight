'use client'

import React, { useEffect, useState } from 'react'
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

const NcInputNumber = ({
  className = 'w-full',
  defaultValue = 0,
  min = 0,
  max,
  onChange,
  label,
  desc,
}) => {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const handleClickDecrement = () => {
    if (min >= value) return
    setValue((state) => {
      return state - 1
    })
    onChange && onChange(value - 1)
  }

  const handleClickIncrement = () => {
    if (max && max <= value) return
    setValue((state) => {
      return state + 1
    })
    onChange && onChange(value + 1)
  }

  const renderLabel = () => {
    return (
      <div className="flex flex-col text-sm sm:text-base">
        <span className="font-medium text-neutral-800 dark:text-neutral-200">
          {label}
        </span>
        {desc && (
          <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">
            {desc}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={`nc-NcInputNumber flex items-center justify-between space-x-5 ${className}`}>
      {label && renderLabel()}

      <div className={`nc-NcInputNumber flex w-28 items-center justify-between`}>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-400 bg-white hover:border-neutral-700 focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400 dark:border-neutral-500 dark:bg-neutral-900 dark:disabled:hover:border-neutral-500"
          type="button"
          onClick={handleClickDecrement}
          disabled={min >= value}
        >
          <FiMinus className="h-4 w-4" />
        </button>
        <span>{value}</span>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-400 bg-white hover:border-neutral-700 focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400 dark:border-neutral-500 dark:bg-neutral-900 dark:disabled:hover:border-neutral-500"
          type="button"
          onClick={handleClickIncrement}
          disabled={max ? max <= value : false}
        >
          <FiPlus className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default NcInputNumber
