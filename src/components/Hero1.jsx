import React, { useContext, useState, useEffect } from "react";
import { flight_assets } from "../assets/assets";
import HeroSearchForm from "./HeroSearchForm";
import FlightSearchForm from "./FlightSearchForm";
import FlightCard from "../components/FlightCard";
import { AppContext } from "../context/appContext";
import TabFilters from "./TabFilters";
import { RadioGroup, Tab } from "@headlessui/react";

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
  const {
    filteredFlights,
    dropOffLocationType,
    filteredReturnFlights,
    api_error,
  } = useContext(AppContext);
  const [selectedFlight, setSelectedFlight] = useState();
  const [selectedReturnFlight, setSelectedReturnFlight] = useState();
  const [totalSum, setTotalSum] = useState(0);

  const [visibleCount, setVisibleCount] = useState(10); // Initially show 10 items
  const loadMore = () => {
    setVisibleCount((prev) => prev + 10); // Load 10 more items
  };

  const [multicitySelectedFlights, setMultiCitySelectedFlights] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0) // Track the selected tab index

  const handleAddToMulticityFlights = (flight) => {
    if (selectedIndex <= Object.keys(categories).length - 1) {
      setSelectedIndex((prevIndex) => prevIndex + 1);
    }
    setMultiCitySelectedFlights([...multicitySelectedFlights, flight]);
  };

  let [categories] = useState({
    "New Delhi → Bengaluru": [
      {
        id: 1,
        image: 'https://www.gstatic.com/flights/airline_logos/70px/AI.png',
        price: "$4,100",
        origin: "NDS",
        destination: "BGL",
        title: "Flight Information: New Delhi to Bengaluru",
        date: "Tue, 18 Feb 25",
        flightNumber: "AI 202",
        duration: "2h 35m",
        gate: "A2",
      },
      {
        id: 2,
        image: 'https://www.gstatic.com/flights/airline_logos/70px/AI.png',
        price: "$4,100",
        origin: "PTY",
        destination: "TML",
        title: "Booking Guide for New Delhi → Bengaluru Flight",
        date: "Tue, 18 Feb 25",
        flightNumber: "AI 202",
        duration: "2h 35m",
        gate: "A2",
      },
    ],
    "Bengaluru → New Delhi": [
      {
        id: 1,
        image: 'https://www.gstatic.com/flights/airline_logos/70px/AI.png',
        price: "$5,100",
        origin: "SBS",
        destination: "TGL",
        title: "Flight Information: Bengaluru to New Delhi",
        date: "Tue, 18 Feb 25",
        flightNumber: "AI 203",
        duration: "2h 30m",
        gate: "B3",
      },
      {
        id: 2,
        image: 'https://www.gstatic.com/flights/airline_logos/70px/AI.png',
        price: "$5,100",
        origin: "MNS",
        destination: "BGL",
        title: "Top Airlines for Bengaluru → New Delhi Flights",
        date: "Tue, 18 Feb 25",
        flightNumber: "AI 203",
        duration: "2h 30m",
        gate: "B3",
      },
    ],
    "Chennai → Hyderabad": [
      {
        id: 1,
        image: 'https://www.gstatic.com/flights/airline_logos/70px/AI.png',
        price: "$6,100",
        origin: "NDS",
        destination: "BGL",
        title: "Flight Information: Chennai to Hyderabad",
        date: "Tue, 18 Feb 25",
        flightNumber: "AI 404",
        duration: "1h 40m",
        gate: "C4",
      },
      {
        id: 2,
        image: 'https://www.gstatic.com/flights/airline_logos/70px/AI.png',
        price: "$6,100",
        origin: "TTS",
        destination: "SSL",
        title: "How to Find Cheap Flights for Chennai → Hyderabad",
        date: "Tue, 18 Feb 25",
        flightNumber: "AI 404",
        duration: "1h 40m",
        gate: "C4",
      },
    ],
  });

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // Disable button when all tabs have been visited (i.e., when the last tab is selected)
  const isLastTab = selectedIndex === Object.keys(categories).length - 1

  const handleRemoveLastFlight = () => {
    setSelectedIndex((prevIndex) => prevIndex - 1);
    setMultiCitySelectedFlights((prevFlights) => prevFlights.slice(0, -1));
  };

  const handleNextButton = () => {
    if (selectedIndex == selectedFlight.length-1) {
      setSelectedIndex((prevIndex) => prevIndex + 1);
    }
  }

  useEffect(() => {
    const sum = multicitySelectedFlights.reduce((acc, item) => acc + parseInt(item.price.replace('$', '').replace(',','')), 0);
    setTotalSum(sum);
  },[multicitySelectedFlights])
  

  const renderOneWayCard = () => {
    return (
      <div className="lg:p-10 lg:bg-neutral-50 lg:dark:bg-black/20 grid grid-cols-1 gap-6  rounded-3xl">
        {filteredFlights.length != 0
          ? filteredFlights
              .slice(0, visibleCount)
              .map((item, index) => (
                <FlightCard key={index} data={item} res_index={index} setSelectedFlight={setSelectedFlight} />
              ))
          : api_error
          ? api_error
          : null}

        {visibleCount < filteredFlights.length && (
          <div className="flex mt-12 justify-center items-center">
            <button
              className="px-4 py-2 bg-slate-200 cursor-pointer hover:bg-slate-300 duration-500 rounded-full"
              onClick={loadMore}
            >
              Show more
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderRoundTripCard = () => {
    return (
      <div className="grid sm:grid-cols-2 grid-cols-1">
        <div className="lg:p-10 lg:bg-neutral-50 lg:dark:bg-black/20 flex flex-col gap-6  rounded-3xl overflow-hidden">
          {filteredReturnFlights[0] != undefined
            ? filteredReturnFlights[0]
                .slice(0, visibleCount)
                .map((item, index) => (
                  <FlightCard key={index} data={item} res_index={index} setSelectedFlight={setSelectedFlight} />
                ))
            : "No Flights Found"}

          {filteredReturnFlights[0] != undefined &&
            visibleCount < filteredReturnFlights[0].length && (
              <div className="flex mt-12 justify-center items-center">
                <button
                  className="px-4 py-2 bg-slate-200 cursor-pointer hover:bg-slate-300 duration-500 rounded-full"
                  onClick={loadMore}
                >
                  Show more
                </button>
              </div>
            )}
        </div>
        <div className="lg:p-10 lg:bg-neutral-50 lg:dark:bg-black/20 flex flex-col gap-6  rounded-3xl overflow-hidden">
          {filteredReturnFlights[1] != undefined
            ? filteredReturnFlights[1]
                .slice(0, visibleCount)
                .map((item, index) => (
                  <FlightCard key={index} data={item} res_index={index} />
                ))
            : "No Flights Found"}

          {filteredReturnFlights[1] != undefined &&
            visibleCount < filteredReturnFlights[1].length && (
              <div className="flex mt-12 justify-center items-center">
                <button
                  className="px-4 py-2 bg-slate-200 cursor-pointer hover:bg-slate-300 duration-500 rounded-full"
                  onClick={loadMore}
                >
                  Show more
                </button>
              </div>
            )}
        </div>
      </div>
    );
  };

  const renderMultiCityCard = () => {
    return (
      <>
        <div className="w-full px-2 py-8 sm:px-0">
          <Tab.Group selectedIndex={selectedIndex < Object.keys(categories).length ? selectedIndex : Object.keys(categories).length-1} >
            <Tab.List className="flex space-x-3 rounded-xl bg-white p-1">
              {Object.keys(categories).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      "w-full  max-w-[20rem] rounded-lg py-3.5 text-sm font-medium leading-5",
                      selected
                        ? "bg-black text-white border-1 border-black"
                        : "text-black border-black border-1 focus:border-1"
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              {Object.values(categories).map((posts, idx) => (
                <Tab.Panel
                  key={idx}
                  className={classNames("rounded-xl bg-white p-3")}
                >
                  <ul>
                    {posts.map((post) => (
                      <li
                        key={post.id}
                        className="relative rounded-md p-3 mt-2 hover:bg-gray-100"
                      >
                        <h3 className="text-sm font-medium leading-5">
                         {post.image && <img src={post.image} className="w-10 h-10" />}
                          {post.origin} - {post.destination}
                        </h3>
                        <h1>{post.price}</h1>

                        <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                          <li>{post.date}</li>
                          <li>&middot;</li>
                          <li>{post.commentCount} comments</li>
                          <li>&middot;</li>
                          <li>{post.shareCount} shares</li>
                        </ul>

                        <button onClick={()=>handleAddToMulticityFlights(post)} disabled={selectedIndex === Object.keys(categories).length } className={` text-white rounded px-5 py-2 float-end -mt-[3rem] ${selectedIndex === Object.keys(categories).length ? 'bg-gray-600 cursor-not-allowed':'bg-black cursor-pointer'}`}>Book</button>

                      </li>
                    ))}
                  </ul>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>

        {/* ---------------------------- */}
        <div className="lg:p-10 lg:bg-neutral-50 lg:dark:bg-black/20 grid grid-cols-1 gap-6  rounded-3xl">
          {filteredFlights.length != 0
            ? filteredFlights
                .slice(0, visibleCount)
                .map((item, index) => (
                  <FlightCard key={index} data={item} res_index={index} />
                ))
            : api_error
            ? api_error
            : null}

          {visibleCount < filteredFlights.length && (
            <div className="flex mt-12 justify-center items-center">
              <button
                className="px-4 py-2 bg-slate-200 cursor-pointer hover:bg-slate-300 duration-500 rounded-full"
                onClick={loadMore}
              >
                Show more
              </button>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="container mx-auto p-5 sm:p-0">
      <div className="nc-SectionHeroArchivePage relative flex flex-col">
        <div className="flex flex-col lg:flex-row lg:items-center mt-5">
          <div className="flex flex-shrink-0 flex-col items-start space-y-6 pb-14 lg:mr-10 lg:w-1/2 lg:space-y-10 lg:pb-64 xl:mr-0 xl:pb-80 xl:pr-14">
            <h2 className="text-4xl font-medium leading-[110%] md:text-5xl xl:text-7xl">
              <span className="text-purple-500">Take Off</span> to Your Next
              Adventure!
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
      <div className="mt-5">
        {dropOffLocationType == 1
          ? renderOneWayCard()
          : dropOffLocationType == 2
          ? renderRoundTripCard()
          : renderMultiCityCard()}
      </div>

      {/* fixed div for selected flight  */}
      {selectedFlight && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 border-t-2 border-gray-300 z-50">
          <div className="flex justify-between items-center">
            <div className="flex items-start">
              <img
                src={`https://www.gstatic.com/flights/airline_logos/70px/${selectedFlight.Segments.flat()[0].Airline.AirlineCode}.png`}
                alt="Airline Logo"
                className="w-12 h-12 mr-4"
              />
              <div className="flex flex-col me-5">
                <span className="font-semibold text-lg">
                {selectedFlight.Segments.flat()[0].Origin.Airport.AirportCode} - {selectedFlight.Segments.flat()[0].Destination.Airport.AirportCode}
                </span>
                <span className="text-xl font-bold text-purple-500">{selectedFlight.Fare.Currency} {(selectedFlight.Fare.BaseFare + selectedFlight.Fare.Tax)}</span>
              </div>
            </div>
            {/* {selectedReturnFlight && (
              <div className="flex items-start">
                <img
                  src={selectedReturnFlight?.airlines.logo}
                  alt="Airline Logo"
                  className="w-12 h-12 mr-4"
                />
                <div className="flex flex-col me-5">
                  <span className="font-semibold text-lg">
                    {selectedReturnFlight?.airlines.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    Departure: 11:00
                  </span>
                  <span className="text-sm text-gray-500">Arrival: 20:00</span>
                </div>
                <span className="font-semibold text-xl text-blue-600">
                  {selectedReturnFlight?.price}
                </span>
              </div>
            )} */}
            <button
              onClick={() => setSelectedFlight(null)} // Clear selection
              className="bg-black px-4 py-2 w-fit rounded text-white hover:bg-gray-800 duration-500 cursor-pointer"
            >
              Book Flight
            </button>
          </div>
        </div>
      )}


      {/* multicity flights fixed div  */}
      {multicitySelectedFlights.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 border-t-2 border-gray-300 z-50">
          <div className="flex justify-start items-center">
            {
              multicitySelectedFlights?.map((item, index) => (
                <div key={index} className="flex items-start border-r ps-4 border-gray-500">
                  <img
                    src={item.image}
                    alt="Airline Logo"
                    className="w-12 h-12 mr-4"
                  />
                  <div className="flex flex-col me-5">
                    <span className="font-semibold text-lg">
                      {item.origin} - {item.destination}
                    </span>
                    <span className="text-xl font-bold text-purple-500">{item.price}</span>
                  </div>
                </div>
              ))
            }
            <div className="flex items-center ms-auto">
              <span className="text-purple-500 font-bold text-xl mr-3">INR {totalSum}</span>
              <button
                // onClick={()=>setSelectedIndex((prevIndex) => prevIndex + 1)}
                className={`bg-black px-4 py-2 w-fit rounded text-white hover:bg-gray-800 duration-500 ${selectedIndex === Object.keys(categories).length ? 'cursor-pointer' : 'hidden'}`}
              >
                Book Flight
              </button>
                <button
                // onClick={()=>setSelectedIndex((prevIndex) => prevIndex + 1)}
                onClick={()=>handleNextButton()}
                className={`bg-black ms-3 px-4 py-2 w-fit rounded text-white hover:bg-gray-800 duration-500 ${(isLastTab || selectedIndex >= Object.keys(categories).length) ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={isLastTab || selectedIndex >= Object.keys(categories).length}
              >
                Next
              </button>
              <button className={`bg-black ms-3 px-4 py-2 w-fit rounded text-white hover:bg-gray-800 duration-500`} onClick={handleRemoveLastFlight}>Prev</button>
            </div>

            </div>
          </div>
      )}
    </div>
  );
};

export default Hero1;
