import React, { useState, Fragment,useContext } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LuCalendarDays } from "react-icons/lu";
import { AppContext } from '../Context/appContext'

const FlightDateRangeInput2 = ({ hasButtonSubmit = false }) => {
 const { start_date,setstart_date } = useContext(AppContext);
  const renderInput = () => {
    return (
      <>
        <div className="text-neutral-300 dark:text-neutral-400">
          <LuCalendarDays className="sm:w-6 sm:h-6 w-4 h-4 ms-2 sm:ms-3" />
        </div>
        <div className="flex-grow text-left">
          <span className="block font-semibold xl:text-lg">
            {start_date
              ? start_date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                })
              : "Add date"}
          </span>
          <span className="mt-1 block text-sm font-light leading-none text-neutral-400">
            'Pick up date'
          </span>
        </div>
      </>
    );
  };

  return (
    <div>
      <Popover className="relative flex">
        {({ open }) => (
          <>
            <div
              className={`z-10 flex flex-col sm:flex-row flex-1 items-start sm:items-center focus:outline-none ${
                open ? "nc-hero-field-focused" : ""
              }`}
            >
              <PopoverButton className="relative z-10 flex flex-1 items-center space-x-3 focus:outline-none">
                {renderInput()}

                {/* {start_date && open && (
                  <button
                    onClick={() => setstart_date(null)}
                    className="text-red-500 bg-red-200 rounded-full cursor-pointer px-2 py-1 hover:text-red-700"
                  >
                    Clear
                  </button>
                )} */}
              </PopoverButton>
            </div>

            {open && (
              <div className="absolute -left-0.5 right-10 top-1/2 z-0 h-8 -translate-y-1/2 self-center bg-white dark:bg-neutral-800"></div>
            )}

            <div
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute right-0 top-full z-20 mt-3 w-fit transform px-4 sm:px-0 lg:max-w-3xl">
                <div
                  className="overflow-hidden border border-gray-100 rounded-3xl bg-white p-4 shadow-lg dark:bg-neutral-800"
                  style={{ width: "fit-content" }}
                >
                  <DatePicker
                    selected={start_date}
                    onChange={(date) => setstart_date(date)} // Update only startDate
                    monthsShown={1} // Show only one month
                    showPopperArrow={false}
                    inline
                  />
                </div>
              </PopoverPanel>
            </div>
          </>
        )}
      </Popover>
    </div>
  );
};

export default FlightDateRangeInput2;
