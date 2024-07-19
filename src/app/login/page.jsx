"use client"

import axios from 'axios'
import { ArrowBigLeftDash } from 'lucide-react'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { Router } from 'next/router'
import React, { useState } from 'react'

const page = () => {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const router = useRouter()

    const validateUser = async (e) => {
        e.preventDefault()
        let user = await axios.post('https://profile-management-backend-y2v8.onrender.com/api/login', { email, password })
            .then((res) => {
                console.log(res);
                // setemail('')
                // setpassword('')

                if (res.status == 200) {
                    console.log('if res success');
                    router.push(`/profile/${res.data._id}`)
                    // console.log('sandesh data',res.data);
                    // localStorage.setItem('name','sandesh')
                }
                else {
                    console.log('if res not success');
                    alert('wrong credential')
                }
            })
            .catch((err) => {
                console.log('error on login route - nextapp -', err);
                alert('wrong credential')
            })
    }

    return (
        <div className='h-screen'>
            <button className=' m-5 p-2 bg-red-500 rounded-lg'>
                <Link href='/' className='px-5 flex flex-row gap-1'> <ArrowBigLeftDash /> Back</Link>
            </button>
            <form action="" className=' flex flex-col justify-center items-center mt-20'>
                <div className=' text-center md:w-[400px] p-7 border rounded-lg flex flex-col gap-5 mt-5 shadow-lg'>
                    <div className="text-3xl text-green-600 font-bold">Login Here</div>
                    <input value={email} onChange={(e) => { setemail(e.target.value) }} type="text" placeholder='enter your email' className=' p-3 text-black rounded-xl font-semibold' />
                    <input value={password} onChange={(e) => { setpassword(e.target.value) }} type="password" placeholder='enter password' className=' p-3 text-black rounded-xl font-semibold' />
                    <button onClick={validateUser} className=" bg-green-600 px-5 p-2 rounded-md">Login</button>
                    <Link href='/' className=" bg-yellow-600 px-5 p-2 rounded-md">Home</Link>
                </div>
            </form>
        </div>
    )
}

export default page