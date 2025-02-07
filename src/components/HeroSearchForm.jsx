import React, { useState } from 'react'
import LocationInput from './LocationInput'
import FlightDateRangeInput from './FlightDateRangeInput'

const HeroSearchForm = () => {

      const renderForm = () =>{
        return (
            <form className="relative mt-8 w-full p-[2rem] rounded-[40px] rounded-t-2xl bg-white shadow-xl dark:bg-neutral-800 dark:shadow-2xl xl:rounded-[49px] xl:rounded-t-3xl">
            <div className="nc-hero-field-padding flex flex-row flex-wrap border-b border-neutral-100 py-5 dark:border-neutral-700">
                <div className="my-1 me-2 flex cursor-pointer items-center rounded-full px-4 py-1.5 text-xs font-medium sm:me-3 bg-black text-white shadow-lg shadow-black/10">
                Round-trip
                </div>
                <div className="my-1 me-2 flex cursor-pointer items-center rounded-full px-4 py-1.5 text-xs font-medium sm:me-3 border border-neutral-300 dark:border-neutral-700">
                One-way
                </div>
                <div className="my-1 me-2 h-8 self-center border-r border-slate-200 dark:border-slate-700 sm:me-3"></div>
                <div className="my-1 me-2 rounded-full border border-neutral-300 dark:border-neutral-700 sm:me-3">
                <div className="relative" data-headlessui-state="">
                    <button className="inline-flex items-center rounded-md px-4 py-1.5 text-xs font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" type="button" aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:r56:">
                    <span>Economy</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="text-opacity-70 ms-2 h-4 w-4 group-hover:text-opacity-80">
                        <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd"></path>
                    </svg>
                    </button>
                </div>
                </div>
            </div>

            {/* <div className="my-1 rounded-full border border-neutral-300 dark:border-neutral-700">
                <div className="relative" data-headlessui-state="">
                <button className="inline-flex items-center rounded-md px-4 py-1.5 text-xs font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" type="button" aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:r5a:">
                    <span>4 Guests</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="text-opacity-70 ms-2 h-4 w-4 group-hover:text-opacity-80">
                    <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd"></path>
                    </svg>
                </button>
                </div>
            </div> */}

            <div className="flex flex-1 rounded-full">
                <LocationInput
                    placeHolder="Flying from"
						desc="Where do you want to fly from?"
						className="flex-1"
                />

                <div className="h-8 self-center border-r border-slate-200 dark:border-slate-700"></div>

                <div className="relative flex flex-1">
                <LocationInput
                    placeHolder="Flying from"
						desc="Where do you want to fly from?"
						className="flex-1"
                />
                </div>

                <div className="h-8 self-center border-r border-slate-200 dark:border-slate-700"></div>

                <div className="relative flex flex-1">
                <FlightDateRangeInput/>
                </div>

                <a type="button" className="flex h-14 w-full items-center justify-center rounded-full bg-purple-500 text-white hover:bg-purple-600 focus:outline-none md:h-16 md:w-16" href="/listing-car-detail">
                        <span className="me-3 md:hidden">Search</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none" className="h-6 w-6">
                        <path d="M17.5 17.5L22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path>
                        </svg>
                </a>

            </div>
            </form>

        )
      }

  return (
    <div
      className={`nc-HeroSearchForm w-full max-w-6xl py-5 lg:py-0`}
    >
      {renderForm()}
    </div>
  )
}

export default HeroSearchForm
