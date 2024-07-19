import axios from 'axios'
import { FilePenLine, Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const DisplayUser = ({users}) => {
    const deleteUser = async (id) => {
        console.log(id);
        const deletedUser = await axios.delete(`https://profile-management-backend-y2v8.onrender.com/api/delete/${id}`)
        console.log(deletedUser);
    }
    return (
        <div>
            <div className=' grid grid-cols-1 md:grid-cols-4 gap-16 mx-10 my-7 md:m-20 md:px-20'>
                {
                    users && users.map((item, index) => (
                        <div key={item._id} className=' grid border p-5 rounded-xl shadow-xl'>
                            <div className=' flex flex-col md:gap-4'>
                                <Image
                                    src={item.icon || 'https://cdn-icons-png.flaticon.com/512/801/801121.png'}
                                    width={300}
                                    height={100}
                                    alt='img'
                                    className=' rounded-lg'
                                />
                                <p ><span className=' font-semibold text-[18px]'>Name :</span > {item.name} {item.lname}</p>
                                <p ><span className=' font-semibold text-[18px]'>Email :</span > {item.email}</p>
                                <p ><span className=' font-semibold text-[18px]'>Mobile :</span > {item.mobile}</p>
                            </div>
                            <div className='flex flex-row gap-5 justify-end'>
                                <Link href={`/profile/${item._id}`} className=' flex flow-row gap-3'> <FilePenLine className=' text-blue-600' /></Link>
                                <button onClick={() => { deleteUser(item._id) }} className=' flex flow-row gap-3'> <Trash2Icon className=' text-red-600' /></button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DisplayUser