import React, { useEffect, useState } from 'react'
import SummaryApi from '../Common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../Components/ChangeUserRole';

const Allusers = () => {

    const [allusers, setAllUsers] = useState([]);
    const [updateUserRole, setUpdateUserRole] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({
        name: "",
        email: "",
        role: "",
        _id:""
    })

    const fetchAllUsers = async () => {
        const fetchData = await fetch(SummaryApi.allUsers.url, {
            method: SummaryApi.allUsers.method,
            credentials: 'include'
        })

        const dataResponse = await fetchData.json()

        console.log(dataResponse)

        if (dataResponse.success) {
            setAllUsers(dataResponse.data)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }

    }

    useEffect(() => {
        fetchAllUsers()
    }, [])


    return (
        <div className='p-4 bg-white'>
            <table className="w-full userTable">
                <thead>
                    <tr className='bg-black text-white'>
                        <th>SR.No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allusers.map((item, index) => (
                            <tr key={index}>
                                <td> {index + 1}</td>
                                <td> {item.name}</td>
                                <td> {item.email}</td>
                                <td> {item.role}</td>
                                <td>{moment(item.createdAt).format("LLL")}</td>
                                <td>
                                    <button
                                        className="bg-blue-400 p-1 rounded-full cursor-pointer hover:bg-blue-500 text-white"
                                        onClick={() => {
                                            setUpdateUserDetails(item),
                                                setUpdateUserRole(true)
                                        }}>
                                        <MdModeEdit />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {
                updateUserRole && (
                    <ChangeUserRole
                        onClose={() => setUpdateUserRole(false)}
                        name={updateUserDetails.name}
                        email={updateUserDetails.email}
                        role={updateUserDetails.role}
                        userId={updateUserDetails._id}
                        callFunc={fetchAllUsers}
                    >
                    </ChangeUserRole>
                )
            }

        </div>
    )
}

export default Allusers