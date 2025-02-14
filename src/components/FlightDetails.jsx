import React, { useState, useContext } from "react";
import { getHoursFromISO, capitalizeFirstLetter, calculateHourDifference } from '../helpers/comm';
import { getCabinClassName } from '../Helpers/FlightCabins'
import { AppContext } from '../context/appContext';

const FlightDetails = (props) => {
  const { filteredFlights } = useContext(AppContext)
  const { Airline, Origin, Destination, CabinClass, Craft } = props.params;
  let last_airport_name = '';
  let last_airport_code = '';
  const flights = filteredFlights[props.res_index].Segments[0];

  let stops = [];
  if (props.local_index <= 1) {
    flights.map((ele, index) => {
      if (index > 0) {
        stops[ele.Origin.Airport.AirportCode] = calculateHourDifference(flights[index - 1].Destination.ArrTime, ele.Origin.DepTime);
      }
    });
    //console.log(stops);
    last_airport_name = Origin.Airport.AirportName;
    last_airport_code = Origin.Airport.AirportCode;
  }
  return (
    <>
      {props.local_index === 1 ? (
        <div className="my-7 space-y-5 md:my-10 md:pl-24">
          <div className="border-t border-neutral-200 dark:border-neutral-700" />
          <div className="text-sm text-neutral-700 dark:text-neutral-300 md:text-base">
            Transit time: {stops[last_airport_code] ?? null} - {last_airport_name} ({last_airport_code})
          </div>
          <div className="border-t border-neutral-200 dark:border-neutral-700" />
        </div>
      ) : null}
      <div className="render-detail-top" key={props.res_index + 1}>
        <div className="flex flex-col md:flex-row">
          <div className="w-24 flex-shrink-0 md:w-20 md:pt-7 lg:w-24">
            {Airline ? <img
              src={
                `https://www.gstatic.com/flights/airline_logos/70px/${Airline?.AirlineCode}.png`
              }
              width={60}
              height={60}
              className="w-10"
              alt="air-logo"
              sizes="40px"
            /> : <p>Loading...</p>}
            {/* {Airline?.AirlineName} */}
          </div>
          <div className="my-5 flex md:my-0">
            <div className="flex flex-shrink-0 flex-col items-center py-2">
              <span className="block h-6 w-6 rounded-full border border-neutral-400"></span>
              <span className="my-1 block flex-grow border-l border-dashed border-neutral-400"></span>
              <span className="block h-6 w-6 rounded-full border border-neutral-400"></span>
            </div>
            <div className="ml-4 space-y-10 text-sm">
              <div className="flex flex-col space-y-1">
                <span className="text-neutral-500 dark:text-neutral-400">
                  {getHoursFromISO(Origin?.DepTime)}
                </span>
                <span className="font-semibold">
                  {Origin.Airport.AirportName} ({Origin?.Airport?.AirportCode})
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-neutral-500 dark:text-neutral-400">
                  {getHoursFromISO(Destination?.ArrTime)}
                </span>
                <span className="font-semibold">
                  {Destination?.Airport?.AirportName} ({Destination?.Airport?.AirportCode})
                </span>
              </div>
            </div>
          </div>
          <div className="border-l border-neutral-200 dark:border-neutral-700 md:mx-6 lg:mx-10"></div>
          <ul className="space-y-1 text-sm text-neutral-500 dark:text-neutral-400 md:space-y-2">
            <li>Trip Time: {calculateHourDifference(Origin?.DepTime, Destination?.ArrTime)}</li>
            <li>AirlineCode:- {Airline?.AirlineCode} · Cabin Class:- {getCabinClassName(CabinClass)} · Craft:- {Craft} · Flight Number:- {Airline?.FlightNumber}</li>
          </ul>
        </div>
      </div>

    </>
  );
};

export default FlightDetails;