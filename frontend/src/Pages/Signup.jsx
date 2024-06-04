import React, { useState } from 'react'
import loginIcon from "../assets/camera.gif"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"
import ImagetoBase64 from '../Helpers/ImagetoBase64';
import SummaryApi from '../Common';
import { toast } from 'react-toastify';

const Signup = () => {

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState("")
  const [showConfirmPassword, setShowConfirmPassword] = useState("")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: ""
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (data.password === data.confirmPassword) {

      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const dataApi = await dataResponse.json()
      // console.log(dataApi)

      if (dataApi.success) {
        toast.success(dataApi.message)
        navigate("/login")
      }
      if (dataApi.error) {
        toast.error(dataApi.message)
      }
    }
    else {
      toast.error("Please check password and confirm password")
    }
  }

  const handleUploadPic = async (e) => {
    const file = e.target.files[0]
    const imagePic = await ImagetoBase64(file)
    setData((preve) => {
      return {
        ...preve,
        profileImage: imagePic
      }
    })

  }

  console.log(data)

  return (
    <section id='signup'>
      <div className="mx-auto container p-4">

        <div className='bg-white p-4 py-5 w-full max-w-md mx-auto mt-6 shadow-md'>

          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
              <img src={data.profileImage || loginIcon} alt='login icons' />
            </div>
            <form>
              <label>
                {data.profileImage ?
                  (<div className='pb-8 pt-8 cursor-pointer text-center absolute bottom-0 w-full'>
                    <p style={{ fontSize: "12px", fontWeight: "700" }}></p>
                  </div>)
                  :
                  (<div className='pb-8 pt-8 cursor-pointer text-center absolute bottom-0 w-full bg-slate-200 bg-opacity-80'>
                    <p style={{ fontSize: "12px", fontWeight: "700" }}>upload photo</p>
                  </div>)}

                <input type='file' className='hidden' onChange={handleUploadPic} />
              </label>
            </form>
          </div>

          <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>

            <div className="grid">
              <label className='text-lg font-semibold' htmlFor="name">Username:</label>
              <div className="bg-slate-100 p-2">
                <input className="w-full h-full outline-none bg-transparent" type="text" placeholder='Enter username' name="name" required="name" value={data.name} onChange={handleOnChange} />
              </div>
            </div>


            <div className="grid">
              <label className='text-lg font-semibold' htmlFor="email">Email:</label>
              <div className="bg-slate-100 p-2">
                <input className="w-full h-full outline-none bg-transparent" type="email" placeholder='Enter email' name="email" required="email" value={data.email} onChange={handleOnChange} />
              </div>
            </div>

            <div class="grid">
              <label className='text-lg font-semibold' htmlFor="password">Password:</label>
              <div className="bg-slate-100 p-2 flex cursor-pointer">
                <input type={showPassword === true ? "text" : "password"} className="w-full h-full outline-none bg-transparent" placeholder='Enter password' name="password" required="password" value={data.password} onChange={handleOnChange} />
                <div className="text-xl  mr-3">
                  <span>
                    {
                      showPassword === true ?
                        (
                          <FaEye onClick={() => { setShowPassword(false) }} />
                        ) :
                        (
                          <FaEyeSlash onClick={() => { setShowPassword(true) }} />
                        )
                    }
                  </span>
                </div>
              </div>
              <div className='flex justify-end px-2'>

              </div>
            </div>

            <div class="grid">
              <label className='text-lg font-semibold' htmlFor="password">Confirm Password:</label>
              <div className="bg-slate-100 p-2 flex cursor-pointer">
                <input type={showConfirmPassword === true ? "text" : "password"} className="w-full h-full outline-none bg-transparent" placeholder='Enter confirm password' name="confirmPassword" required="confirmPassword" value={data.confirmPassword} onChange={handleOnChange} />
                <div className="text-xl  mr-3">
                  <span>
                    {
                      showConfirmPassword === true ?
                        (
                          <FaEye onClick={() => { setShowConfirmPassword(false) }} />
                        ) :
                        (
                          <FaEyeSlash onClick={() => { setShowConfirmPassword(true) }} />
                        )
                    }
                  </span>
                </div>
              </div>
              <div className='flex justify-end px-2'>

              </div>
            </div>

            <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[120px] rounded-full active:scale-95 transition-all mx-auto block mt-8 mb-5 hover:bg-red-700 font-semibold'>Signup</button>

            <div className='mt-10'>
              <div className='flex justify-center gap-10 font-semibold'>
                <Link to="/login">
                  <p >Already have a account ?<span className='hover:text-blue-500'> Login Now</span></p>
                </Link>
              </div>
            </div>
          </form>
        </div>

      </div>
    </section>
  )
}

export default Signup