import React, { useState, Fragment, useContext } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LuCalendarDays } from "react-icons/lu";
import { AppContext } from '../Context/appContext'

const FlightDateRangeInput = ({
  selectsRange = true,
  hasButtonSubmit = false,
}) => {
  const { start_date, setstart_date, end_date, setend_date } = useContext(AppContext);

  const onChangeRangeDate = (dates) => {
    const [start, end] = dates;
    setstart_date(start);
    setend_date(end); // Update both start and end dates
  };

  const renderInput = () => {
    return (
      <>
        <div className="text-neutral-300 dark:text-neutral-400">
          <LuCalendarDays className="sm:w-6 sm:h-6 w-4 h-4 sm:ms-3" />
        </div>
        <div className="flex-grow text-left">
          <span className="block font-semibold xl:text-lg">
            {start_date
              ? start_date.toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
              })
              : "Add dates"}
            {selectsRange && end_date
              ? " - " +
              end_date.toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
              })
              : ""}
          </span>
          <span className="mt-1 block text-sm font-light leading-none text-neutral-400">
            {selectsRange ? "Pick up - Drop off" : "Pick up date"}
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
              className={`z-10 flex flex-col sm:flex-row flex-1 items-start sm:items-center focus:outline-none ${open ? "nc-hero-field-focused" : ""
                }`}
            >
              <PopoverButton className="relative z-10 flex flex-1 items-center space-x-3 focus:outline-none">
                {renderInput()}

                {/* {start_date && open && (
                  <button
                    onClick={() => {
                      setstart_date(null);
                      setend_date(null);
                    }}
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
              <PopoverPanel className="absolute -left-[4.5rem] top-full z-20 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div
                  className="overflow-hidden border border-gray-100 rounded-3xl bg-white p-4 shadow-lg dark:bg-neutral-800"
                  style={{ width: "fit-content" }}
                >
                  {selectsRange ? (
                    <DatePicker
                      selected={start_date}
                      onChange={onChangeRangeDate}
                      startDate={start_date}
                      endDate={end_date}
                      selectsRange
                      monthsShown={2}
                      showPopperArrow={false}
                      inline
                    />
                  ) : (
                    <DatePicker
                      selected={start_date}
                      onChange={(date) => setstart_date(date)}
                      monthsShown={2}
                      showPopperArrow={false}
                      inline
                    />
                  )}
                </div>
              </PopoverPanel>
            </div>
          </>
        )}
      </Popover>
    </div>
  );
};

export default FlightDateRangeInput;
