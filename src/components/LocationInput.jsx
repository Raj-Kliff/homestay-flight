'use client'

import React, { useState, useRef, useContext } from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { LuClock4 } from "react-icons/lu";
import { AppContext } from '../Context/appContext'

const LocationInput = ({
  autoFocus = false,
  placeHolder = 'Location',
  desc = 'Where are you going?',
  className = 'nc-flex-1.5',
  divHideVerticalLineClass = 'left-10 -right-0.5',
}) => {
  const { origin, setorigin, destination, setdestination } = useContext(AppContext);
  const containerRef = useRef(null)
  const inputRef = useRef(null)

  const [value, setValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }
  const handleSelectLocation = (item) => {
    //console.log(item)
    setValue(item)
    setIsFocused(false)
  }
  const handlechange = (item) => {
    if (item.placeholder === 'Flying from') {
      setorigin(item.value);
    } else {
      setdestination(item.value);
    }
    setValue(item.value)
    setIsFocused(false)
  }
  const renderRecentSearches = () => {
    return (
      <div>
        <h3 className="block mt-2 sm:mt-0 px-4 sm:px-8 font-semibold text-base sm:text-lg text-neutral-800 dark:text-neutral-100">
          Recent searches
        </h3>
        <div className="mt-2">
          {[
            'Hamptons, Suffolk County, NY',
            'Las Vegas, NV, United States',
            'Ueno, Taito, Tokyo',
            'Ikebukuro, Toshima, Tokyo',
          ].map((item) => (
            <span
              onClick={() => handleSelectLocation(item)}
              key={item}
              className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
            >
              <span className="block text-neutral-400">
                <LuClock4 className="h-4 sm:h-6 w-4 sm:w-6" />
              </span>
              <span className="block font-medium text-neutral-700 dark:text-neutral-200">
                {item}
              </span>
            </span>
          ))}
        </div>
      </div>
    )
  }

  const renderSearchValue = () => {
    return (
      <>
        {[
          'Ha Noi, Viet Nam',
          'San Diego, CA',
          'Humboldt Park, Chicago, IL',
          'Bangor, Northern Ireland',
        ].map((item) => (
          <span
            onClick={() => handleSelectLocation(item)}
            key={item}
            className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
          >
            <span className="block text-neutral-400">
              <LuClock4 className="h-4 w-4 sm:h-6 sm:w-6" />
            </span>
            <span className="block font-medium text-neutral-700 dark:text-neutral-200">
              {item}
            </span>
          </span>
        ))}
      </>
    )
  }

  return (
    <div className={`relative flex ${className}`} ref={containerRef}>
      <div
        onClick={() => inputRef.current && inputRef.current.focus()}
        className={`flex z-10 flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left  ${isFocused ? 'nc-hero-field-focused' : ''
          }`}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
          <IoLocationOutline className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow">
          <input
            className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
            placeholder={placeHolder}
            value={value}
            autoFocus={autoFocus}
            onChange={(e) => handlechange(e.target)}
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
            <span className="line-clamp-1">{!!value ? placeHolder : desc}</span>
          </span>
          {value && isFocused && (
            <button
              onClick={() => {
                setValue('')
              }}
            />
          )}
        </div>
      </div>

      {isFocused && (
        <div
          className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white dark:bg-neutral-800 ${divHideVerticalLineClass}`}
        ></div>
      )}

      {isFocused && (
        <div className="absolute mt-[0rem] left-0 z-40 w-full min-w-[300px] sm:min-w-[500px] bg-white dark:bg-neutral-800 top-full py-3 sm:py-6 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
          {value ? renderSearchValue() : renderRecentSearches()}
        </div>
      )}
    </div>
  )
}

export default LocationInput
