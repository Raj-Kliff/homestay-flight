import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoChevronDownOutline } from "react-icons/io5";
import { FaPlaneDeparture } from "react-icons/fa";
import { FaPlaneArrival } from "react-icons/fa6";
import { flight_assets } from "../assets/assets";

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, TrashIcon } from "@heroicons/react/20/solid";

const Booking = () => {

  const [person, setPerson] = useState([1]);

  const handleAddPerson = () => {
    setPerson([...person, person.length+1])
  }

  const handleDeletePerson = (index) => {
    const newPerson = person.filter((_,i) => i != index);
    setPerson(newPerson)
  }

  const renderForm = () => {
    return (
      <>
        <form action="#">
          <div>
            <div className="grid gap-4 mb-4 sm:grid-cols-[1fr_1fr_1fr]">
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <select
                  id=""
                  name="Title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="Mr">Mr.</option>
                  <option value="Ms">Ms.</option>
                  <option value="Mrs">Mrs.</option>
                </select>
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="FirstName"
                  id="firstname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="LastName"
                  id="lastname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="grid gap-4 mb-4 sm:grid-cols-[1fr_1fr_1fr]">
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Pax Type
                </label>
                <select
                  id=""
                  name="PaxType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="">Type1</option>
                  <option value="">Type2</option>
                </select>
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="DateOfBirth"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Gender
                </label>
                <select
                  id=""
                  name="Gender"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="">Male</option>
                  <option value="">Female</option>
                  <option value="">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className="grid gap-4 mb-4 sm:grid-cols-[1fr_1fr_1fr]">
            <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Passport Number
                </label>
                <input
                  type="text"
                  name="PassportNo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Passport Expiry
                </label>
                <input
                  type="date"
                  name="PassportExpiry"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  City
                </label>
                <select
                  id=""
                  name="City"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="">New Delhi</option>
                  <option value="">Bahadurgarh</option>
                </select>
            </div>
            </div>
          </div>

          <div>
            <div className="grid gap-4 mb-4 sm:grid-cols-[1fr_1fr]">
            <div>
                <label
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="AddressLine1"
                  placeholder="Address line 1"
                  className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            <div>
                <label
                  className="invisible text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address line 2
                </label>
                <input
                  type="text"
                  name="AddressLine2"
                  placeholder="Address line 2"
                  className="bg-gray-50 mt-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="grid gap-4 mb-4 sm:grid-cols-[1fr_1fr_1fr]">
            <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Country Code
                </label>
                <select
                  id=""
                  name="CountryCode"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="">IN</option>
                  <option value="">US</option>
                </select>
            </div>
            <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Country
                </label>
                <select
                  id=""
                  name="CountryName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="">INDIA</option>
                  <option value="">USA</option>
                </select>
            </div>
            <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nationality
                </label>
                <select
                  id=""
                  name="Nationality"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="">INDIAN</option>
                  <option value="">AMERICAN</option>
                </select>
            </div>
            <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contact Number
                </label>
                <input
                  type="number"
                  name="ContactNo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="Email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Is Lead Pax
                </label>
                <select
                  id=""
                  name="IsLeadPax"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="">True</option>
                  <option value="">False</option>
                </select>
            </div>
            <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  FF Airline Code
                </label>
                <input
                  type="text"
                  name="FFAirlineCode"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  FF Number
                </label>
                <input
                  type="text"
                  name="FFNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-bold pt-5 mb-5">Fare <hr/></h5>
            <div className="grid gap-4 mb-4 sm:grid-cols-[1fr_1fr_1fr_1fr]">
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Base Fare
                </label>
                <input
                  type="number"
                  name="BaseFare"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tax
                </label>
                <input
                  type="number"
                  name="Tax"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  YQ Tax
                </label>
                <input
                  type="number"
                  name="YQTax"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Additional Txn Fee Pub
                </label>
                <input
                  type="number"
                  name="AdditionalTxnFeePub"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Additional Txn Fee Ofrd
                </label>
                <input
                  type="number"
                  name="AdditionalTxnFeeOfrd"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Other Charges
                </label>
                <input
                  type="number"
                  name="OtherCharges"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-bold pt-5 mb-5">Baggage <hr/></h5>
            <div className="grid gap-4 mb-4 sm:grid-cols-[1fr_1fr_1fr_1fr]">
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Airline Code
                </label>
                <input
                  type="text"
                  name="AirlineCode"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Flight Number
                </label>
                <input
                  type="number"
                  name="FlightNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Way Type
                </label>
                <select
                  id=""
                  name="WayType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="0">NotSet</option>
                  <option value="1">Segment</option>
                  <option value="2">FullJourney</option>
                </select>
            </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Code
                </label>
                <input
                  type="text"
                  name="Code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <select
                  id=""
                  name="Description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="0">NotSet</option>
                  <option value="1">Included </option>
                  <option value="2">Direct</option>
                  <option value="3">Imported</option>
                  <option value="4">UpGrade</option>
                  <option value="5">ImportedUpgrade </option>
                </select>
            </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Weight
                </label>
                <input
                  type="number"
                  name="Weight"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Currency
                </label>
                <select
                  id=""
                  name="WayType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="0">INR</option>
                  <option value="1">USD</option>
                </select>
            </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="Price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Origin
                </label>
                <input
                  type="text"
                  name="Origin"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Destination
                </label>
                <input
                  type="text"
                  name="Destination"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-bold pt-5 mb-5">Meal Dynamic <hr/></h5>
            <div className="grid gap-4 mb-4 sm:grid-cols-[1fr_1fr_1fr_1fr]">
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Airline Code
                </label>
                <input
                  type="text"
                  name="AirlineCode"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Flight Number
                </label>
                <input
                  type="number"
                  name="FlightNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Way Type
                </label>
                <select
                  id=""
                  name="WayType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="0">NotSet</option>
                  <option value="1">Segment</option>
                  <option value="2">FullJourney</option>
                </select>
            </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Code
                </label>
                <input
                  type="text"
                  name="Code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <select
                  id=""
                  name="Description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="0">NotSet</option>
                  <option value="1">Included </option>
                  <option value="2">Direct</option>
                  <option value="3">Imported</option>
                  <option value="4">UpGrade</option>
                  <option value="5">ImportedUpgrade </option>
                </select>
            </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  AirlineDescription
                </label>
                <select
                  id=""
                  name="AirlineDescription"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="0">NotSet</option>
                  <option value="1">Included </option>
                  <option value="2">Direct</option>
                  <option value="3">Imported</option>
                  <option value="4">UpGrade</option>
                  <option value="5">ImportedUpgrade </option>
                </select>
            </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  name="Quantity"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Currency
                </label>
                <select
                  id=""
                  name="WayType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="0">INR</option>
                  <option value="1">USD</option>
                </select>
            </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="Price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Origin
                </label>
                <input
                  type="text"
                  name="Origin"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Destination
                </label>
                <input
                  type="text"
                  name="Destination"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-bold pt-5 mb-5">Seat Dynamic <hr/></h5>
            <div className="grid gap-4 mb-4 sm:grid-cols-[1fr_1fr_1fr_1fr]">
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Airline Code
                </label>
                <input
                  type="text"
                  name="AirlineCode"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Flight Number
                </label>
                <input
                  type="number"
                  name="FlightNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Craft Type
                </label>
                <select
                  id=""
                  name="CraftType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="0">NotSet</option>
                  <option value="1">Segment</option>
                  <option value="2">FullJourney</option>
                </select>
            </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Code
                </label>
                <input
                  type="text"
                  name="Code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <select
                  id=""
                  name="Description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="0">NotSet</option>
                  <option value="1">Included </option>
                  <option value="2">Direct</option>
                  <option value="3">Imported</option>
                  <option value="4">UpGrade</option>
                  <option value="5">ImportedUpgrade </option>
                </select>
            </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Availablity Type
                </label>
                <select
                  id=""
                  name="AvailablityType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="0">Type 1</option>
                  <option value="1">Type 2</option>
                </select>
            </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Row No
                </label>
                <input
                  type="number"
                  name="RowNo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Seat No
                </label>
                <input
                  type="number"
                  name="SeatNo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Seat Type
                </label>
                <select
                  id=""
                  name="SeatType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="0">NotSet</option>
                  <option value="1">Segment</option>
                  <option value="2">FullJourney</option>
                </select>
            </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Seat Way Type
                </label>
                <select
                  id=""
                  name="SeatWayType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="0">NotSet</option>
                  <option value="1">Segment</option>
                  <option value="2">FullJourney</option>
                </select>
            </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Compartment
                </label>
                <select
                  id=""
                  name="Compartment"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="0">One</option>
                  <option value="1">Two</option>
                </select>
            </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Deck
                </label>
                <select
                  id=""
                  name="Deck"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="0">One</option>
                  <option value="1">Two</option>
                </select>
            </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Currency
                </label>
                <select
                  id=""
                  name="WayType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="0">INR</option>
                  <option value="1">USD</option>
                </select>
            </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="Price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Origin
                </label>
                <input
                  type="text"
                  name="Origin"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Destination
                </label>
                <input
                  type="text"
                  name="Destination"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-bold pt-5 mb-5">Special Services <hr/></h5>
            <div className="grid gap-4 mb-4 sm:grid-cols-[1fr_1fr_1fr_1fr]">
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Airline Code
                </label>
                <input
                  type="text"
                  name="AirlineCode"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Flight Number
                </label>
                <input
                  type="number"
                  name="FlightNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Service Type
                </label>
                <select
                  id=""
                  name="ServiceType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="0">Type1</option>
                  <option value="1">Type2</option>
                </select>
            </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Code
                </label>
                <input
                  type="text"
                  name="Code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Departure Time
                </label>
                <input
                  type="date"
                  name="DepartureTime"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Way Type
                </label>
                <select
                  id=""
                  name="WayType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="0">NotSet</option>
                  <option value="1">Included </option>
                  <option value="2">Direct</option>
                  <option value="3">Imported</option>
                </select>
            </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Text
                </label>
                <input
                  type="text"
                  name="Text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Currency
                </label>
                <select
                  id=""
                  name="WayType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Choose</option>
                  <option value="0">INR</option>
                  <option value="1">USD</option>
                </select>
            </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="Price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Origin
                </label>
                <input
                  type="text"
                  name="Origin"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Destination
                </label>
                <input
                  type="text"
                  name="Destination"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-bold pt-5 mb-5">GST <hr/></h5>
            <div className="grid gap-4 mb-4 sm:grid-cols-[1fr_1fr_1fr_1fr]">
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  GST Company Name
                </label>
                <input
                  type="text"
                  name="GSTCompanyName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  GST Number
                </label>
                <input
                  type="text"
                  name="GSTNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  GST Company Email
                </label>
                <input
                  type="email"
                  name="GSTCompanyEmail"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  GST Company Contact
                </label>
                <input
                  type="number"
                  name="GSTCompanyContactNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div className="col-span-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  GST Company Address
                </label>
                <input
                  type="text"
                  name="GSTCompanyAddress"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            </div>
          </div>

        </form>
      </>
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
                <div className={`relative sm:pr-20`}>
                  <h2 className="text-2xl font-semibold sm:text-lg lg:text-2xl mb-10">
                    Flight Details
                  </h2>
                  <div className="flex flex-col space-y-6 sm:flex-row sm:items-center sm:space-y-0">
                    {/* LOGO IMG */}
                    <div className="w-24  lg:w-32">
                      <img
                        src={
                          "https://www.gstatic.com/flights/airline_logos/70px/SQ.png"
                        }
                        width={60}
                        height={60}
                        className="w-10"
                        alt="air-logo"
                        sizes="40px"
                      />
                    </div>

                    {/* FOR MOBILE RESPONSIVE */}
                    <div className="block space-y-1 lg:hidden">
                      <div className="flex font-semibold">
                        <div>
                          <span>11:00</span>
                          <span className="mt-0.5 flex items-center text-sm font-normal text-neutral-500">
                            HND
                          </span>
                        </div>
                        <span className="flex w-12 justify-center">
                          <FaArrowRightLong className="h-5 w-5" />
                        </span>
                        <div>
                          <span>20:00</span>
                          <span className="mt-0.5 flex items-center text-sm font-normal text-neutral-500">
                            SIN
                          </span>
                        </div>
                      </div>

                      <div className="mt-0.5 text-sm font-normal text-neutral-500">
                        <span className="VG3hNb">Nonstop</span>
                        <span className="mx-2">·</span>
                        <span>7h 45m</span>
                        <span className="mx-2">·</span>
                        <span>HAN</span>
                      </div>
                    </div>

                    <div className="hidden min-w-[150px] flex-[4] lg:block">
                      <div className="text-lg font-medium">Vistara</div>
                    </div>

                    {/* TIME */}
                    <div className="hidden flex-[4] whitespace-nowrap lg:block">
                      <div className="text-lg font-medium">DXB 17.00 </div>
                      <div className="mt-0.5 text-sm font-normal text-neutral-500">
                        sat, 12 oct 2023
                      </div>
                    </div>

                    <div className="lg:flex justify-between items-center gap-3 me-10 hidden text-gray-400">
                      <div className="text-lg font-medium">
                        <FaPlaneDeparture />
                      </div>
                      <hr className="h-[2px] w-[5rem] bg-gray-400" />
                      <div className="text-lg font-medium">
                        <FaPlaneArrival />
                      </div>
                    </div>

                    {/* TYPE */}
                    <div className="hidden flex-[4] whitespace-nowrap lg:block">
                      <div className="text-lg font-medium">CDG 17.00</div>
                      <div className="mt-0.5 text-sm font-normal text-neutral-500">
                        sat, 12 oct 2023
                      </div>
                    </div>

                    {/* PRICE */}
                    <div className="flex-[4] whitespace-nowrap sm:text-right">
                      <div className="text-left">
                        <div className="text-secondary-600 text-xl font-semibold">
                          20h 45m
                        </div>
                      </div>
                      <div className="mt-0.5 text-xs font-normal text-left text-neutral-500 sm:text-sm">
                        1 stop
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Information */}
            <div className="listingSection__wrap !space-y-6">
              <div>
                <div className={`relative sm:pr-20`}>
                  <h2 className="text-2xl font-semibold sm:text-lg lg:text-2xl mb-3">
                    Information
                  </h2>
                  <div className="text-neutral-600 dark:text-neutral-300">
                    <div className="mt-3">
                      <h5 className="font-bold mb-3">Cancellation Charges</h5>
                      <p>Airline fee : $2012</p>
                      <p>
                        This airline allows cancellation only before 2 hrs from
                        departure time.
                      </p>
                    </div>
                    <div className="mt-3">
                      <h5 className="font-bold mb-3">Reschedule Charges</h5>
                      <p>Airline fee : $2012</p>
                      <p>
                        This airline allows reschedule only before 2 hrs from
                        departure time.
                      </p>
                    </div>
                    <div className="mt-3">
                      <h5 className="font-bold mb-3">Baggage Policy</h5>
                      <p>Check-in Baggage : 15 kg</p>
                      <p>Cabin Baggage: 7 kg</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Traveller Details  */}
            <div className="listingSection__wrap !space-y-6">
              <div>
                <div className={`relative sm:pr-20`}>
                  <h2 className="text-2xl font-semibold sm:text-lg lg:text-2xl mb-5">
                    Traveller Details
                  </h2>
                  {
                    person.map((_, index)=>(
                      <div className="text-neutral-600 dark:text-neutral-300">
                        <h5 className="mb-3 bg-black text-white rounded p-2 flex justify-between"><span>Person {index+1}</span> {person.length > 1 && (<TrashIcon onClick={()=>handleDeletePerson(index)} className="h-5 w-5 mr-2 text-red-600 hover:text-red-500 duration-500 cursor-pointer" />)}</h5>
                        {renderForm()}
                        <br/><br/>
                      </div>
                    ))
                  }
                  <div>
                    <button onClick={()=>handleAddPerson()} className="bg-black px-4 py-2 rounded text-white float-right hover:bg-gray-800 duration-500 cursor-pointer">+ Add More People</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tavel Insurance */}
            <div className="listingSection__wrap !space-y-6">
              <div>
                <div className={`relative sm:pr-20`}>
                  <h2 className="text-2xl font-semibold sm:text-lg lg:text-2xl mb-3">
                    Travel Insurance
                  </h2>
                  <div className="text-neutral-600 dark:text-neutral-300">
                    <form action="#">
                      <div>
                        <h5 className="font-bold mb-3">
                          Secure your travel with travel insurance for
                          $25/person
                        </h5>
                        <div className="">
                          <>
                            <div className="flex items-center mb-4">
                              <input
                                id="default-radio-1"
                                type="radio"
                                defaultValue=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor="default-radio-1"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Yes, I want to secure my travel with insurance
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                defaultChecked=""
                                id="default-radio-2"
                                type="radio"
                                defaultValue=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor="default-radio-2"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                No, I do not want to secure my travel with
                                insurance
                              </label>
                            </div>
                          </>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-black px-4 py-2 rounded text-white float-right hover:bg-gray-800 duration-500 cursor-pointer"
              >
                Continue Booking
              </button>
            </div>
          </div>

          <div className="mt-14 flex-grow lg:mt-0 p-5 sm:p-0">
            <div className="sticky top-28 pb-10">
              <div className="listingSectionSidebar__wrap shadow-xl p-4 border-1 rounded w-full flex flex-col sm:rounded-2xl border-b sm:border-t sm:border-l sm:border-r border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 pb-10 sm:p-4 xl:p-8">
                <h2 className="text-2xl font-semibold sm:text-lg lg:text-2xl mb-3">
                  Travel Insurance
                </h2>
                <div>
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <tbody>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Adults (3 X $2501)
                        </th>
                        <td className="px-6 py-4 text-right">$250</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Total Taxes
                        </th>
                        <td className="px-6 py-4 text-right">$25</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Insurance
                        </th>
                        <td className="px-6 py-4 text-right">$25</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Convenience fee
                        </th>
                        <td className="px-6 py-4 text-right">$25</td>
                      </tr>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 ps-0 py-4 font-leading text-xl text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Grand Total:
                        </th>
                        <td className="px-6 py-4 text-right text-xl font-leading">
                          $250
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* COUPON */}
              <div className="listingSectionSidebar__wrap mt-10 shadow-xl p-4 border-1 rounded w-full flex flex-col sm:rounded-2xl border-b sm:border-t sm:border-l sm:border-r border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 pb-10 sm:p-4 xl:p-8">
                <h2 className="text-2xl font-semibold sm:text-lg lg:text-2xl mb-3">
                  Have a coupon code?
                </h2>
                <div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                    <button className="bg-black px-4 py-2 rounded text-white float-right hover:bg-gray-800 duration-500 cursor-pointer">
                      Apply
                    </button>
                  </div>
                  <br />
                  <div>
                    <form action="#">
                      <div>
                        <div>
                          <>
                            {/* First radio button */}
                            <div className="flex items-start mb-4">
                              <input
                                id="insurance-radio-1"
                                type="radio"
                                defaultValue=""
                                name="travel-insurance"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor="insurance-radio-1"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                <h3 className="font-bold">RICA500</h3>
                                <p>
                                  Use RICA50, and get $50 off on first booking
                                </p>
                              </label>
                            </div>

                            {/* Second radio button */}
                            <div className="flex items-center mb-4">
                              <input
                                id="insurance-radio-2"
                                type="radio"
                                defaultChecked=""
                                name="travel-insurance"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor="insurance-radio-2"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                <h3 className="font-bold">CAB10</h3>
                                <p>
                                  Use FLY10, and get 10% off upto $50 on cab
                                  ticket bookings.
                                </p>
                              </label>
                            </div>

                            {/* Third radio button */}
                            <div className="flex items-center">
                              <input
                                id="insurance-radio-3"
                                type="radio"
                                defaultValue=""
                                name="travel-insurance"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor="insurance-radio-3"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                <h3 className="font-bold">CAB80</h3>
                                <p>
                                  Upto 80% Off + Upto 40% Cashback on Cab
                                  booking & more + Extra 10% off via ICICI Cards
                                </p>
                              </label>
                            </div>
                          </>
                        </div>
                      </div>
                    </form>
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

export default Booking;
