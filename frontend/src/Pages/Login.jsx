import React, { useContext, useState } from 'react'
import loginIcon from "../assets/signin.gif"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"
import SummaryApi from '../Common';
import { toast } from 'react-toastify';
import Context from '../Context';

const Login = () => {

    const navigate = useNavigate()
    const {fetchUserDetails,fetchUserAddToCart} = useContext(Context)

    const [showPassword, setShowPassword] = useState("")
    const [data, setData] = useState({
        email: "",
        password: "",
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

        const dataResp = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signUp.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const dataApi = await dataResp.json()

        if (dataApi.success) {
            toast.success(dataApi.message)
            navigate("/")
            fetchUserDetails()
            fetchUserAddToCart()
        }
        if (dataApi.error) {
            toast.error(dataApi.message)
        }
    }

    console.log(data)

    return (
        <div>
            <section id='login'>
                <div className="mx-auto container p-4">

                    <div className='bg-white p-4 py-5 w-full max-w-md mx-auto mt-6 shadow-md'>

                        <div className='w-20 h-20 mx-auto'>
                            <img src={loginIcon}></img>
                        </div>

                        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                            <div className="grid">
                                <label className='text-lg font-semibold' htmlFor="email">Email:</label>
                                <div className="bg-slate-100 p-2">
                                    <input className="w-full h-full outline-none bg-transparent" type="email" placeholder='Enter email' name="email" value={data.email} onChange={handleOnChange} />
                                </div>
                            </div>

                            <div >
                                <label className='text-lg font-semibold' htmlFor="password">Password:</label>
                                <div className="bg-slate-100 p-2 flex cursor-pointer">
                                    <input type={showPassword === true ? "text" : "password"} className="w-full h-full outline-none bg-transparent" placeholder='Enter password' name="password" value={data.password} onChange={handleOnChange} />
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
                                    <Link to="/forgotpassword">
                                        <p className='hover:underline hover:text-red-600 font-semibold'>Forgot Password ?</p>
                                    </Link>
                                </div>
                            </div>

                            <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[120px] rounded-full active:scale-95 transition-all mx-auto block mt-8 mb-5 hover:bg-red-700 font-semibold'>Login</button>

                            <div className='mt-10'>
                                <div className='flex justify-center gap-10 font-semibold'>
                                    <Link to="/signup">
                                        <p >Dont have a account ?<span className='hover:text-blue-500'> Signup Now</span></p>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Login