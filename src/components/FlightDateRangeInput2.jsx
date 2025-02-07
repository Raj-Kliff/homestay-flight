import React, { useState, Fragment } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LuCalendarDays } from "react-icons/lu";

const FlightDateRangeInput2 = ({ hasButtonSubmit = false }) => {
  const [startDate, setStartDate] = useState(new Date()); // default start date is today

  const renderInput = () => {
    return (
      <>
        <div className="text-neutral-300 dark:text-neutral-400">
          <LuCalendarDays className="sm:w-6 sm:h-6 w-4 h-4 ms-2 sm:ms-3" />
        </div>
        <div className="flex-grow text-left">
          <span className="block font-semibold xl:text-lg">
            {startDate
              ? startDate.toLocaleDateString("en-US", {
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

                {startDate && open && (
                  <button
                    onClick={() => setStartDate(null)}
                    className="text-red-500 bg-red-200 rounded-full cursor-pointer px-2 py-1 hover:text-red-700"
                  >
                    Clear
                  </button>
                )}
              </PopoverButton>

              {/* BUTTON SUBMIT OF FORM */}
              <a
                type="button"
                class="flex h-14 mt-5 sm:mt-0 sm:ms-5 w-full items-center justify-center rounded-full bg-purple-500 text-white hover:bg-purple-600 focus:outline-none md:h-16 md:w-16"
                href="#"
              >
                <span class="me-3 md:hidden">Search</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  color="currentColor"
                  fill="none"
                  class="h-6 w-6"
                >
                  <path
                    d="M17.5 17.5L22 22"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </a>
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
              <PopoverPanel className="absolute left-1/2 top-full z-20 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div
                  className="overflow-hidden mt-[2rem] rounded-3xl bg-white p-4 shadow-lg dark:bg-neutral-800"
                  style={{ width: "fit-content" }}
                >
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)} // Update only startDate
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
