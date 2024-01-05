import React from 'react'
import { Footer, Navbar } from '../components/shared'

export const Home = () => {
  return (
  <>
  <Navbar/>

  <main className='md:px-20 sm:px-5 px-2'>
    <section className='py-20'>
      Home
    </section>
  </main>  

  <Footer/>
  </>
  )
}
