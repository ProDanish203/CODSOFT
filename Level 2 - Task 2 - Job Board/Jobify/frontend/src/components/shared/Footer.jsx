import { Link } from "react-router-dom"

export const Footer = () => {
  return (
    <footer className='px-2 pt-10 pb-2 mt-10'>
      <p className='text-center'>
        Jobify &copy; | All Rights Reserved 2024 | Made with <span className="text-primary font-semibold">❤</span> by 
        <Link to='https://danish-siddiqui.vercel.app' target="_blank" className="text-primary font-semibold"> Danish Siddiqui</Link>
      </p>
    </footer>
  )
}
