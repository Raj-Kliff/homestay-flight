import React, { useState, useEffect, useContext } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoChevronDownOutline } from "react-icons/io5";
import { FaPlaneDeparture } from "react-icons/fa";
import { FaPlaneArrival } from "react-icons/fa6";
import { flight_assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { axios_instance } from '../Helpers/axios_hook.js';
import { AppContext } from '../context/appContext';
import RazorPay from "../components/RazorPay.jsx";

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
  "CardFree"
];


const Payment = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Track loading state
  const [result, setresult] = useState({});
  const { setapi_error } = useContext(AppContext)
  const navigate = useNavigate();
  const { id } = useParams();
  const [currency, setCurrency] = useState(""); // Track loading state
  const [Passengers, setPassengers] = useState([]); // Track loading state
  const [BookingStatus, setBookingStatus] = useState(""); // Track loading state
  const [BookingPrice, setBookingPrice] = useState(""); // Track loading state

  const [name, setName] = useState(""); // Track loading state
  const [email, setEmail] = useState(""); // Track loading state
  const [contact, setContact] = useState(""); // Track loading state

  const renderDebitCard = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        <div>
          <div className={`relative`}>
            <div className="text-neutral-600 dark:text-neutral-300">
              <form action="#">
                <div>
                  <div className="mb-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name On Card
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                    <br />
                    <div>
                      <label
                        htmlFor="brand"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Card Number
                      </label>
                      <input
                        type="number"
                        name="phone"
                        id="phone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="grid gap-4 mb-4 sm:grid-cols-[1fr_2fr_2fr]">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Month
                        </label>
                        <select
                          id=""
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                          <option selected="">Choose</option>
                          {months?.map((item, index) => (
                            <option value={item}>{item}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Year
                        </label>
                        <input
                          type="number"
                          name="year"
                          id="year"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Cvv
                        </label>
                        <input
                          type="number"
                          name="cvv"
                          id="cvv"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-black px-4 py-2 rounded text-white float-right hover:bg-gray-800 duration-500 cursor-pointer"
                >
                  Make Payment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCreditCard = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        <div>
          <div className={`relative`}>
            <div className="text-neutral-600 dark:text-neutral-300">
              <form action="#">
                <div>
                  <div className="mb-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name On Card
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                    <br />
                    <div>
                      <label
                        htmlFor="brand"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Card Number
                      </label>
                      <input
                        type="number"
                        name="phone"
                        id="phone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="grid gap-4 mb-4 sm:grid-cols-[1fr_2fr_2fr]">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Month
                        </label>
                        <select
                          id=""
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                          <option selected="">Choose</option>
                          {months?.map((item, index) => (
                            <option value={item}>{item}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Year
                        </label>
                        <input
                          type="number"
                          name="year"
                          id="year"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Cvv
                        </label>
                        <input
                          type="number"
                          name="cvv"
                          id="cvv"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-black px-4 py-2 rounded text-white float-right hover:bg-gray-800 duration-500 cursor-pointer"
                >
                  Make Payment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderNetBanking = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        <div>
          <div className={`relative`}>
            <div className="text-neutral-600 dark:text-neutral-300">
              <form action="#">
                <div>
                  <h5 className="font-bold mb-6">Select Popular Banks</h5>
                  <div className="grid sm:grid-cols-2 ">
                    <>
                      {/* Industrial & Commercial Bank */}
                      <div className="flex items-center mb-4">
                        <input
                          id="bank-radio-1"
                          type="radio"
                          defaultValue=""
                          name="bank-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="bank-radio-1"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Industrial & Commercial Bank
                        </label>
                      </div>

                      {/* Construction Bank Corp. */}
                      <div className="flex items-center mb-4">
                        <input
                          id="bank-radio-2"
                          type="radio"
                          defaultValue=""
                          name="bank-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="bank-radio-2"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Construction Bank Corp.
                        </label>
                      </div>

                      {/* Agricultural Bank */}
                      <div className="flex items-center mb-4">
                        <input
                          id="bank-radio-3"
                          type="radio"
                          defaultValue=""
                          name="bank-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="bank-radio-3"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Agricultural Bank
                        </label>
                      </div>

                      {/* HSBC Holdings */}
                      <div className="flex items-center mb-4">
                        <input
                          id="bank-radio-4"
                          type="radio"
                          defaultValue=""
                          name="bank-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="bank-radio-4"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          HSBC Holdings
                        </label>
                      </div>

                      {/* Bank of America */}
                      <div className="flex items-center mb-4">
                        <input
                          id="bank-radio-5"
                          type="radio"
                          defaultValue=""
                          name="bank-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="bank-radio-5"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Bank of America
                        </label>
                      </div>

                      {/* JPMorgan Chase & Co. */}
                      <div className="flex items-center mb-4">
                        <input
                          id="bank-radio-6"
                          type="radio"
                          defaultValue=""
                          name="bank-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="bank-radio-6"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          JPMorgan Chase & Co.
                        </label>
                      </div>
                    </>
                  </div>
                  <br />
                  <div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Select Bank
                      </label>
                      <select
                        id=""
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option selected="">Choose</option>
                        {banks?.map((item, index) => (
                          <option value={item}>{item}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-black px-4 py-2 mt-5 rounded text-white float-right hover:bg-gray-800 duration-500 cursor-pointer"
                >
                  Make Payment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderWallet = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        <div>
          <div className={`relative`}>
            <div className="text-neutral-600 dark:text-neutral-300">
              <form action="#">
                <div>
                  <h5 className="font-bold mb-6">Select Your Wallet</h5>
                  <div className="grid sm:grid-cols-2 ">
                    <>
                      {/* Industrial & Commercial Bank */}
                      <div className="flex items-center mb-4">
                        <input
                          id="bank-radio-1"
                          type="radio"
                          defaultValue=""
                          name="bank-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="bank-radio-1"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Industrial & Commercial Bank
                        </label>
                      </div>

                      {/* Construction Bank Corp. */}
                      <div className="flex items-center mb-4">
                        <input
                          id="bank-radio-2"
                          type="radio"
                          defaultValue=""
                          name="bank-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="bank-radio-2"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Construction Bank Corp.
                        </label>
                      </div>

                      {/* Agricultural Bank */}
                      <div className="flex items-center mb-4">
                        <input
                          id="bank-radio-3"
                          type="radio"
                          defaultValue=""
                          name="bank-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="bank-radio-3"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Agricultural Bank
                        </label>
                      </div>

                      {/* HSBC Holdings */}
                      <div className="flex items-center mb-4">
                        <input
                          id="bank-radio-4"
                          type="radio"
                          defaultValue=""
                          name="bank-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="bank-radio-4"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          HSBC Holdings
                        </label>
                      </div>

                      {/* Bank of America */}
                      <div className="flex items-center mb-4">
                        <input
                          id="bank-radio-5"
                          type="radio"
                          defaultValue=""
                          name="bank-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="bank-radio-5"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Bank of America
                        </label>
                      </div>

                      {/* JPMorgan Chase & Co. */}
                      <div className="flex items-center mb-4">
                        <input
                          id="bank-radio-6"
                          type="radio"
                          defaultValue=""
                          name="bank-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="bank-radio-6"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          JPMorgan Chase & Co.
                        </label>
                      </div>
                    </>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-black px-4 py-2 mt-5 rounded text-white float-right hover:bg-gray-800 duration-500 cursor-pointer"
                >
                  Make Payment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getRecords = async () => {
    try {
      await axios_instance.get(`/flights/select/${id}`).then((response) => {
        if (response.status === 200) {
          if (typeof (response.data) === "string") {
            setapi_error(response.data);
          } else {
            const { PreferredCurrency, Passengers, BookingStatus, BookingPrice } = response.data;
            setCurrency(PreferredCurrency);
            setPassengers(Passengers);
            setBookingStatus(BookingStatus);
            setBookingPrice(BookingPrice);
            console.log(Passengers[0])
            const full_name = `${Passengers[0].title} ${Passengers[0].firstname} ${Passengers[0].lastname}`;
            setName(full_name);
            setEmail(Passengers[0].email)
            setContact(Passengers[0].contactNumber)
          }
        }
      }).finally(() => {
        setLoading(false); // Disable button & show loading effect
      });
    } catch (error) {
      console.warn("Error :- ", error);
      setapi_error(error);
    }
  }

  useEffect(() => {
    getRecords()
  }, [])

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
                    Payment Option
                  </h2>
                  <div>
                    <div className="w-full">
                      <RazorPay currency={currency} amount={BookingPrice} name={name} email={email} contact={contact} />
                      {/* <div className="w-full rounded-2xl bg-white p-2">
                        <Disclosure>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full border-gray-200 border justify-between rounded-lg bg-gray-100 px-4 py-5 text-left text-sm font-medium text-black hover:bg-gray-200 focus:outline-none focus-visible:ring ">
                                <span>Debit Card</span>
                                <ChevronUpIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-gray-500`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="py-5 pt-4 text-sm text-gray-500">
                                {renderDebitCard()}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>

                        <Disclosure>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex mt-5 w-full border-gray-200 border justify-between rounded-lg bg-gray-100 px-4 py-5 text-left text-sm font-medium text-black hover:bg-gray-200 focus:outline-none focus-visible:ring ">
                                <span>Credit Card</span>
                                <ChevronUpIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-gray-500`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="py-5 pt-4 text-sm text-gray-500">
                                {renderCreditCard()}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>

                        <Disclosure>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex mt-5 w-full border-gray-200 border justify-between rounded-lg bg-gray-100 px-4 py-5 text-left text-sm font-medium text-black hover:bg-gray-200 focus:outline-none focus-visible:ring ">
                                <span>Net Banking</span>
                                <ChevronUpIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-gray-500`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="py-5 pt-4 text-sm text-gray-500">
                                {renderNetBanking()}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>

                        <Disclosure>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex mt-5 w-full border-gray-200 border justify-between rounded-lg bg-gray-100 px-4 py-5 text-left text-sm font-medium text-black hover:bg-gray-200 focus:outline-none focus-visible:ring ">
                                <span>My Wallet</span>
                                <ChevronUpIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-gray-500`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="py-5 pt-4 text-sm text-gray-500">
                                {renderWallet()}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      </div> */}
                    </div>
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
                        <td className="px-6 py-4 text-right">{currency}   {BookingPrice}</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <p className="font-bold">Additional Baggage</p>
                          Additional 15kg
                        </th>
                        <td className="px-6 py-4 text-right">0</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <p className="font-bold">Inflight Meals</p>
                          Veg Meal X (1)
                        </th>
                        <td className="px-6 py-4 text-right">0</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <p className="font-bold">Inflight Meals</p>
                          Non-Veg Meal X (1)
                        </th>
                        <td className="px-6 py-4 text-right">0</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <p className="font-bold">Seats</p>
                          Seat(10D)
                        </th>
                        <td className="px-6 py-4 text-right">0</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 ps-0 py-4 font-leading text-xl text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Grand Total:
                        </th>
                        <td className="px-6 py-4 text-right text-xl font-leading">
                          {currency}   {BookingPrice}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Payment;
