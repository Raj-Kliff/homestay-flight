import React, { useContext, useState, useEffect } from 'react'
import { flight_assets } from '../assets/assets';
import HeroSearchForm from './HeroSearchForm';
import FlightSearchForm from './FlightSearchForm';
import FlightCard from '../components/FlightCard'
import { AppContext } from '../context/appContext';
import TabFilters from './TabFilters';
import { RadioGroup } from '@headlessui/react'

const DEMO_DATA = [
  {
    id: "1",
    price: "$4,100",
    airlines: {
      logo: "https://www.gstatic.com/flights/airline_logos/70px/KE.png",
      name: "Korean Air",
    },
  },
  {
    id: "2",
    price: "$3,380",
    airlines: {
      logo: "https://www.gstatic.com/flights/airline_logos/70px/SQ.png",
      name: "Singapore Airlines",
    },
  },
  {
    id: "3",
    price: "$2,380",
    airlines: {
      logo: "https://www.gstatic.com/flights/airline_logos/70px/multi.png",
      name: "Philippine Airlines",
    },
  },
  {
    id: "1",
    price: "$4,100",
    airlines: {
      logo: "https://www.gstatic.com/flights/airline_logos/70px/KE.png",
      name: "Korean Air",
    },
  },
  {
    id: "2",
    price: "$3,380",
    airlines: {
      logo: "https://www.gstatic.com/flights/airline_logos/70px/SQ.png",
      name: "Singapore Airlines",
    },
  },
  {
    id: "1",
    price: "$4,100",
    airlines: {
      logo: "https://www.gstatic.com/flights/airline_logos/70px/KE.png",
      name: "Korean Air",
    },
  },
  {
    id: "2",
    price: "$3,380",
    airlines: {
      logo: "https://www.gstatic.com/flights/airline_logos/70px/SQ.png",
      name: "Singapore Airlines",
    },
  },
];

const multiCityRadioCheckCardData = [
  {
    id: 1,
    from: 'Delhi',
    to: 'Mumbai',
    date: 'Tue, 11 Feb 25',
    timeFrom: '16:25',
    timeTo: '23:50'
  },
  {
    id: 2,
    from: 'Bangalore',
    to: 'Chennai',
    date: 'Wed, 12 Feb 25',
    timeFrom: '09:00',
    timeTo: '11:30'
  },
  {
    id: 3,
    from: 'Kolkata',
    to: 'Hyderabad',
    date: 'Thu, 13 Feb 25',
    timeFrom: '14:10',
    timeTo: '17:45'
  },
];


