import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Loader } from '../components/helpers';

export const Create = () => {
  
  const [loader, setLoader] = useState(false);
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [req, setReq] = useState("");
  const [requirements, setRequirements] = useState([]);

  const BASE_URL="https://codsoft-jobify-api.vercel.app"

  const handleRequirementChange = (e) => {
    const textareaValue = e.target.value;
    setReq(textareaValue);

    const requirementsArray = textareaValue.split('\n').filter(Boolean);
    setRequirements(requirementsArray);
  }

  const createJob = async (e) => {
    e.preventDefault();
    try{
      setLoader(true);
      const {data} = await axios.post(`${BASE_URL}/api/v1/job/create`, {
        title, desc, requirements
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if(data.success){
        toast.success(data.message);
        setTitle("");
        setDesc("");
        setReq("");
        setRequirements([]);
      }else{
        toast.error(data.message);
      }

    }catch(error){
      console.log(error)
      toast.error("Something went wrong");
    }finally{
      setLoader(false);
    }
  }

  return (
    <>
    <h2 className='md:text-5xl text-3xl max-md:text-center font-bold'>List a Job</h2>

    <form onSubmit={createJob} className='p-4 mt-4 flex flex-col gap-4 max-w-[500px] w-full'>

      <input type="text" placeholder='Job Title' name='title' required autoComplete='off' 
      className='sm:min-w-[600px] w-full border-neutral-400 border py-2 px-3 rounded-md outline-none text-lg'
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      />

      <textarea placeholder='Job Description' name='description' required autoComplete='off'
      rows={6} 
      className='sm:min-w-[600px] w-full border-neutral-400 border py-2 px-3 rounded-md outline-none resize-none text-neutral-700'
      value={desc}
      onChange={(e) => setDesc(e.target.value)}
      ></textarea>

      
      <textarea placeholder='Job Requirements' name='requirements' required autoComplete='off'
      rows={6} 
      className='sm:min-w-[600px] w-full border-neutral-400 border py-2 px-3 rounded-md outline-none resize-none text-neutral-700'
      value={req}
      onChange={handleRequirementChange}
      ></textarea>

      <button disabled={loader} className='md:max-w-[200px] w-full md:text-lg bg-primary text-bg rounded-md py-2 cursor-pointer' type='submit'>
        {loader ? <Loader dark={false}/>: "List Job"}
      </button>

    </form>
    </>
  )
}
