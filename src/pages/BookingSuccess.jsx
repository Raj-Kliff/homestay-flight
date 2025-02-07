import React from "react";
import FlightAnimation from "../components/FlightAnimation";

const BookingSuccess = () => {
  return (
    <section className="bg-[#f9f9f9] h-[100vh] sm:pt-[10rem]">
      <div className="container mx-auto">
        <div className="flex flex-col justify-center items-center ">
          <FlightAnimation />
          <div className="sm:max-w-2/3 mx-auto text-center p-5 sm:p-0">
            <h1 className="sm:text-4xl sm:font-black">
              Payment Successful ! Get Ready To Fly
            </h1>
            <p className="mt-5 text-xl">
              Thank you for you payment. We have received your payment
              successfully. your transaction ID is "SHJG12155215", you will get
              an email invoice soon!
            </p>
            <div className="flex justify-center mt-10">
              <button
                type="submit"
                className="bg-black px-4 py-2 rounded text-white float-right hover:bg-gray-800 duration-500 cursor-pointer"
              >
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSuccess;
