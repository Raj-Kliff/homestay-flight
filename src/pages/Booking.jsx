import React, { useState, useContext, useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoChevronDownOutline } from "react-icons/io5";
import { FaPlaneDeparture } from "react-icons/fa";
import { FaPlaneArrival } from "react-icons/fa6";
import { flight_assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from '../context/appContext';
import { useParams } from "react-router-dom";
import { axios_instance } from '../Helpers/axios_hook.js';
import { nationalities } from '../helpers/nationalities';
import { IoChevronForward } from "react-icons/io5";

import { decryptId, getHoursFromISO, calculateHourDifference, formatDateTime, htmlToPlainText } from '../helpers/comm';

const Booking = () => {
  const { traceId, filteredFlights, filteredReturnFlights, filteredMltiFlights, Commision, dropOffLocationType, adult, child, infant, setapi_error } = useContext(AppContext)

  const [person, setPerson] = useState([1]);
  const navigate = useNavigate();
  const { id, type } = useParams();
  const [loading, setLoading] = useState(true); // Track loading state

  const [isOpen, setIsOpen] = useState(false);
  const [fareBreakdown, setfareBreakdown] = useState([]);
  const [gSTAllowed, setgSTAllowed] = useState(false);
  const [isLLC, setisLLC] = useState(false);
  const [isPanRequiredAtBook, setsisPanRequiredAtBook] = useState(false);
  const [isPanRequiredAtTicket, setisPanRequiredAtTicket] = useState(false);
  const [isPassportFullDetailRequiredAtBook, setisPassportFullDetailRequiredAtBook] = useState(false);
  const [isPassportRequiredAtBook, setisPassportRequiredAtBook] = useState(false);
  const [isPassportRequiredAtTicket, setisPassportRequiredAtTicket] = useState(false);
  const [isRefundable, setisRefundable] = useState(false);
  const [segments, setsegments] = useState(null);
  const [fareRules, setFareRules] = useState(null);
  const [qoutes, setqoutes] = useState(null);
  const [_currency, set_currency] = useState(null);
  const [_PassengerCount, set_PassengerCount] = useState(0);
  const [tax, settax] = useState(0);
  const [grandTotal, setgrandTotal] = useState({});
  const [insurance, setinsurance] = useState(25);

  const [isGstVisible, setIsGstVisible] = useState(false);


  const handleAddPerson = () => {
    setPerson([...person, person.length + 1])
  }

  const handleDeletePerson = (index) => {
    const newPerson = person.filter((_, i) => i != index);
    setPerson(newPerson)
  }

  const getRules = async (itreation) => {
    await axios_instance.post('/flights/fare', {
      "traceId": traceId,
      "ResultIndex": filteredFlights[itreation].ResultIndex
    }).then((response) => {
      if (response.status === 200 && typeof (response.data) != "string") {
        setFareRules(htmlToPlainText(response.data.Response.FareRules[0].FareRuleDetail));
      } else {
        console.log(response);
      }
    }).finally(() => {
      console.log("here");
    });
  }

  const getQoutes = async (itreation) => {
    await axios_instance.post('/flights/getFareQoute', {
      "traceId": traceId,
      "ResultIndex": filteredFlights[itreation].ResultIndex
    }).then((response) => {
      if (response.status === 200 && typeof (response.data) != "string") {
        //console.log(response.data.Response.Results.FareBreakdown);
        const _baseFare = response.data.Response.Results.FareBreakdown[0].BaseFare;
        const _tax = response.data.Response.Results.FareBreakdown[0].Tax;
        const _passengerCount = response.data.Response.Results.FareBreakdown[0].PassengerCount;
        const _currency = response.data.Response.Results.FareBreakdown[0].Currency;
        const price = (_baseFare + Commision + _tax) / _passengerCount;
        setqoutes(price);
        set_currency(_currency);
        settax(_tax);
        set_PassengerCount(_passengerCount);
        setgrandTotal({ "price": price, "tax": _tax, "insurance": insurance, "convenienceFee": Commision });
      } else {
        console.log(response);
      }
    }).finally(() => {
      console.log("FareQoutes call Done");
    });
  }

  async function loadPolocy(paramsId) {
    if (fareRules === null) {
      await getRules(paramsId);
    }
    if (qoutes === null) {
      await getQoutes(paramsId);
    }
  }

  useEffect(() => {
    const paramsId = decryptId(id);
    // getting current itreation
    const Ids = paramsId;
    let result = null;
    if (dropOffLocationType === 1) {
      result = filteredFlights;
    } else if (dropOffLocationType === 2) {
      result = filteredReturnFlights;
    } else if (dropOffLocationType === 3) {
      result = filteredMltiFlights;
    }
    if (result != null) {
      result.map((item, index) => {
        if (index == Ids) {
          // console.log(item.GSTAllowed)
          const { FareBreakdown, Segments } = item
          setfareBreakdown(FareBreakdown)
          setgSTAllowed(item.GSTAllowed)
          setisLLC(item.IsLCC)
          setsisPanRequiredAtBook(item.IsPanRequiredAtBook)
          setisPanRequiredAtTicket(item.IsPanRequiredAtTicket)
          setisPassportFullDetailRequiredAtBook(item.IsPassportFullDetailRequiredAtBook)
          setisPassportRequiredAtBook(item.IsPassportRequiredAtBook)
          setisPassportRequiredAtTicket(item.IsPassportRequiredAtTicket)
          setisRefundable(item.IsRefundable)
          setsegments(Segments.flat())
          setLoading(false); // Stop loading
          //console.log(FareBreakdown)
        }
      });
    } else {
      navigate(`/`);
    }
    loadPolocy(Ids);

    const totalGuests = adult + child + infant
    console.log("totalGuests", totalGuests);
    setPerson([totalGuests]);
    console.log("person", person.length);

  }, [])

  // Function to get stored data
  const getInitialData = () => ({
    title: "",
    email: "",
    firstname: "",
    lastname: "",
    PaxType: "",
    DateOfBirth: "",
    Gender: "",
    passportNumber: "",
    passportExpiry: "",
    city: "",
    address1: "",
    address2: "",
    countryCode: "",
    countryName: "",
    nationality: "",
    contactNumber: "",
    leadPax: "",
    gst_companyName: "",
    gst_number: "",
    gst_email: "",
    gst_contact: "",
    gst_address: ""
  });
  const [formData, setFormData] = useState(getInitialData);
  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple requests
    setLoading(true); // Disable button & show loading effect
    const post_data = {};
    post_data.traceId = traceId;
    post_data.ResultIndex = filteredFlights[0].ResultIndex;
    post_data.PreferredCurrency = _currency;
    post_data.Price = Object.values(grandTotal).reduce((acc, curr) => acc + curr, 0);
    formData.Fare = {
      BaseFare: fareBreakdown[0].BaseFare,
      Tax: fareBreakdown[0].Tax,
      YQTax: fareBreakdown[0].YQTax,
      AdditionalTxnFeePub: fareBreakdown[0].AdditionalTxnFeePub,
      AdditionalTxnFeeOfrd: fareBreakdown[0].AdditionalTxnFeeOfrd
    };
    post_data.Passengers = [formData];
    try {
      await axios_instance.post('/flights/selected', post_data).then((response) => {
        if (response.status === 200) {
          if (typeof (response.data) === "string") {
            setapi_error(response.data);
          } else {
            const { id, data } = response.data;
            navigate(`/payment/${id}`);
          }
        }
      }).finally(() => {
        setLoading(false); // Disable button & show loading effect
      });
    } catch (error) {
      console.warn("Error :- ", error);
      setapi_error(error);
    }
    console.log("Form Data Submitted:", post_data);
  };
  // console.log("before the page load ", segments);

  // Show a loading message before data is ready
  if (loading) return <p>Loading...</p>;
  // Calculate total sum
  const finalTotal = Object.values(grandTotal).reduce((acc, curr) => acc + curr, 0);

  const renderForm = () => {
    // console.log("contries", contries);

    return (
      <>
        <form onSubmit={handleSubmit}>
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
                  name="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
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
                  name="firstname"
                  id="firstname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
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
                  name="lastname"
                  id="lastname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
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
                  onChange={handleChange}
                >
                  <option selected="">Choose</option>
                  <option value="1">Adult</option>
                  <option value="2">Child</option>
                  <option value="3">Infant</option>
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                >
                  <option selected="">Choose</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <div className="grid gap-4 mb-4 sm:grid-cols-[1fr_1fr_1fr]">
              {isLLC != null ? <> <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Passport Number
                </label>
                <input
                  type="text"
                  name="passportNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
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
                    name="passportExpiry"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={handleChange}
                  />
                </div></> : null}

              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  City
                </label>
                <select
                  id=""
                  name="city"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
                >
                  <option selected="">Choose</option>
                  <option value="New Delhi">New Delhi</option>
                  <option value="Bahadurgarh">Bahadurgarh</option>
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
                  name="address1"
                  placeholder="Address line 1"
                  className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
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
                  name="address2"
                  placeholder="Address line 2"
                  className="bg-gray-50 mt-1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
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
                  name="countryCode"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
                >
                  <option selected="">Choose</option>
                  {nationalities.map((ele, index) => (
                    <option key={index} value={ele.alpha_3_code}>{ele.alpha_3_code}</option>
                  ))}
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
                  name="countryName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
                >
                  <option selected="">Choose</option>
                  {nationalities.map((ele, index) => (
                    <option key={index} value={ele.en_short_name}>{ele.en_short_name}</option>
                  ))}
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
                  name="nationality"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
                >
                  <option selected="">Choose</option>
                  {nationalities.map((ele, index) => (
                    <option key={index} value={ele.nationality}>{ele.nationality}</option>
                  ))}
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
                  name="contactNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
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
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
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
                  name="leadPax"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
                >
                  <option selected="">Choose</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              {/* <div>
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
              </div> */}
            </div>
          </div>
          {isLLC ? null : <> <div>
            <h5 className="font-bold pt-5 mb-5">Baggage <hr /></h5>
            <div className="grid gap-4 mb-4 sm:grid-cols-[1fr_1fr_1fr_1fr]">
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Airline Code
                </label>
                <input
                  type="text"
                  name="airlineCode"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
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
                  name="flightNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
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
                  name="wayType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
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
                  name="code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
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
                  name="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
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
                  name="weight"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
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
                  name="currency"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
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
                  name="bagged_price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
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
                  name="bagged_origin"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
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
                  name="bagged_destination"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            </div>
          </div>

            <div>
              <h5 className="font-bold pt-5 mb-5">Meal Dynamic <hr /></h5>
              <div className="grid gap-4 mb-4 sm:grid-cols-[1fr_1fr_1fr_1fr]">
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Airline Code
                  </label>
                  <input
                    type="text"
                    name="meal_aitlineCode"
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
                    name="mail_flightNumber"
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
                    name="meal_wayType"
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
                    name="meal_code"
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
                    name="meal_description"
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
                    name="meal_airlineDescription"
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
                    name="meal_quantity"
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
                    name="meal_currency"
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
                    name="meal_price"
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
                    name="meal_origin"
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
                    name="meal_description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-bold pt-5 mb-5">Seat Dynamic <hr /></h5>
              <div className="grid gap-4 mb-4 sm:grid-cols-[1fr_1fr_1fr_1fr]">
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Airline Code
                  </label>
                  <input
                    type="text"
                    name="seat_aitlineCode"
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
                    name="seal_flightNumber"
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
                    name="seat_craftType"
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
                    name="seat_code"
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
                    name="seat_description"
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
                    name="seat_availablityType"
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
                    name="seat_rowNo"
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
                    name="seat_seatNo"
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
                    name="seat_seatType"
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
                    name="seat_seatWayType"
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
                    name="seat_compartment"
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
                    name="seat_deck"
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
                    name="seat_currency"
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
                    name="seat_price"
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
                    name="seat_origin"
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
                    name="seat_destination"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-bold pt-5 mb-5">Special Services (Optional)<hr /></h5>
              <div className="grid gap-4 mb-4 sm:grid-cols-[1fr_1fr_1fr_1fr]">
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Airline Code
                  </label>
                  <input
                    type="text"
                    name="ssr_aitlineCode"
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
                    name="ssr_flightNumber"
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
                    name="ssr_serviceType"
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
                    name="ssr_code"
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
                    name="ssr_departureTime"
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
                    name="ssr_wayType"
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
                    name="ssr_text"
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
                    name="ssr_currency"
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
                    name="ssr_price"
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
                    name="ssr_origin"
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
                    name="ssr_destination"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          </>}
          <div className="mt-[2rem]">
            <h5 className="font-bold flex justify-between py-2 px-2 mb-5 bg-gray-50 border border-gray-300 rounded-lg items-center" onClick={() => setIsGstVisible(!isGstVisible)}><span>GST</span> <span className={`${isGstVisible ? 'rotate-90' : ''}`}><IoChevronForward /></span></h5>
            <div className={` gap-4 mb-4 sm:grid-cols-4 transition-opacity duration-500 ease-in-out ${
              isGstVisible ? 'opacity-100 pointer-events-auto grid' : 'opacity-0 pointer-events-none hidden'
            }`}>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  GST Company Name
                </label>
                <input
                  type="text"
                  name="gst_companyName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
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
                  name="gst_number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
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
                  name="gst_email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
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
                  name="gst_contact"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
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
                  name="gst_address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  onChange={handleChange}
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
                      {segments ? <img
                        src={
                          `https://www.gstatic.com/flights/airline_logos/70px/${segments[0].Airline.AirlineCode}.png`
                        }
                        width={60}
                        height={60}
                        className="w-10"
                        alt={segments[0].Airline.AirlineName}
                        sizes="40px"
                      /> : <p>Loading...</p>}
                    </div>

                    {/* FOR MOBILE RESPONSIVE */}
                    <div className="block space-y-1 lg:hidden">
                      <div className="flex font-semibold">
                        <div>
                          <span>{getHoursFromISO(segments[0].Origin.DepTime)}</span>
                          <span className="mt-0.5 flex items-center text-sm font-normal text-neutral-500">
                            {segments[0].Origin.Airport.AirportCode}
                          </span>
                        </div>
                        <span className="flex w-12 justify-center">
                          <FaArrowRightLong className="h-5 w-5" />
                        </span>
                        <div>
                          <span>{getHoursFromISO(segments[0].Destination.ArrTime)}</span>
                          <span className="mt-0.5 flex items-center text-sm font-normal text-neutral-500">
                            {segments[0].Destination.Airport.AirportCode}
                          </span>
                        </div>
                      </div>

                      <div className="mt-0.5 text-sm font-normal text-neutral-500">
                        <span className="VG3hNb">{segments.length}</span>
                        <span className="mx-2">·</span>
                        <span>{calculateHourDifference(segments[0].Origin.DepTime, segments[0].Destination.ArrTime)}</span>
                        <span className="mx-2">·</span>
                        <span>{segments[0].Destination.Airport.AirportCode}</span>
                      </div>
                    </div>

                    <div className="hidden min-w-[150px] flex-[4] lg:block">
                      <div className="text-lg font-medium">{segments[0].Airline.AirlineName}</div>
                    </div>

                    {/* TIME */}
                    <div className="hidden flex-[4] whitespace-nowrap lg:block">
                      <div className="text-lg font-medium">{segments[0].Origin.Airport.AirportCode} {getHoursFromISO(segments[0].Origin.DepTime)} </div>
                      <div className="mt-0.5 text-sm font-normal text-neutral-500">
                        {formatDateTime(segments[0].Origin.DepTime)}
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
                      <div className="text-lg font-medium">{segments[0].Destination.Airport.AirportCode} {getHoursFromISO(segments[0].Destination.ArrTime)}</div>
                      <div className="mt-0.5 text-sm font-normal text-neutral-500">
                        {formatDateTime(segments[0].Destination.ArrTime)}
                      </div>
                    </div>

                    {/* PRICE */}
                    <div className="flex-[4] whitespace-nowrap sm:text-right">
                      <div className="text-left">
                        <div className="text-secondary-600 text-xl font-semibold">
                          {calculateHourDifference(segments[0].Origin.DepTime, segments[0].Destination.ArrTime)}
                        </div>
                      </div>
                      <div className="mt-0.5 text-xs font-normal text-left text-neutral-500 sm:text-sm">
                        {segments.length} stop
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
                      <h5 className="font-bold mb-3">Fare Rules</h5>
                      {fareRules ? <p>{fareRules}</p> : <p>Loading...</p>}
                    </div>
                    <div className="mt-3">
                      <h5 className="font-bold mb-3">Baggage Policy</h5>
                      <p>Check-in Baggage : {segments ? <p>{segments[0].Baggage}</p> : <p>Loading...</p>}</p>
                      <p>Cabin Baggage: {segments ? <p>{segments[0].CabinBaggage}</p> : <p>Loading...</p>}</p>
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
                  <form onSubmit={handleSubmit}>
                    {
                      person.map((_, index) => (
                        <div className="text-neutral-600 dark:text-neutral-300">
                          <h5 className="mb-3 bg-black text-white rounded p-2 flex justify-between"><span>Person {index + 1}</span> {person.length > 1 && (<TrashIcon onClick={() => handleDeletePerson(index)} className="h-5 w-5 mr-2 text-red-600 hover:text-red-500 duration-500 cursor-pointer" />)}</h5>
                          {renderForm()}
                          <br /><br />
                        </div>
                      ))
                    }
                    <button
                      disabled={loading}
                      type="submit"
                      className="bg-black px-4 py-2 rounded text-white float-right hover:bg-gray-800 duration-500 cursor-pointer"
                    >
                      {loading ? <>
                        <div role="status">
                          <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div></> : <>
                        Continue Booking
                      </>
                      }

                    </button>
                  </form>
                  {/* <div>
                    <button onClick={() => handleAddPerson()} className="bg-black px-4 py-2 rounded text-white float-right hover:bg-gray-800 duration-500 cursor-pointer">+ Add More People</button>
                  </div> */}
                </div>
              </div>
            </div>

            {/* Tavel Insurance */}
            {/* <div className="listingSection__wrap !space-y-6">
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
            </div> */}

            {/* <div>
              <button
                type="submit"
                className="bg-black px-4 py-2 rounded text-white float-right hover:bg-gray-800 duration-500 cursor-pointer"
              >
                Continue Booking
              </button>
            </div> */}
          </div>

          <div className="mt-14 flex-grow lg:mt-0 p-5 sm:p-0">
            <div className="sticky top-28 pb-10">
              <div className="listingSectionSidebar__wrap shadow-xl p-4 border-1 rounded w-full flex flex-col sm:rounded-2xl border-b sm:border-t sm:border-l sm:border-r border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 pb-10 sm:p-4 xl:p-8">
                <h2 className="text-2xl font-semibold sm:text-lg lg:text-2xl mb-3">
                  Travel Insurance
                </h2>
                <div>
                  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <tbody>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          class="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Adults ({_PassengerCount || "Loading..."} X  {qoutes || "Loading..."})
                        </th>
                        <td class="px-6 py-4 text-right"> {_currency || "Loading..."} {qoutes || "Loading..."}</td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          class="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Total Taxes
                        </th>
                        <td class="px-6 py-4 text-right">{_currency || "Loading..."} {tax || "Loading..."}</td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          class="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Insurance
                        </th>
                        <td class="px-6 py-4 text-right">{_currency || "Loading..."} {insurance || "Loading..."}</td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          class="px-6 ps-0 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Convenience fee
                        </th>
                        <td class="px-6 py-4 text-right">{_currency || "Loading..."} {Commision}</td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          class="px-6 ps-0 py-4 font-leading text-xl text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Grand Total:
                        </th>
                        <td class="px-6 py-4 text-right text-xl font-leading">
                          {_currency || "Loading..."} {finalTotal}
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
