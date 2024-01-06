import { useState } from 'react'
import { Footer, Navbar } from '../components/shared'
import toast from 'react-hot-toast';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from "../components/helpers";

export const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const BASE_URL = "http://localhost:5000";

  const handleLogin = async (e) => {
    e.preventDefault();
    if(!username) return toast.error("Username is required");
    if(!password) return toast.error("Password is required");
    try{
      setLoader(true);
      const {data} = await axios.post(`${BASE_URL}/api/v1/auth/login`, {
        username, password
      });

      if(data.success){
        toast.success(data.message); 
        localStorage.setItem("token", data.token);
        navigate("/");
      }else{
        toast.error("Something went wrong");
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

  <main className='h-[80vh] flex items-center justify-center gap-2 flex-col'>

    <h3 className='md:text-5xl text-3xl font-extrabold'>Login</h3>

    <form onSubmit={handleLogin} className='p-3 rounded-md shadow-lg flex flex-col gap-3 max-w-[400px] w-full mx-auto'>
      
      <div className='flex flex-col gap-1'>
        <label htmlFor="username">Username:</label>
        <input type="text" name='username' placeholder='Username' required autoComplete='off' id='username' value={username} onChange={(e) => setUsername(e.target.value)} 
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

      <div>
        <button type='submit' disabled={loader}
        className='w-full my-3 bg-primary text-bg rounded-md py-2 md:text-lg cursor-pointer'
        >
          {loader ? <Loader dark={false}/> : "Login"}
        </button>
      </div>

      <p>Don't have an account? <Link to="/register" className='text-primary'>Register Now</Link></p>

    </form>
  </main>  

  <Footer/>
  </>
  )
}
