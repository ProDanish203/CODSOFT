import React from 'react'
import { Link } from "react-router-dom";

const Card = () => {
    return (
    <>
    <div className='bg-bg rounded-md shadow-md p-4 max-w-[350px]'
    >
      <div className='relative w-full'>
      </div>

      <div className='mb-2'>
        <h2 className='text-para text-3xl font-extrabold'>Job Title</h2>
        <p className='text-sm text-neutral-600 mt-1'>Listed by: xyz</p>
        <p className='text-neutral-800 mt-2 max-md:text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, voluptatum doloribus nulla cupiditate a delectus vel voluptas ratione cum non!</p>
      </div>

      <div className='mt-4 block'>
        <Link to="/" target="_blank" className='bg-accent md:text-lg font-bold block text-center w-full text-white py-2 rounded-md mt-2'>
          View Deatils
        </Link>
      </div>
    </div>
    </>
    )
}

export const FeaturedJobs = () => {
  return (
    <section className='md:px-20 sm:px-5 px-2 md:py-20 py-10'>

        <h2 className='md:text-5xl text-3xl font-extrabold text-center'>Featured Jobs</h2>

        <div className='mt-10 flex flex-wrap gap-10 justify-center items-center'>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>

    </section>
  )
}
