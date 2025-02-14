import React, { useContext, useState } from "react";
import { AppContext } from "../context/appContext";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { IoChevronDownOutline } from "react-icons/io5";
import OneThumbSlider from "./OneThumbSlider";


const flightClass = [
  { name: "Air India" },
  { name: "Air China" },
  { name: "Star Alliance" },
];

const stopPoints = [
  { name: "NoneStop", val: 1 },
  { name: "2", val: 2 },
  { name: "+2", val: 3 },
];

const TabFilters = () => {
  const { dropOffLocationType, applyFilters, filters, filteredFlights, filteredReturnFlights, filteredMltiFlights, setFilteredFlights, setfilteredReturnFlights, setfilteredMultiFlights } =
    useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    const updatedFilters = {
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    };

    setFilters(updatedFilters); // Update state

    // Apply filters for both departure and return flights
    if (dropOffLocationType == 1) {
      applyFilters(updatedFilters, filteredFlights, setFilteredFlights);
    } else if (dropOffLocationType == 2) {
      applyFilters(updatedFilters, filteredReturnFlights, setfilteredReturnFlights);
    } else if (dropOffLocationType == 3) {
      applyFilters(updatedFilters, filteredMltiFlights, setfilteredMultiFlights);
    }
  };

  // const handleFilterChange = (e) => {
  //   // console.log(e.target.value);
  //   // return false;
  //   const { name, value, type, checked } = e.target;
  //   applyFilters({
  //     ...filters,
  //     [name]: type === "checkbox" ? checked : value,
  //   });
  // };

  const renderAirlines = () => {
    return (
      // <Popover className="relative">
      //   {({ open }) => (
      //     <>
      //       <PopoverButton
      //         as="button"
      //         className="inline-flex items-center rounded-md px-4 py-1.5 text-xs font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      //       >
      //         <span>Airlines</span>
      //         <IoChevronDownOutline
      //           className={`${
      //             open ? "" : "text-opacity-70"
      //           } ml-2 h-4 w-4 transition duration-150 ease-in-out`}
      //           aria-hidden="true"
      //         />
      //       </PopoverButton>
      //       <Transition
      //         enter="transition ease-out duration-200"
      //         enterFrom="opacity-0 translate-y-1"
      //         enterTo="opacity-100 translate-y-0"
      //         leave="transition ease-in duration-150"
      //         leaveFrom="opacity-100 translate-y-0"
      //         leaveTo="opacity-0 translate-y-1"
      //       >
      //         <PopoverPanel className="absolute left-0 top-full z-20 mt-3 w-full max-w-sm rounded-3xl bg-white px-4 py-5 shadow-xl ring-1 ring-black/5 dark:bg-neutral-800 dark:ring-white/10 sm:min-w-[340px] sm:px-8 sm:py-6">
      //           {flightClass.map((item, index) => (
      //             <span
      //               key={item.name}
      //               className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-gray-700"
      //             >
      //               <input type="checkbox" id={`${item.name}-${index}`} />
      //               <label
      //                 className="text-sm ms-2 font-medium"
      //                 for={`${item.name}-${index}`}
      //               >
      //                 {item.name}
      //               </label>
      //             </span>
      //           ))}
      //         </PopoverPanel>
      //       </Transition>
      //     </>
      //   )}
      // </Popover>
      <>
        <select name="airline" onChange={handleFilterChange} className="border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2">
          <option value="">All</option>
          {flightClass.map((item, index) => (
            <option value={item.name} key={index}>{item.name}</option>
          ))}
        </select>
      </>
    );
  };

  const renderStopPoints = () => {
    return (
      // <Popover className="relative">
      //   {({ open }) => (
      //     <>
      //       <PopoverButton
      //         as="button"
      //         className="inline-flex items-center rounded-md px-4 py-1.5 text-xs font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      //       >
      //         <span>Stop Points</span>
      //         <IoChevronDownOutline
      //           className={`${
      //             open ? "" : "text-opacity-70"
      //           } ml-2 h-4 w-4 transition duration-150 ease-in-out`}
      //           aria-hidden="true"
      //         />
      //       </PopoverButton>
      //       <Transition
      //         enter="transition ease-out duration-200"
      //         enterFrom="opacity-0 translate-y-1"
      //         enterTo="opacity-100 translate-y-0"
      //         leave="transition ease-in duration-150"
      //         leaveFrom="opacity-100 translate-y-0"
      //         leaveTo="opacity-0 translate-y-1"
      //       >
      //         <PopoverPanel className="absolute left-0 top-full z-20 mt-3 w-full max-w-sm rounded-3xl bg-white px-4 py-5 shadow-xl ring-1 ring-black/5 dark:bg-neutral-800 dark:ring-white/10 sm:min-w-[340px] sm:px-8 sm:py-6">
      //           {stopPoints.map((item, index) => (
      //             <span
      //               key={item.name}
      //               className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-gray-700"
      //             >
      //               <input type="checkbox" id={`${item.name}-${index}`} />
      //               <label
      //                 className="text-sm ms-2 font-medium"
      //                 for={`${item.name}-${index}`}
      //               >
      //                 {item.name}
      //               </label>
      //             </span>
      //           ))}
      //         </PopoverPanel>
      //       </Transition>
      //     </>
      //   )}
      // </Popover>
      <>
        <select name="stops" onChange={handleFilterChange} className="border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2">
          {stopPoints.map((item, index) => (
            <option value={item.val} key={index}>{item.name}</option>
          ))}
        </select>

      </>
    );
  };

  const renderFlightDuration = () => {
    return (
      // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      <Popover className="relative border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-[4px]">
        {({ open }) => (
          <>
            <PopoverButton
              as="button"
              className="inline-flex items-center rounded-md px-4 py-1.5 text-xs font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              <span>Trip Time</span>
              <IoChevronDownOutline
                className={`${open ? "" : "text-opacity-70"
                  } ml-2 h-4 w-4 transition duration-150 ease-in-out`}
                aria-hidden="true"
              />
            </PopoverButton>
            <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute left-0 top-full z-20 mt-3 w-full max-w-sm rounded-3xl bg-white px-4 py-5 shadow-xl ring-1 ring-black/5 dark:bg-neutral-800 dark:ring-white/10 sm:min-w-[340px] sm:px-8 sm:py-6">
                <OneThumbSlider />
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderRadioBtn = () => {
    return (
      <div>
        <p onClick={() => setShowFilter(!showFilter)} className={`sm:hidden border border-gray-200 mt-[3rem] flex gap-2 items-center px-4 py-2 w-fit rounded text-black hover:bg-gray-800 duration-500 cursor-pointer`}>Filters <IoChevronDownOutline /></p>
        <div className={`${showFilter ? '' : 'hidden'} sm:flex flex-row flex-wrap border-b border-neutral-100 py-5 dark:border-neutral-700 p-5`}>
          <div className="me-5 py-2.5">
            <b>Filters:</b>
          </div>
          <div className="me-2">
            {renderAirlines()}
          </div>
          <div className="me-2">
            {renderStopPoints()}
          </div>
          <div className="">
            {renderFlightDuration()}
          </div>
        </div>
      </div>
    );
  };

  return <div>{renderRadioBtn()}</div>;
};

export default TabFilters;
