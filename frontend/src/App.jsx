import './App.css'
import { Outlet } from "react-router-dom"
import Header from './Components/Header'
import Footer from './Components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './Common';
import Context from './Context';
import { useDispatch } from "react-redux"
import { setUserDetails } from './ReduxToolkit/Features/UserSlice';

function App() {

  const [cartProductCount,setCartProductCount]=useState(0)

  const dispatch = useDispatch()

  const fetchUserDetails = async () => {
    const dataResp = await fetch(SummaryApi.currentUser.url, {
      method: SummaryApi.currentUser.method,
      credentials: "include",
    })

    const dataApi = await dataResp.json()
    console.log("userData", dataApi)

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data))
    }
  }
  
  const fetchUserAddToCart=async()=>{
    const dataResp = await fetch(SummaryApi.cartProductCount.url, {
      method: SummaryApi.cartProductCount.method,
      credentials: "include",
    })

    const dataApi = await dataResp.json()
   console.log("dataApi",dataApi)
   setCartProductCount(dataApi?.data?.count)
  }

  useEffect(() => {
    // user details
    fetchUserDetails()
    fetchUserAddToCart()
  }, [])

  return (
    <>
      <Context.Provider value={{ fetchUserDetails,cartProductCount,fetchUserAddToCart }}>
        <ToastContainer position="bottom-right"/>
        <Header></Header>
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet></Outlet>
        </main>
        <Footer></Footer>
      </Context.Provider>
    </>
  )
}

export default App
