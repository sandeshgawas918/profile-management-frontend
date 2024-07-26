"use client"

import axios from 'axios'
import { ArrowBigLeftDash } from 'lucide-react'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { Router } from 'next/router'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const router = useRouter()

    const validateUser = async (e) => {
        e.preventDefault()
        let user = await axios.post(`${process.env.NEXT_PUBLIC_API_KEY}/api/login`, { email, password })
            .then((res) => {
                console.log(res);

                if (res.status == 200) {
                    // console.log('if res success');
                    toast.success('Logged in successfully...')
                    router.push(`/profile/${res.data._id}`)
                }
                else {
                    // console.log('if res not success');
                    toast.error('Wrong credentials, please try again.')
                }
            })
            .catch((err) => {
                console.log('Error on login route (nextJS) : ', err);
                toast.error('Wrong credentials, please try again.')
            })
    }

    return (
        <div className=''>
            <ToastContainer />
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