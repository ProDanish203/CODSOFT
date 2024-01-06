import React from 'react'
import { Banner, FeaturedJobs, Footer, Navbar } from '../components/shared'

export const Home = () => {
  return (
  <>
  <Navbar isauth={false}/>

  <main>
    <Banner/>
    <FeaturedJobs/>
  </main>  

  <Footer/>
  </>
  )
}
