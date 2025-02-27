
// import { FaArrowRightLong, IoChevronDownOutline } from '@heroicons/react/24/outline'
import { IoChevronDownOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import React, { FC, useState, useContext } from 'react'
import { getHoursFromISO, calculateHourDifference, fullDate, encryptId } from '../helpers/comm';
import FlightDetails from './FlightDetails'
import { Link } from "react-router-dom";
import { AppContext } from '../context/appContext'

const FlightCard = ({ className = '', data, res_index = null, setSelectedFlight }) => {
  const { dropOffLocationType } = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(false)
  const { Fare, Segments, TicketAdvisory } = data;
  const _segments = Segments.flat();

  const renderDetail = (data) => {
    if (!isOpen) return null
    const encrypted = encryptId(res_index);
    const journeyType = encryptId(dropOffLocationType);
    return (
      <>
        <div className="rounded-2xl border border-neutral-200 p-4 dark:border-neutral-700 md:p-8">
          {_segments?.map((ele, index) => {
            return <FlightDetails key={index} params={ele} res_index={res_index} local_index={index} />
          })}
          {res_index != null ? <Link to={`/booking/${encrypted}`} className="bg-black px-4 py-2 w-fit rounded relative bottom-6 text-white float-right hover:bg-gray-800 duration-500 cursor-pointer">Book Flight</Link> : "No data found"}
          {/* <button onClick={()=>setSelectedFlight(data)} className="bg-black px-4 py-2 w-fit rounded relative bottom-6 text-white float-right hover:bg-gray-800 duration-500 cursor-pointer">Book Flight</button> */}
        </div>
      </>
    )
  }

  return (
    <div
      className={`nc-FlightCardgroup relative space-y-6 overflow-hidden rounded-2xl border border-neutral-100 bg-white p-4 transition-shadow hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 sm:p-6 ${className}`}
    >
      <div className={`relative sm:pr-20 ${className}`}>
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a href="##" className="absolute inset-0" />

        <span
          className={`absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-neutral-50 dark:bg-neutral-800 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 ${isOpen ? '-rotate-180 transform' : ''
            }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <IoChevronDownOutline className="h-5 w-5" />
        </span>

        <div className="flex flex-col space-y-6 sm:flex-row sm:items-center sm:space-y-0">
          {/* LOGO IMG */}
          <div className="w-24  lg:w-32">
            <img
              src={
                `https://www.gstatic.com/flights/airline_logos/70px/${_segments[0].Airline.AirlineCode}.png`
              }
              width={40}
              height={40}
              className="w-10"
              alt="air-logo"
              sizes="40px"
            />
          </div>

          {/* FOR MOBILE RESPONSIVE */}
          <div className="block space-y-1 lg:hidden">
            <div className="flex font-semibold">
              <div>
                <span>{getHoursFromISO(_segments[0].Origin.DepTime)}</span>
                <span className="mt-0.5 flex items-center text-sm font-normal text-neutral-500">
                  {_segments[0].Origin.Airport.AirportCode}
                </span>
              </div>
              <span className="flex w-12 justify-center">
                <FaArrowRightLong className="h-5 w-5" />
              </span>
              <div>
                <span>{getHoursFromISO(_segments[0].Destination.ArrTime)}</span>
                <span className="mt-0.5 flex items-center text-sm font-normal text-neutral-500">
                  {_segments[0].Destination.Airport.AirportCode}
                </span>
              </div>
            </div>

            <div className="mt-0.5 text-sm font-normal text-neutral-500">
              <span className="VG3hNb">{_segments[0].length == 1 ? 'Non-Stop' : 'Multi Stops'}</span>
              <span className="mx-2">·</span>
              <span>{calculateHourDifference(_segments[0].Origin.DepTime, _segments[0].Destination.ArrTime)}</span>
              <span className="mx-2">·</span>
              <span>{_segments[0].Destination.Airport.AirportCode}</span>
            </div>
          </div>

          {/* TIME - NAME */}
          <div className="hidden min-w-[150px] flex-[4] lg:block">
            <div className="text-lg font-medium">{getHoursFromISO(_segments[0].Origin.DepTime)} - {getHoursFromISO(_segments[0].Destination.ArrTime)}</div>
            <div className="mt-0.5 text-sm font-normal text-neutral-500">
              {_segments[0].Airline.AirlineName}
            </div>
          </div>

          {/* CODE */}
          <div className="hidden flex-[4] whitespace-nowrap lg:block">
            <div className="text-lg font-medium">{_segments[0].Origin.Airport.AirportCode} - {_segments[0].Destination.Airport.AirportCode}</div>
            <div className="mt-0.5 text-sm font-normal text-neutral-500">
              {calculateHourDifference(_segments[0].Origin.DepTime, _segments[0].Destination.ArrTime)}
            </div>
          </div>

          {/* TYPE */}
          <div className="hidden flex-[4] whitespace-nowrap lg:block">
            <div className="text-lg font-medium">{_segments.length} stop</div>
            {/* <div className="mt-0.5 text-sm font-normal text-neutral-500">
              {_segments.length > 1 ? <>2 hours 15 minutes BKK</> : null}
            </div> */}
          </div>

          {/* PRICE */}
          <div className="flex-[4] whitespace-nowrap sm:text-right">
            <div>
              <span className="text-secondary-600 text-xl font-semibold">
                {Fare.Currency} {(Fare.BaseFare + Fare.Tax)}
              </span>
            </div>
            <div className="mt-0.5 text-xs font-normal text-neutral-500 sm:text-sm">
              {_segments.length > 1 ? 'Connecting' : 'Direct'}
            </div>
          </div>
        </div>
      </div>

      {/* DETAIL */}
      {renderDetail(data)}
    </div>
  )
}

export default FlightCard
