import './App.css';
import { Footer, Navbar } from './components/shared';
import { Router } from "./config/Router";
import { Toaster } from 'react-hot-toast';

function App() {
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
