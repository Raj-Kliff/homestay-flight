import React, { useContext, useState } from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { flight_assets } from '../assets/assets';
import HeroSearchForm from './HeroSearchForm';
import FlightSearchForm from './FlightSearchForm';
import FlightCard from '../components/FlightCard'
import { AppContext } from '../context/appContent';
import FlightCardTwoWay from './FlightCardTwoWay';
import TabFilters from './TabFilters';

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


const Hero1 = () => {

  const {dropOffLocationType, setDropOffLocationType} = useContext(AppContext);
  const [selectedFlight, setSelectedFlight] = useState()
  const [selectedReturnFlight, setSelectedReturnFlight] = useState()
  console.log(selectedReturnFlight)

  const renderOneWayCard = () => {
    return (
      <div className="lg:p-10 lg:bg-neutral-50 lg:dark:bg-black/20 grid grid-cols-1 gap-6  rounded-3xl">
        {DEMO_DATA.map((item, index) => (
          <FlightCard key={index} data={item} setSelectedFlight={setSelectedFlight}/>
        ))}

        <div className="flex mt-12 justify-center items-center">
          <button className='px-4 py-2 bg-slate-200 cursor-pointer hover:bg-slate-300 duration-500 rounded-full' >Show more</button>
        </div>
      </div>
    )
  }

  const renderRoundTripCard = () => {
    return (
      <div className="grid sm:grid-cols-2 grid-cols-1">
        <div className="lg:p-10 lg:bg-neutral-50 lg:dark:bg-black/20 flex flex-col gap-6  rounded-3xl overflow-hidden">
          {DEMO_DATA.map((item, index) => (
            <FlightCard key={index} data={item} setSelectedFlight={setSelectedFlight}/>
          ))}

          <div className="flex mt-12 justify-center items-center">
            <button className='px-4 py-2 bg-slate-200 cursor-pointer hover:bg-slate-300 duration-500 rounded-full' >Show more</button>
          </div>
      </div>
      
        <div className="lg:p-10 lg:bg-neutral-50 lg:dark:bg-black/20 flex flex-col gap-6  rounded-3xl">
          {DEMO_DATA.map((item, index) => (
            <FlightCardTwoWay key={index} data={item} setSelectedReturnFlight={setSelectedReturnFlight} />
          ))}

          <div className="flex mt-12 justify-center items-center">
            <button className='px-4 py-2 bg-slate-200 cursor-pointer hover:bg-slate-300 duration-500 rounded-full' >Show more</button>
          </div>
      </div>
      </div>
      
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
            {/* <div className="flex items-center text-base text-neutral-500 dark:text-neutral-400 md:text-lg">
                <IoLocationOutline className='h-5 w-5' />
                <span className="ml-2.5">Japan</span>
                <span className="mx-5"></span>
                <IoHomeOutline className='h-5 w-5' />
                <span className="ml-2.5">112 properties</span>
            </div> */}
            </div>
            <div className="flex-grow">
            <img src={flight_assets.flight} className="w-full" />
            </div>
        </div>

        <div className="w-full lg:flow-root">
            <div className="z-10 w-full lg:-mt-40 xl:-mt-66">
            {/* You can either keep the HeroSearchForm here or remove it if not needed */}
            {/* <HeroSearchForm /> */}
            <FlightSearchForm/>
            </div>
        </div>
        </div>

        {/* TabFilters */}
        <TabFilters/>


        {/* flight list  */}
        <div className='mt-5'>
          {
            dropOffLocationType == 'oneWay' ? renderOneWayCard() : renderRoundTripCard()
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