const Hero1 = () => {

  const { filteredFlights, dropOffLocationType, filteredReturnFlights, api_error } = useContext(AppContext)
  const [selectedFlight, setSelectedFlight] = useState()
  const [selectedReturnFlight, setSelectedReturnFlight] = useState()

  const [visibleCount, setVisibleCount] = useState(10); // Initially show 10 items
  const loadMore = () => {
    setVisibleCount((prev) => prev + 10); // Load 10 more items
  };

  const [selected, setSelected] = useState(multiCityRadioCheckCardData[0]) //multicity selected radio card
  console.log(selected)

  // multicity radio card checkbox 
  function CheckIcon(props) {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
        <path
          d="M7 13l3 3 7-7"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  const renderOneWayCard = () => {
    return (
      <div className="lg:p-10 lg:bg-neutral-50 lg:dark:bg-black/20 grid grid-cols-1 gap-6  rounded-3xl">
        {filteredFlights.length != 0 ? filteredFlights.slice(0, visibleCount).map((item, index) => (
          <FlightCard key={index} data={item} res_index={index} />
        )) : api_error ? api_error : null}

        {visibleCount < filteredFlights.length && (
          <div className="flex mt-12 justify-center items-center">
            <button className='px-4 py-2 bg-slate-200 cursor-pointer hover:bg-slate-300 duration-500 rounded-full'
              onClick={loadMore}>Show more</button>
          </div>
        )}
      </div>
    )
  }

  const renderRoundTripCard = () => {

    return (
      <div className="grid sm:grid-cols-2 grid-cols-1">
        <div className="lg:p-10 lg:bg-neutral-50 lg:dark:bg-black/20 flex flex-col gap-6  rounded-3xl overflow-hidden">
          {filteredReturnFlights[0] != undefined ? filteredReturnFlights[0].slice(0, visibleCount).map((item, index) => (
            <FlightCard key={index} data={item} res_index={index} />
          )) : "No Flights Found"}

          {filteredReturnFlights[0] != undefined && visibleCount < filteredReturnFlights[0].length && (
            <div className="flex mt-12 justify-center items-center">
              <button className='px-4 py-2 bg-slate-200 cursor-pointer hover:bg-slate-300 duration-500 rounded-full'
                onClick={loadMore}>Show more</button>
            </div>
          )}
        </div>
        <div className="lg:p-10 lg:bg-neutral-50 lg:dark:bg-black/20 flex flex-col gap-6  rounded-3xl overflow-hidden">
          {filteredReturnFlights[1] != undefined ? filteredReturnFlights[1].slice(0, visibleCount).map((item, index) => (
            <FlightCard key={index} data={item} res_index={index} />
          )) : "No Flights Found"}

          {filteredReturnFlights[1] != undefined && visibleCount < filteredReturnFlights[1].length && (
            <div className="flex mt-12 justify-center items-center">
              <button className='px-4 py-2 bg-slate-200 cursor-pointer hover:bg-slate-300 duration-500 rounded-full'
                onClick={loadMore}>Show more</button>
            </div>
          )}
        </div>

      </div>

    )
  }

  const renderMultiCityCard = () => {
    return (
      <>
      <div className="w-full px-4 py-8">
        <div className="w-full">
          <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
            <div className="space-y-2 gap-3 grid grid-cols-5 ">
              {multiCityRadioCheckCardData.map((item) => (
                <RadioGroup.Option
                  key={item.id}
                  value={item}
                  className={({ active, checked }) =>
                    `${
                      active
                        ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300'
                        : ''
                    }
                    ${checked ? 'bg-gray-900 text-white' : 'bg-white'}
                      relative flex cursor-pointer border border-gray-200 rounded-lg px-5 py-4 shadow-md focus:outline-none`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium  ${
                                checked ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {item.from} - {item.to}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="span"
                              className={`inline ${
                                checked ? 'text-sky-100' : 'text-gray-500'
                              }`}
                            >
                              <p>
                                {item.date}
                              </p>{' '}
                              <p>{item.timeFrom} - {item.timeTo}</p>
                            </RadioGroup.Description>
                          </div>
                        </div>
                        {checked && (
                          <div className="shrink-0 text-white">
                            <CheckIcon className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
      {/* ---------------------------- */}
      <div className="lg:p-10 lg:bg-neutral-50 lg:dark:bg-black/20 grid grid-cols-1 gap-6  rounded-3xl">
        {filteredFlights.length != 0 ? filteredFlights.slice(0, visibleCount).map((item, index) => (
          <FlightCard key={index} data={item} res_index={index} />
        )) : api_error ? api_error : null}

        {visibleCount < filteredFlights.length && (
          <div className="flex mt-12 justify-center items-center">
            <button className='px-4 py-2 bg-slate-200 cursor-pointer hover:bg-slate-300 duration-500 rounded-full'
              onClick={loadMore}>Show more</button>
          </div>
        )}
      </div>
      </>
    )
  }

  return (
    <div className='container mx-auto p-5 sm:p-0'>
      <div
        className="nc-SectionHeroArchivePage relative flex flex-col"
      >
        <div className="flex flex-col lg:flex-row lg:items-center mt-5">
          <div className="flex flex-shrink-0 flex-col items-start space-y-6 pb-14 lg:mr-10 lg:w-1/2 lg:space-y-10 lg:pb-64 xl:mr-0 xl:pb-80 xl:pr-14">
            <h2 className="text-4xl font-medium leading-[110%] md:text-5xl xl:text-7xl">
              <span className='text-purple-500'>Take Off</span> to Your Next Adventure!
            </h2>
          </div>
          <div className="flex-grow">
            <img src={flight_assets.flight} className="w-full" />
          </div>
        </div>

        <div className="w-full lg:flow-root">
          <div className="z-10 w-full lg:-mt-40 xl:-mt-66">
            {/* You can either keep the HeroSearchForm here or remove it if not needed */}
            {/* <HeroSearchForm /> */}
            <FlightSearchForm />
          </div>
        </div>
      </div>

      {/* TabFilters */}
      <TabFilters />


      {/* flight list  */}
      <div className='mt-5'>
        {
          dropOffLocationType == 1 
            ? renderOneWayCard() 
            : (dropOffLocationType == 2 
              ? renderRoundTripCard() 
              : renderMultiCityCard())
        }
      </div>



      {/* fixed div for selected flight  */}
      {
        selectedFlight && (
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 border-t-2 border-gray-300 z-50">
            <div className="flex justify-between items-center">
              <div className="flex items-start">
                <img
                  src={selectedFlight?.airlines.logo}
                  alt="Airline Logo"
                  className="w-12 h-12 mr-4"
                />
                <div className="flex flex-col me-5">
                  <span className="font-semibold text-lg">{selectedFlight?.airlines.name}</span>
                  <span className="text-sm text-gray-500">Departure: 11:00</span>
                  <span className="text-sm text-gray-500">Arrival: 20:00</span>
                </div>
                <span className="font-semibold text-xl text-blue-600">{selectedFlight?.price}</span>
              </div>
              {
                selectedReturnFlight && (
                  <div className="flex items-start">
                    <img
                      src={selectedReturnFlight?.airlines.logo}
                      alt="Airline Logo"
                      className="w-12 h-12 mr-4"
                    />
                    <div className="flex flex-col me-5">
                      <span className="font-semibold text-lg">{selectedReturnFlight?.airlines.name}</span>
                      <span className="text-sm text-gray-500">Departure: 11:00</span>
                      <span className="text-sm text-gray-500">Arrival: 20:00</span>
                    </div>
                    <span className="font-semibold text-xl text-blue-600">{selectedReturnFlight?.price}</span>
                  </div>
                )
              }
              <button
                onClick={() => setSelectedFlight(null)} // Clear selection
                className="bg-black px-4 py-2 w-fit rounded text-white hover:bg-gray-800 duration-500 cursor-pointer"
              >
                Book
              </button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Hero1
