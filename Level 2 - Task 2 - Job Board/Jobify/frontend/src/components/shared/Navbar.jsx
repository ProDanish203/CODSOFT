import { useState } from 'react'
import { Link } from "react-router-dom";

export const Navbar = ({isAuth}) => {
    const [menu, setMenu] = useState(false);

  return (
    <header className='bg-primary flex items-center justify-between gap-2 py-5 shadow-lg md:px-20 sm:px-5 px-2 relative'>

        <Link to="/" className='text-bg flex items-center justify-center gap-2 text-2xl font-extrabold cursor-pointer'
        data-aos="fade-right" data-aos-duration="1000"
        >
            <h1>Jobify</h1>
            <i className='fas fa-magnifying-glass'></i>
        </Link>

        <nav className='max-sm:hidden flex items-center justify-center gap-3 text-lg text-bg'>
            {!isAuth && (
                <>
                <Link to="/" data-aos="fade-left" data-aos-duration="1000">Home</Link>
                <Link to="/browse" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">Jobs</Link>
                <Link to="/dashboard" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="400">Dashboard</Link>    
                </>
            )}
            
        </nav>

        {!isAuth && (
        <>
            <div className='text-bg cursor-pointer pr-2 sm:hidden' 
            onClick={() => setMenu(prev => !prev)}
            >
            <i className={`fas ${menu ? "fa-times" : "fa-bars"} text-2xl `}></i>
        </div>
        {menu && (
            <nav className='z-50 sm:hidden  absolute right-1 flex flex-col gap-2 p-5 min-w-[200px] min-h-[150px] top-[80px] bg-white shadow-lg rounded-md'
            data-aos="fade-left" data-aos-duration="6000"
            >
            <Link to="/">Home</Link>
            <Link to="/browse">Jobs</Link>
            <Link to="/dashboard">Dashboard</Link>
            </nav>
            )}
        </>
        )}



    </header>
  )
}
