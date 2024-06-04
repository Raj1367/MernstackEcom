import React, { useState } from 'react'
import Role from '../Common/Role'
import { CgClose } from "react-icons/cg";
import SummaryApi from '../Common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({ name, email, role, userId, onClose,callFunc }) => {

  const [userRole, setUserRole] = useState(role)



  const updateUserRole = async () => {
    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole
      })
    })

    const responseData = await fetchResponse.json()

    if (responseData.success) {
      toast.success(responseData.message)
      onClose()
      callFunc()
      callFunc()
    }

    console.log("role updated", responseData)

  }


  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>

        <button className="block ml-auto" onClick={onClose}>
          <CgClose fontSize={20} />
        </button>

        <h1 className="pb-4 text-lg font-medium uppercase">Change user role</h1>
        <p>Name: {name}</p>
        <p>Email:{email}</p>
        <div className="flex items-center justify-between my-3">
          <p>Role:</p>
          <select className="border px-4 py-1" value={userRole} onChange={(e) => { setUserRole(e.target.value) }}>

            {
              Object.values(Role).map((item) => (<option value={item} key={item}>{item}</option>))
            }
          </select>
        </div>
        <button className="mt-10 w-fit mx-auto block border py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700 active:scale-95" onClick={updateUserRole}>Change role</button>
      </div>
    </div>
  )
}

export default ChangeUserRole