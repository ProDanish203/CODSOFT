import React, { useEffect, useState } from 'react'
import { JobCard } from "../cards";
import { MainLoader } from "../helpers";
import axios from 'axios';

export const FeaturedJobs = () => {

  const [jobs, setJobs] = useState([]);
  const [loader, setLoader] = useState(false);

  const BASE_URL="https://codsoft-jobify-api.vercel.app";
  const getJobs = async () => {
    try{
      setLoader(true);

      const {data} = await axios.get(`${BASE_URL}/api/v1/job/allJobs`);
      
      if(data.success){
        setJobs(data.jobs);
      }
    }catch(error){
      console.log(error);
    }finally{
      setLoader(false);
    }
  }

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className='md:px-20 sm:px-5 px-2 md:py-20 py-10' id="featured">

        <h2 className='md:text-5xl text-3xl font-extrabold text-center'>Featured Jobs</h2>

        {loader ? (
          <MainLoader/>
        ) : (

        <div className='mt-10 flex flex-wrap gap-10 justify-center items-center'>
        {jobs && jobs.length > 0 && 
        jobs.map((item) => (
          <JobCard data={item} key={item._id}/>
          ))
        }
        </div>
        )}

    </section>
  )
}
