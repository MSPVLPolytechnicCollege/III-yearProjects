import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";


function App() {
  

  return (
    <>
      <div>
        <Navbar />
        <Outlet />
        {/* <img src="/iphone.jpg" alt="" /> */}
      </div>  
    </>
  )
}

export default App
