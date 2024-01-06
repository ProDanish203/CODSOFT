import React, {useState, useEffect} from 'react'
import { Footer, Navbar } from '../components/shared'
import { JobCard } from "../components/cards";
import { MainLoader } from "../components/helpers";
import axios from "axios"

export const Job = () => {
  
  const [jobs, setJobs] = useState([]);
  const [loader, setLoader] = useState(false);

  const BASE_URL="http://localhost:5000";
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
  
  // const changeID = () => {
  //     setSearchParams({id: 19})
  // }

  return (
  <>
  <Navbar isauth={false}/>

  <main>
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
  </main>  

  <Footer/>
  </>
  )
}
