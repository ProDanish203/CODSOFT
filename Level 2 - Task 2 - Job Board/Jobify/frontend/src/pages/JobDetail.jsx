import React, { useEffect, useState, Fragment } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Footer, Navbar } from '../components/shared';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MainLoader } from '../components/helpers';

export const JobDetail = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const [job, setJob] = useState();
    const [loader, setLoader] = useState(false);

    const id = searchParams.get("id");
    const BASE_URL="http://localhost:5000";

    const getData = async () => {
        try{
            setLoader(true)
            const {data} = await axios.get(`${BASE_URL}/api/v1/job/${id}`) 
            if(data.success){
                setJob(data.job)
            }else{
                toast.error("Something went wrong");
            }
        }catch(error){
            console.log(error);
            toast.error("Something went wrong");
        }finally{
            setLoader(false);
        }
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <>
    <Navbar/>

    <section className='md:px-20 sm:px-5 px-2 md:pt-20 pt-10 max-w-[1000px] w-full mx-auto'>
    {loader ? 
        <MainLoader/>
    : (
    <>
        <h2 className='md:text-5xl text-3xl font-extrabold'>{job?.title}</h2>
        <div className='mt-3 flex max-sm:flex-col max-sm:gap-1 sm:items-center justify-between max-w-[500px] w-full'>
            <p className='text-neutral-600 max-sm:text-sm'>Posted By: <span className='text-primary font-semibold'>{job?.author.name}</span></p>
            <p className='text-neutral-600 max-sm:text-sm'>Posted On: <span className='text-primary font-semibold'>{job?.createdAt.substring(0, 10)}</span></p>
        </div>

        <div className='md:mt-10 mt-4'>
            <h2 className='md:text-2xl text-xl font-extrabold'>Description</h2>
            <p className='max-w-4xl md:my-4 my-2 text-neutral-800'>
            {job?.desc && job.desc.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                {line}
                <br />
                </React.Fragment>
            ))}
            </p>

            <h2 className='md:text-2xl text-xl font-extrabold mt-2'>Requirements</h2>
            {job?.requirements.map((req, idx) => (
            <p className='arrow-hover max-sm:text-sm max-w-4xl my-2 text-neutral-800 flex items-center justify-start gap-2' key={idx}>
                <i className='fas fa-arrow-right'></i>
                {req}
            </p>
            ))}

        </div>

        <button className='mt-5 bg-accent text-bg rounded-md max-sm:w-full px-5 py-2 cursor-pointer'>
            Apply
        </button>
    </>
    )}
        
    </section>

    <Footer/>
    </>
  )
}
