'use client'

import React, { useState, Fragment, useContext } from 'react'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
// import { ChevronDownIcon } from '@heroicons/react/24/solid'
import LocationInput from './LocationInput'
import FlightDateRangeInput from './FlightDateRangeInput'
import NcInputNumber from './NcInputNumber'
import { IoChevronDownOutline } from "react-icons/io5";
import FlightDateRangeInput2 from './FlightDateRangeInput2'
import { AppContext } from '../context/appContent'
import { TrashIcon } from '@heroicons/react/20/solid'


const flightClass = [
  { name: 'Economy', href: '##' },
  { name: 'Business', href: '##' },
  { name: 'Multiple', href: '##' },
]

const FlightSearchForm = ({}) => {
//   const [dropOffLocationType, setDropOffLocationType] = useState('roundTrip')
  const {dropOffLocationType, setDropOffLocationType} = useContext(AppContext)
  const [flightClassState, setFlightClassState] = useState('Economy')

  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(2)
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(1)
  const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(1)

  const [flightTripType, setFlightTripType] = useState('')
  const [showOptions, setShowOptions] = useState(false)

  const [multiCityFlights, setMultiCityFlights] = useState([{id: 1}])
  const handleAddMulticityFlight = () => {
    setMultiCityFlights([...multiCityFlights, { id: multiCityFlights.length + 1}])
  }

  const handleRemoveMulticityFlight = (id) => {
    setMultiCityFlights(multiCityFlights.filter(city => city.id != id))
  }

  const handleChangeData = (value, type) => {
    if (type === 'guestAdults') {
      setGuestAdultsInputValue(value)
    } else if (type === 'guestChildren') {
      setGuestChildrenInputValue(value)
    } else if (type === 'guestInfants') {
      setGuestInfantsInputValue(value)
    }
  }

  const totalGuests = guestAdultsInputValue + guestChildrenInputValue + guestInfantsInputValue

  const renderGuest = () => {
    return (
      <Popover className="relative">
        {({ open }) => (
          <>
            <PopoverButton
              as="button"
              className="inline-flex items-center rounded-md px-4 py-1.5 text-xs font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <span>{`${totalGuests || ''} Guests`}</span>
              <IoChevronDownOutline
                className={`${open ? '' : 'text-opacity-70'} ml-2 h-4 w-4 transition duration-150 ease-in-out`}
                aria-hidden="true"
              />
            </PopoverButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute left-0 top-full z-20 mt-3 w-fit rounded-3xl bg-white px-4 py-5 shadow-xl ring-1 ring-black/5 dark:bg-neutral-800 dark:ring-white/10 sm:min-w-[340px] sm:px-8 sm:py-6">
                <NcInputNumber
                  className="w-full"
                  defaultValue={guestAdultsInputValue}
                  onChange={(value) => handleChangeData(value, 'guestAdults')}
                  max={10}
                  min={1}
                  label="Adults"
                  desc="Ages 13 or above"
                />
                <NcInputNumber
                  className="mt-6 w-full"
                  defaultValue={guestChildrenInputValue}
                  onChange={(value) => handleChangeData(value, 'guestChildren')}
                  max={4}
                  label="Child"
                  desc="Ages 0–6"
                />
                <NcInputNumber
                  className="mt-6 w-full"
                  defaultValue={guestInfantsInputValue}
                  onChange={(value) => handleChangeData(value, 'guestInfants')}
                  max={4}
                  label="Infants"
                  desc="Ages 7–12"
                />
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    )
  }

  const renderSelectClass = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <PopoverButton
              className="inline-flex items-center rounded-md px-4 py-1.5 text-xs font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <span>{`${flightClassState}`}</span>
              <IoChevronDownOutline
                className={`${open ? '' : 'text-opacity-70'} ml-2 h-4 w-4 transition duration-150 ease-in-out`}
                aria-hidden="true"
              />
            </PopoverButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute left-0 w-fit top-full z-20 mt-3  max-w-[200px]  sm:max-w-[220px] sm:px-0">
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                  <div className="relative grid gap-8 bg-white p-7 dark:bg-neutral-800">
                    {flightClass.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault()
                          setFlightClassState(item.name)
                          close()
                        }}
                        className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-gray-700"
                      >
                        <p className="text-sm font-medium">{item.name}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    )
  }

  const renderRadioBtn = () => {
    return (
      <div>
        <p onClick={()=>setShowOptions(!showOptions)} className='sm:hidden flex gap-2 items-center border border-gray-200 px-4 py-2 w-fit rounded text-black hover:bg-gray-800 duration-500 cursor-pointer'>Show more options <IoChevronDownOutline className={`${showOptions ? 'rotate-270' : ''}`} /></p>
        <div className={`${showOptions ? '':'hidden'} sm:flex flex-col sm:flex-row flex-wrap border-b border-neutral-100 py-5 dark:border-neutral-700 p-5`}>
            <div
              className={`my-1 mr-2 flex cursor-pointer items-center rounded-full px-4 py-1.5 text-xs font-medium sm:mr-3 ${
                dropOffLocationType === 'roundTrip' ? 'bg-black text-white shadow-lg' : 'border border-neutral-300'
              }`}
              onClick={() => setDropOffLocationType('roundTrip')}
            >
              Round-trip
            </div>
            <div
              className={`my-1 mr-2 flex cursor-pointer items-center rounded-full px-4 py-1.5 text-xs font-medium sm:mr-3 ${
                dropOffLocationType === 'oneWay' ? 'bg-black text-white shadow-lg' : 'border border-neutral-300'
              }`}
              onClick={() => setDropOffLocationType('oneWay')}
            >
              One-way
            </div>
            <div
              className={`my-1 mr-2 flex cursor-pointer items-center rounded-full px-4 py-1.5 text-xs font-medium sm:mr-3 ${
                dropOffLocationType === 'multiCity' ? 'bg-black text-white shadow-lg' : 'border border-neutral-300'
              }`}
              onClick={() => setDropOffLocationType('multiCity')}
            >
              Multi City
            </div>
            <div className="my-1 mr-2 h-8 hidden sm:block self-center border-r border-slate-200 dark:border-slate-700 sm:mr-3"></div>
            <div className="my-1 mr-2 rounded-full border border-neutral-300 dark:border-neutral-700">
              {renderSelectClass()}
            </div>
            <div className="my-1 rounded-full border border-neutral-300 dark:border-neutral-700">
              {renderGuest()}
            </div>
            {
              dropOffLocationType == 'multiCity' && 
              <div className='flex-1'>
                <button onClick={()=>handleAddMulticityFlight()} className={`${multiCityFlights.length >= 5 ? 'bg-gray-400 cursor-not-allowed' : 'bg-black cursor-pointer'} px-3 py-1 rounded-full float-right text-white hover:bg-gray-800 duration-500 `}
                disabled={multiCityFlights.length >= 5}
                >+ Add Another City</button>
            </div>
            }
        </div>
        
      </div>
    )
  }

  const renderForm = () => {
    return (
      <div>
        <form className="relative pb-5 mt-8 w-full md:max-w-[70%] rounded-[40px] rounded-t-2xl bg-white shadow-xl dark:bg-neutral-800 xl:rounded-[49px] xl:rounded-t-3xl">
          {renderRadioBtn()}
          <div className="flex flex-col sm:flex-row flex-1 rounded-full p-5 pr-6">
            <LocationInput placeHolder="Flying from" desc="Where do you want to fly from?" className="flex-1" />
            <div className="h-8 self-center border-r border-slate-200 dark:border-slate-700"></div>
            <LocationInput placeHolder="Flying to" desc="Where you want to fly to?" className="flex-1" divHideVerticalLineClass=" -inset-x-0.5" />
            <div className="h-8 self-center border-r border-slate-200 dark:border-slate-700"></div>
            {
              dropOffLocationType === 'oneWay' ? <FlightDateRangeInput2 selectsRange={dropOffLocationType !== 'oneWay'} className="flex-1" /> : <FlightDateRangeInput selectsRange={dropOffLocationType !== 'oneWay'} className="flex-1" />
            }
            
          </div>
        </form>
        <div className='flex justify-center md:max-w-[70%] mt-[-1rem]'>
            <button className="bg-black px-6 py-2 rounded-full z-9 text-white hover:bg-gray-800 duration-500 cursor-pointer shadow-xl">SEARCH</button>
        </div>
      </div>
    )
  }

  const renderFormMultiCity = () => {
    return (
      <div>
        <form className="relative pb-5 mt-8 w-full md:max-w-[70%] rounded-[40px] rounded-t-2xl bg-white shadow-xl dark:bg-neutral-800 xl:rounded-[49px] xl:rounded-t-3xl">
          {renderRadioBtn()}
          {
            multiCityFlights.map((flight,index)=>(
              <div className="flex flex-col sm:flex-row flex-1 rounded-full p-5 pr-6" key={flight.id}>
                <LocationInput placeHolder="Flying from" desc="Where do you want to fly from?" className="flex-1" />
                <div className="h-8 self-center border-r border-slate-200 dark:border-slate-700"></div>
                <LocationInput placeHolder="Flying to" desc="Where you want to fly to?" className="flex-1" divHideVerticalLineClass=" -inset-x-0.5" />
                <div className="h-8 self-center border-r border-slate-200 dark:border-slate-700"></div>
                {
                  dropOffLocationType === 'multiCity' ? <FlightDateRangeInput2 selectsRange={dropOffLocationType !== 'oneWay'} className="flex-1" /> : <FlightDateRangeInput selectsRange={dropOffLocationType !== 'oneWay'} className="flex-1" />
                }
                {
                  dropOffLocationType === 'multiCity' &&
                  <div className='ps-8 flex items-center'>
                    <TrashIcon onClick={()=>handleRemoveMulticityFlight(flight.id)} className={`h-5 w-5 mr-2 text-red-600 hover:text-red-500 duration-500 cursor-pointer ${flight.id == 1 ? 'invisible' : ''}`} />
                  </div>
                }
              </div>
            ))
          }
        </form>
        <div className='flex justify-center md:max-w-[70%] mt-[-1rem]'>
            <button className="bg-black px-6 py-2 rounded-full z-9 text-white hover:bg-gray-800 duration-500 cursor-pointer shadow-xl">SEARCH</button>
        </div>
      </div>
    )
  }

  return dropOffLocationType == 'multiCity' ? renderFormMultiCity() : renderForm()
}

export default FlightSearchForm
