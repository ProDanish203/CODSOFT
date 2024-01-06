import React from 'react'
import { jobSearch } from "../../assets";

export const Banner = () => {
  return (
  <section className='relative'>
    <div className='row md:px-20 sm:px-5 px-2 md:py-20 py-10 h-full w-full'>

      <div className='col-1'>
        <h2 className='head-text md:text-6xl text-3xl font-extrabold text-text leading-10'>Empowering Careers, Connecting Futures: Jobify - Your Premier Job Search Platform for Employers and Candidates Alike!</h2>

        <button className='bg-primary text-bg py-2 px-5 rounded-md mt-6 md:text-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-105 md:max-w-[250px] md:w-full'>
          <span>Browse </span>
          <i className='fas fa-magnifying-glass'></i>
        </button>
      </div>

      <div className='col-2 flex items-center justify-center'>
        <img src={jobSearch} alt="job-search" 
        className='md:max-w-[500px]'
        />
      </div>

    </div>
  </section>
  )
}
