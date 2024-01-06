import React from 'react'
import { Footer, Navbar } from '../components/shared'
import { Link, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { Profile, Create, ReviewApplications, Applications } from './'
import { useSelector } from 'react-redux'

export const Dashboard = () => {

  const {user} = useSelector(state => state.auth)
  if(!user) return <Navigate to='/login'/>
  return (
  <>
  <Navbar isAuth={false}/>
  
  <main className='flex'>

    <aside className='pt-11 md:px-4 px-2 md:max-w-72 w-full max-w-14 bg-primary h-screen flex flex-col gap-5'>
      
      <Link to="profile" className='text-bg text-xl flex items-center max-md:justify-center gap-2'>
        <i className='fas fa-user'></i>
        <span className='max-md:hidden'>Profile</span>
      </Link>
      
      {user.role === "candidate" ? (
      <>
      <Link to="applications" className='text-bg text-xl flex items-center max-md:justify-center gap-2'>
        <i className='fas fa-envelope'></i>
        <span className='max-md:hidden'>Applications</span>
      </Link>
      </>
      ) : (
      <>
      <Link to="review" className='text-bg text-xl flex items-center max-md:justify-center gap-2'>
        <i className='fas fa-envelope'></i>
        <span className='max-md:hidden'>Review Applications</span>
      </Link>

      <Link to="create" className='text-bg text-xl flex items-center max-md:justify-center gap-2'>
        <i className='fas fa-plus'></i>
        <span className='max-md:hidden'>List a Job</span>
      </Link>
      </>
      )}

    </aside>
    <Outlet/>
    
    <section className='px-2 py-3'>
      <Routes>
        <Route path='/' element={<Profile/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/review' element={<ReviewApplications/>}/>
        <Route path='/applications' element={<Applications/>}/>
      </Routes>
    </section>

  </main>


  <Footer/>
  </>
  )
}
