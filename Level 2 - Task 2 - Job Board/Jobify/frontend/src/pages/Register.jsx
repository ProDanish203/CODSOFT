import React, { useState } from 'react'
import { Footer, Navbar } from '../components/shared'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../components/helpers";

export const Register = () => {

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const BASE_URL = "https://codsoft-jobify-api.vercel.app";

  const handleRegister = async (e) => {
    e.preventDefault();
    if(!username) return toast.error("Username is required");
    if(username.includes(" ")) return toast.error("Username must not contain any white spaces");
    if(!name) return toast.error("Name is required");
    if(!email) return toast.error("Email is required");
    if(!password) return toast.error("Password is required");
    if(password.includes(" ")) return toast.error("Password must not contain any white spaces");
    if(password.length <= 6) return toast.error("Password must be greater than 6 characters")
    if(!role) return toast.error("Please select your role");

    try{
      setLoader(true);

      const {data} = await axios.post(`${BASE_URL}/api/v1/auth/register`, {
        username, password, email, name, role
      });

      if(data.success){
        toast.success(data.message); 
        navigate("/login");
      }else{
        console.log(data.message)
        toast.error(data.message);
      }

    }catch(error){
      toast.error(error.response.data.message);
    }finally{
      setLoader(false);
    }
  }

  return (
  <>
  <Navbar isAuth={true}/>

  <main className='h-[85vh] flex items-center my-5 justify-center gap-2 flex-col'>

    <h3 className='md:text-5xl text-3xl font-extrabold'>Register</h3>

    <form onSubmit={handleRegister} className='p-3 rounded-md shadow-lg flex flex-col gap-3 max-w-[400px] w-full mx-auto'>
      
      <div className='flex flex-col gap-1'>
        <label htmlFor="username">Username:</label>
        <input type="text" placeholder='Username' required autoComplete='off' id='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)} 
        className='border p-2 border-neutral-500 focus:border-primary rounded-md outline-none'
        />
      </div>

      <div className='flex flex-col gap-1'>
        <label htmlFor="name">Name:</label>
        <input type="text" placeholder='Full Name' required autoComplete='off' id='name' name='name' value={name} onChange={(e) => setName(e.target.value)} 
        className='border p-2 border-neutral-500 focus:border-primary rounded-md outline-none'
        />
      </div>

      <div className='flex flex-col gap-1'>
        <label htmlFor="email">Email Address:</label>
        <input type="email" placeholder='Email Address' required autoComplete='off' name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} 
        className='border p-2 border-neutral-500 focus:border-primary rounded-md outline-none'
        />
      </div>

      <div className='flex flex-col gap-1'>
        <label htmlFor="password">Password:</label>
        <div className='border p-2 border-neutral-500 focus:border-primary rounded-md relative'>

          <input type={showPass ? "text": "password"} placeholder='Password' required name='password' autoComplete='off' id='password' value={password} onChange={(e) => setPassword(e.target.value)} 
          className='bg-transparent outline-none'
          />
          <i className={`fas ${showPass ? "fa-eye-slash": "fa-eye"} cursor-pointer absolute top-[30%] right-3 text-lg hover:text-primary`}
          onClick={() => setShowPass(prev => !prev)}
          ></i>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <p>Select Your Role: </p>
        <input type="radio" id="employer" required autoComplete='off' name='role' value="employer"  
        className=''
        onChange={(e) => setRole(e.target.value)}
        />
        <label htmlFor="employer">Employer</label>

        <input type="radio" id="candidate" required autoComplete='off' name='role' value="candidate"  
        className=''
        onChange={(e) => setRole(e.target.value)}
        />
        <label htmlFor="candidate">Candidate</label>
        
      </div>

      <div>
        <button type='submit' disabled={loader}
        className='w-full my-3 bg-primary text-bg rounded-md py-2 md:text-lg cursor-pointer'
        >
          {loader ? <Loader dark={false}/> : "Register"}
        </button>
      </div>

      <p>Already have an account? <Link to="/login" className='text-primary'>Login</Link></p>

    </form>
  </main>  

  <Footer/>
  </>
  )
}
