import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoChevronDownOutline } from "react-icons/io5";
import { FaPlaneDeparture } from "react-icons/fa";
import { FaPlaneArrival } from "react-icons/fa6";
import { flight_assets } from "../assets/assets";

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import PlaneSeating from "../components/PlaneSeating";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const banks = [
  "Construction Bank Corp.",
  "Agricultural Bank",
  "HSBC Holdings",
  "Bank of America",
  "JPMorgan Chase & Co.",
];

const wallet = [
  "Adyen",
  "Airtel Money",
  "AlliedWallet",
  "Apple Pay",
  "Brinks",
  "CardFree",
];

const BookingAdons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const renderAddInflightMeals = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        <div className="p-4 rounded w-full flex flex-col space-y-6 sm:space-y-8 pb-10 sm:p-4">
          <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Flight Fare
                  </th>
                  <td className="px-6 py-4 text-right">$2500</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <p className="font-bold">Additional Baggage</p>
                    Additional 15kg
                  </th>
                  <td className="px-6 py-4 text-right">+$25</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <p className="font-bold">Inflight Meals</p>
                    Veg Meal X (1)
                  </th>
                  <td className="px-6 py-4 text-right">+$18</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <p className="font-bold">Inflight Meals</p>
                    Non-Veg Meal X (1)
                  </th>
                  <td className="px-6 py-4 text-right">+$18</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <p className="font-bold">Seats</p>
                    Seat(10D)
                  </th>
                  <td className="px-6 py-4 text-right">+$5</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 ps-0 py-4 font-leading text-xl text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Grand Total:
                  </th>
                  <td className="px-6 py-4 text-right text-xl font-leading">
                    $2566
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderAdditonalBaggage = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        <div className="p-4 rounded w-full flex flex-col space-y-6 sm:space-y-8 pb-10 sm:p-4">
          <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <p className="font-bold">Additional 5 KG</p>
                    $10.00
                  </th>
                  <td className="px-6 py-4 text-right">
                    <button className="bg-black px-4 py-2 rounded text-white float-right hover:bg-gray-800 duration-500 cursor-pointer">
                      Add
                    </button>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <p className="font-bold">Additional 7 KG</p>
                    $15.00
                  </th>
                  <td className="px-6 py-4 text-right">
                    <button className="bg-black px-4 py-2 rounded text-white float-right hover:bg-gray-800 duration-500 cursor-pointer">
                      Add
                    </button>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <p className="font-bold">Additional 10 KG</p>
                    $20.00
                  </th>
                  <td className="px-6 py-4 text-right">
                    <button className="bg-black px-4 py-2 rounded text-white float-right hover:bg-gray-800 duration-500 cursor-pointer">
                      Add
                    </button>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <p className="font-bold">Additional 15 KG</p>
                    $25.00
                  </th>
                  <td className="px-6 py-4 text-right">
                    <button className="bg-black px-4 py-2 rounded text-white float-right hover:bg-gray-800 duration-500 cursor-pointer">
                      Add
                    </button>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <p className="font-bold">Additional 20 KG</p>
                    $30.00
                  </th>
                  <td className="px-6 py-4 text-right">
                    <button className="bg-black px-4 py-2 rounded text-white float-right hover:bg-gray-800 duration-500 cursor-pointer">
                      Add
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div>
      {/* backgroundImage */}
      <div
        className={`overflow-hidden h-[15rem] bg-cover bg-center`}
        style={{ backgroundImage: `url(${flight_assets.flight})` }}
      ></div>

      <div className="container mx-auto">
        <main className="relative z-10 mt-11 flex flex-col lg:flex-row">
          <div className="w-full space-y-8 lg:w-3/5 lg:space-y-10 lg:pe-10 xl:w-2/3 pb-10 px-5 md:px-0 rounded">
            {/* Flight details  */}
            <div className="listingSection__wrap !space-y-6">
              <div>
                <div className={`relative`}>
                  <h2 className="text-2xl font-semibold sm:text-lg lg:text-2xl mb-10">
                    Add More For Your Trip
                  </h2>
                  <div>
                    <div className="w-full">
                      <div className="w-full rounded-2xl bg-white p-2">
                        <Disclosure>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full border-gray-200 border justify-between rounded-lg bg-gray-100 px-4 py-5 text-left text-sm font-medium text-black hover:bg-gray-200 focus:outline-none focus-visible:ring ">
                                <span>Select Seat</span>
                                <ChevronUpIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-gray-500`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="py-5 pt-4 text-sm text-gray-500">
                                <PlaneSeating/>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>

                        <Disclosure>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex mt-5 w-full border-gray-200 border justify-between rounded-lg bg-gray-100 px-4 py-5 text-left text-sm font-medium text-black hover:bg-gray-200 focus:outline-none focus-visible:ring ">
                                <span>Add Inflight Meals</span>
                                <ChevronUpIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-gray-500`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="py-5 pt-4 text-sm text-gray-500">
                                {renderAddInflightMeals()}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>

                        <Disclosure>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex mt-5 w-full border-gray-200 border justify-between rounded-lg bg-gray-100 px-4 py-5 text-left text-sm font-medium text-black hover:bg-gray-200 focus:outline-none focus-visible:ring ">
                                <span>Additional Baggage</span>
                                <ChevronUpIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-gray-500`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="py-5 pt-4 text-sm text-gray-500">
                                {renderAdditonalBaggage()}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>

                      </div>
                    </div>
                  </div> <br/>
                  <div>
                  <button className="bg-black px-4 py-2 w-fit rounded text-white float-right hover:bg-gray-800 duration-500 cursor-pointer">
                      Make Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 flex-grow lg:mt-0 p-5 sm:p-0">
            <div className="sticky top-28 pb-10">
              <div className="listingSectionSidebar__wrap shadow-xl p-4 border-1 rounded w-full flex flex-col sm:rounded-2xl border-b sm:border-t sm:border-l sm:border-r border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 pb-10 sm:p-4 xl:p-8">
                <h2 className="text-2xl font-semibold sm:text-lg lg:text-2xl mb-3">
                  Booking Summary
                </h2>
                <div>
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <tbody>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Flight Fare
                        </th>
                        <td className="px-6 py-4 text-right">$2500</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <p className="font-bold">Additional Baggage</p>
                          Additional 15kg
                        </th>
                        <td className="px-6 py-4 text-right">+$25</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <p className="font-bold">Inflight Meals</p>
                          Veg Meal X (1)
                        </th>
                        <td className="px-6 py-4 text-right">+$18</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <p className="font-bold">Inflight Meals</p>
                          Non-Veg Meal X (1)
                        </th>
                        <td className="px-6 py-4 text-right">+$18</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <p className="font-bold">Seats</p>
                          Seat(10D)
                        </th>
                        <td className="px-6 py-4 text-right">+$5</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 ps-0 py-4 font-leading text-xl text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Grand Total:
                        </th>
                        <td className="px-6 py-4 text-right text-xl font-leading">
                          $2566
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* COUPON */}
              <div className="listingSectionSidebar__wrap mt-10 shadow-xl p-4 border-1 rounded w-full flex flex-col sm:rounded-2xl border-b sm:border-t sm:border-l sm:border-r border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 pb-10 sm:p-4 xl:p-8">
                <h2 className="text-2xl font-semibold sm:text-lg lg:text-2xl mb-3">
                  Always First
                </h2>
                <p>Be the first to find out latest tours and exclusive offers and get 15% off your first booking.</p>
                <div>
                  <div className="flex flex-col gap-2 items-end">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                    <button className="bg-black px-4 py-2 w-fit rounded text-white float-right hover:bg-gray-800 duration-500 cursor-pointer">
                      Be The First
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookingAdons;
