import { useEffect } from 'react';
import './App.css';
import { Router } from "./config/Router";
import { Toaster } from 'react-hot-toast';
import AOS from "aos";
import 'aos/dist/aos.css';

function App() {

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, [])

  return (
  <>
  <Toaster
  position="top-center"
  reverseOrder={false}
  />
  
  <Router/>  
  
  </>
  );
}

export default App;
