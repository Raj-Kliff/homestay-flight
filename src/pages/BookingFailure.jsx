import React from 'react'
import { flight_assets } from '../assets/assets'

const BookingFailure = () => {
  return (
    <section className="bg-[#f9f9f9] h-[100vh] sm:pt-[10rem] flex items-center sm:items-start justify-center">
      <div className="container mx-auto">
        <div className="flex flex-col justify-center items-center ">
          <div>
            <img src={flight_assets.flightFailure} />
          </div>
          <br/><br/>
          <div className="sm:max-w-2/3 mx-auto text-center p-5 sm:p-0">
            <h1 className="sm:text-4xl sm:font-black">
            Oops ! We Are Unable To Process Your Payment
            </h1>
            <p className="mt-5 text-xl">
            Looks like we encountered an error. please try again. if you continue to have issue, try another payment method.
            </p>
            <div className="flex justify-center mt-10">
              <button
                type="submit"
                className="bg-black px-8 py-2 rounded text-white float-right hover:bg-gray-800 duration-500 cursor-pointer"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookingFailure
