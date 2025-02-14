'use client'

import React, { useState, Fragment, useContext } from 'react'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
// import { ChevronDownIcon } from '@heroicons/react/24/solid'
import LocationInput from './LocationInput'
import FlightDateRangeInput from './FlightDateRangeInput'
import NcInputNumber from './NcInputNumber'
import { IoChevronDownOutline } from "react-icons/io5";
import FlightDateRangeInput2 from './FlightDateRangeInput2'
import { AppContext } from '../Context/appContext'
import { TrashIcon } from '@heroicons/react/20/solid'
import { axios_instance } from '../Helpers/axios_hook.js';
import SearchBtn from './SearchBtn'
import { flightClass, getCabinClassName } from '../Helpers/FlightCabins'
import { RxCrossCircled } from "react-icons/rx";


const FlightSearchForm = ({ }) => {
  //   const [dropOffLocationType, setDropOffLocationType] = useState('roundTrip')
  const { start_date, origin, destination, setFlightResults, setfilteredReturnFlights, setfilteredMultiFlights,
    setFilteredFlights, settraceId, dropOffLocationType, setDropOffLocationType,
    setapi_error, adult, setAdult, child, setChild, infant, setInfant, cabinClass, setcabinClass, end_date } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false)

  const [multiCityFlights, setMultiCityFlights] = useState([{ id: 1 }])
  const handleAddMulticityFlight = (e) => {
    e.preventDefault();
    setMultiCityFlights([...multiCityFlights, { id: multiCityFlights.length + 1 }])
  }

  const handleRemoveMulticityFlight = (id) => {
    setMultiCityFlights(multiCityFlights.filter(city => city.id != id))
  }

  const handleSubmit = async () => {
    if (loading) return; // Prevent multiple requests
    setLoading(true); // Disable button & show loading effect

    let params = {};
    params['adult'] = adult;
    params['child'] = child;
    params['infant'] = infant;
    params['directFlight'] = "false";
    params['oneStopFlight'] = "false";
    params['journeyType'] = dropOffLocationType;

    switch (dropOffLocationType) {
      case 1:
        params['origin'] = origin;
        params['destination'] = destination;
        params['date'] = handleDate(start_date);
        break;
      case 2:
        params['origin'] = origin;
        params['destination'] = destination;
        params['date'] = handleDate(start_date);
        params['end_date'] = handleDate(end_date);
        break;
      case 3:
        params['origin'] = origin;
        params['destination'] = destination;
        params['date'] = handleDate(start_date);
        break;
      case 4:
        params['origin'] = origin;
        params['destination'] = destination;
        params['date'] = handleDate(start_date);
        break;
      default:
        return false;
    }

    try {
      await axios_instance.post('/flights/search', params).then((response) => {
        if (response.status === 200) {
          if (typeof (response.data) === "string") {
            setapi_error(response.data);
          } else {
            if (dropOffLocationType === 1) {
              // setFlightResults(response.data.Results.flat());
              setFilteredFlights(response.data.Results.flat());
            } else if (dropOffLocationType === 2) {
              setfilteredReturnFlights(response.data.Results);
            } else if (dropOffLocationType === 3) {
              setfilteredMultiFlights(response.data.Results);
            }
            settraceId(response.data.traceId);
          }
        }
      }).finally(() => {
        setLoading(false); // Disable button & show loading effect
      });
    } catch (error) {
      console.warn("Error :- ", error);
      setapi_error(error);
    }
  };

  const handleDate = (date) => {
    const dateString = date;
    const new_date = new Date(dateString).toISOString().split("T")[0];
    return new_date;
  }

  const handleChangeData = (value, type) => {
    if (type === 'guestAdults') {
      setAdult(value)
    } else if (type === 'guestChildren') {
      setChild(value)
    } else if (type === 'guestInfants') {
      setInfant(value)
    }
  }

  const totalGuests = adult + child + infant

  const renderGuest = () => {
    return (
      <Popover className="relative">
        {({ open }) => (
          <>
            <PopoverButton
              as="button"
              className="inline-flex items-center rounded-md px-4 py-2.5 text-xs font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
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
                  defaultValue={adult}
                  onChange={(value) => handleChangeData(value, 'guestAdults')}
                  max={10}
                  min={1}
                  label="Adults"
                  desc="Ages 13 or above"
                />
                <NcInputNumber
                  className="mt-6 w-full"
                  defaultValue={child}
                  onChange={(value) => handleChangeData(value, 'guestChildren')}
                  max={4}
                  label="Child"
                  desc="Ages 0–6"
                />
                <NcInputNumber
                  className="mt-6 w-full"
                  defaultValue={infant}
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
      // <Popover className="relative">
      //   {({ open, close }) => (
      //     <>
      //       <PopoverButton
      //         className="inline-flex items-center rounded-md px-4 py-1.5 text-xs font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      //       >
      //         <span>{`${getCabinClassName(cabinClass)}`}</span>
      //         <IoChevronDownOutline
      //           className={`${open ? '' : 'text-opacity-70'} ml-2 h-4 w-4 transition duration-150 ease-in-out`}
      //           aria-hidden="true"
      //         />
      //       </PopoverButton>
      //       <Transition
      //         as={Fragment}
      //         enter="transition ease-out duration-200"
      //         enterFrom="opacity-0 translate-y-1"
      //         enterTo="opacity-100 translate-y-0"
      //         leave="transition ease-in duration-150"
      //         leaveFrom="opacity-100 translate-y-0"
      //         leaveTo="opacity-0 translate-y-1"
      //       >
      //         <PopoverPanel className="absolute left-0 w-fit top-full z-20 mt-3  max-w-[200px]  sm:max-w-[220px] sm:px-0">
      //           <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
      //             <div className="relative grid gap-8 bg-white p-7 dark:bg-neutral-800">
      //               {flightClass.map((item) => (
      //                 <a
      //                   key={item.name}
      //                   href={item.href}
      //                   onClick={(e) => {
      //                     e.preventDefault()
      //                     setcabinClass(item.val)
      //                     close()
      //                   }}
      //                   className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-gray-700"
      //                 >
      //                   <p className="text-sm font-medium">{item.name}</p>
      //                 </a>
      //               ))}
      //             </div>
      //           </div>
      //         </PopoverPanel>
      //       </Transition>
      //     </>
      //   )}
      // </Popover>

      <select onChange={()=>setcabinClass(e.target.value)} class="text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-fit px-2.5 py-2">
        <option selected>All</option>
        {
          flightClass?.map((item) => (
            <option key={item.name} value={item.val}>{item.name}</option>
          ))
        }
      </select>
      
    )
  }

  const renderRadioBtn = () => {
    return (
      <div>
        <p onClick={() => setShowOptions(!showOptions)} className='sm:hidden flex gap-2 items-center border border-gray-200 px-4 py-2 w-fit rounded text-black hover:bg-gray-800 duration-500 cursor-pointer'>Show more options <IoChevronDownOutline className={`${showOptions ? 'rotate-270' : ''}`} /></p>
        <div className={`${showOptions ? '' : 'hidden'} sm:flex flex-col sm:flex-row flex-wrap border-b border-neutral-100 py-5 dark:border-neutral-700 p-5`}>
          <div
            className={`my-1 mr-2 flex cursor-pointer items-center rounded-full px-4 py-1.5 text-xs font-medium sm:mr-3 ${dropOffLocationType === 2 ? 'bg-black text-white shadow-lg' : 'border border-neutral-300'
              }`}
            onClick={() => setDropOffLocationType(2)}
          >
            Round-trip
          </div>
          <div
            className={`my-1 mr-2 flex cursor-pointer items-center rounded-full px-4 py-1.5 text-xs font-medium sm:mr-3 ${dropOffLocationType === 1 ? 'bg-black text-white shadow-lg' : 'border border-neutral-300'
              }`}
            onClick={() => setDropOffLocationType(1)}
          >
            One-way
          </div>
          <div
            className={`my-1 mr-2 flex cursor-pointer items-center rounded-full px-4 py-1.5 text-xs font-medium sm:mr-3 ${dropOffLocationType === 3 ? 'bg-black text-white shadow-lg' : 'border border-neutral-300'
              }`}
            onClick={() => setDropOffLocationType(3)}
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
            dropOffLocationType == 3 &&
            <div className='flex-1'>
              <button onClick={(e) => handleAddMulticityFlight(e)} className={`${multiCityFlights.length >= 5 ? 'bg-gray-400 cursor-not-allowed' : 'bg-black cursor-pointer'} px-3 py-1 rounded-full float-right text-white hover:bg-gray-800 duration-500 `}
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
              dropOffLocationType === 1 ? <FlightDateRangeInput2 selectsRange={dropOffLocationType !== 1} className="flex-1" /> : <FlightDateRangeInput selectsRange={dropOffLocationType !== 1} className="flex-1" />
            }
          </div>
          <SearchBtn loading={loading} handleSubmit={handleSubmit} />
        </form>
      </div>
    )
  }

  const renderFormMultiCity = () => {
    return (
      <div>
        <form className="relative pb-5 mt-8 w-full md:max-w-[70%] rounded-[40px] rounded-t-2xl bg-white shadow-xl dark:bg-neutral-800 xl:rounded-[49px] xl:rounded-t-3xl">
          {renderRadioBtn()}
          {
            multiCityFlights.map((flight, index) => (
              <div className="flex flex-col sm:flex-row flex-1 rounded-full p-5 pr-6" key={flight.id}>
                <LocationInput placeHolder="Flying from" desc="Where do you want to fly from?" className="flex-1" />
                <div className="h-8 self-center border-r border-slate-200 dark:border-slate-700"></div>
                <LocationInput placeHolder="Flying to" desc="Where you want to fly to?" className="flex-1" divHideVerticalLineClass=" -inset-x-0.5" />
                <div className="h-8 self-center border-r border-slate-200 dark:border-slate-700"></div>
                {
                  dropOffLocationType === 3 ? <FlightDateRangeInput2 selectsRange={dropOffLocationType !== 1} className="flex-1" /> : <FlightDateRangeInput selectsRange={dropOffLocationType !== 1} className="flex-1" />
                }
                {
                  dropOffLocationType === 3 &&
                  <div className='ps-8 flex items-center'>
                    <RxCrossCircled onClick={() => handleRemoveMulticityFlight(flight.id)} className={`h-5 w-5 mr-2 text-red-600 hover:text-red-500 duration-500 cursor-pointer ${flight.id == 1 ? 'invisible' : ''}`} />
                  </div>
                }
              </div>
            ))
          }
          <SearchBtn loading={loading} handleSubmit={handleSubmit} />
        </form>
      </div>
    )
  }

  return dropOffLocationType == 3 ? renderFormMultiCity() : renderForm()
}

export default FlightSearchForm
