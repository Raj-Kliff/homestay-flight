import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [dropOffLocationType, setDropOffLocationType] = useState(1)
  const [adult, setAdult] = useState(1);
  const [Commision, setCommision] = useState(100);
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);

  const [cabinClass, setcabinClass] = useState(1);
  const [start_date, setstart_date] = useState(new Date());
  const [end_date, setend_date] = useState(null);
  const [origin, setorigin] = useState("del");
  const [destination, setdestination] = useState("bom");
  const [flightResults, setFlightResults] = useState(null);
  const [fareRules, setFareRules] = useState({});
  const [fareQoute, setFareQoute] = useState({});
  const [traceId, settraceId] = useState(null);
  const [api_error, setapi_error] = useState(null);
  //this filter settings
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [filteredReturnFlights, setfilteredReturnFlights] = useState([]);
  const [filteredMltiFlights, setfilteredMultiFlights] = useState([]);
  const [filters, setFilters] = useState({
    airline: "",
    stops: "",
    tripTime: "",
    roundTrip: false,
  });

  const getFareRules = (key) => {
    if (fareRules.hasOwnProperty(key)) {
      return fareRules[key];
    }
  }

  const getFareQoute = (key) => {
    if (fareQoute.hasOwnProperty(key)) {
      return fareQoute[key];
    }
  }

  // const applyFilters = (newFilters) => {
  //   setFilters(newFilters);
  //   let filtered = flightResults;

  //   if (newFilters.airline) {
  //     filtered = filtered.filter(flight => flight.Segments[0][0].Airline.AirlineName === newFilters.airline);
  //   }
  //   if (newFilters.stops !== "") {
  //     filtered = filtered.filter(flight => flight.Segments[0].length === parseInt(newFilters.stops));
  //   }
  //   if (newFilters.tripTime) {
  //     filtered = filtered.filter(flight => flight.tripTime <= parseInt(newFilters.tripTime));
  //   }
  //   if (newFilters.roundTrip) {
  //     filtered = filtered.filter(flight => flight.roundTrip === true);
  //   }

  //   setFilteredFlights(filtered);
  // };
  const applyFilters = (newFilters, flights, setFilteredFlights) => {
    let filtered = flights;

    if (newFilters.airline) {
      filtered = filtered.filter(flight => flight.Segments[0][0].Airline.AirlineName === newFilters.airline);
    }
    if (newFilters.stops !== "") {
      filtered = filtered.filter(flight => flight.Segments[0].length === parseInt(newFilters.stops));
    }
    if (newFilters.tripTime) {
      filtered = filtered.filter(flight => flight.tripTime <= parseInt(newFilters.tripTime));
    }
    if (newFilters.roundTrip) {
      filtered = filtered.filter(flight => flight.roundTrip === true);
    }

    setFilteredFlights(filtered);
  };

  const state = {
    dropOffLocationType, setDropOffLocationType, adult, setAdult, cabinClass, setcabinClass,
    start_date, setstart_date, origin, setorigin, destination, setdestination, child, setChild, infant, setInfant, flightResults, setFlightResults,
    filteredFlights, applyFilters, filters, setFilteredFlights, getFareRules, getFareQoute, fareRules, fareQoute, setFareRules, setFareQoute, settraceId, traceId,
    Commision, filteredReturnFlights, setfilteredReturnFlights, filteredMltiFlights, setfilteredMultiFlights, api_error, setapi_error, end_date, setend_date
  };


  return (
    <AppContext.Provider value={state}>
      {props.children}
    </AppContext.Provider>);
};

export default AppContextProvider