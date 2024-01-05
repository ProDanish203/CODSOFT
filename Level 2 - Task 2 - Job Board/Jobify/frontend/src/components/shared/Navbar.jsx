import React, { useState } from 'react'
import { Link } from "react-router-dom";

export const Navbar = () => {

    const [menu, setMenu] = useState(false);

  return (
    <header className='flex items-center justify-between gap-2 py-5 shadow-lg md:px-20 sm:px-5 px-2 relative'>

        <Link to="/" className='flex items-center justify-center gap-2 text-2xl font-extrabold cursor-pointer'>
            <h1>Jobify</h1>
            <i className='fas fa-magnifying-glass'></i>
        </Link>

        <nav className='max-sm:hidden flex items-center justify-center gap-3 text-lg'>
            <Link to="/">Home</Link>
            <Link to="/browse">Jobs</Link>
            <Link to="/dashboard">Dashboard</Link>
        </nav>

        <div className='cursor-pointer pr-2 sm:hidden' 
        onClick={() => setMenu(prev => !prev)}
        >
            <i className={`fas ${menu ? "fa-times" : "fa-bars"} text-2xl `}></i>
        </div>

        <nav className='absolute'>

        </nav>



    </header>
  )
}
