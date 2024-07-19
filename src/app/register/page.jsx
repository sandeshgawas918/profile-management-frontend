"use client"

import axios from 'axios'
import { ArrowBigLeftDash } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const page = () => {

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [mobile, setmobile] = useState('')
    const [password, setpassword] = useState('')
    const [icon, seticon] = useState('')
    const [lname, setlname] = useState('')

    const registerUser = async (e) => {
        e.preventDefault()
        let user = await axios.post('http://localhost:7000/api/register', { name, email, mobile, icon, password })
            .then((res) => {
                console.log(res);
                setemail('')
                setname('')
                seticon('')
                setmobile('')
                setpassword('')
                setlname('')
            })
            .catch((err) => {
                console.log('error on register route - nextapp -', err);
            })
    }

    return (
        <div >
            <button className=' m-5 p-2 bg-red-500 rounded-lg'>
                <Link href='/' className='px-5 flex flex-row gap-1'> <ArrowBigLeftDash /> Back</Link>
            </button>
            <form action="" className=' flex flex-col justify-center items-center' encType="multipart/form-data">
                <div className=' text-center md:w-[400px] p-7 border rounded-lg flex flex-col gap-5 md:mt-5 shadow-lg'>
                    <div className="text-3xl text-orange-600 font-bold">Register Here</div>
                    <input value={name} onChange={(e) => { setname(e.target.value) }} type="text" placeholder='enter your first name' className=' p-3 text-black rounded-xl font-semibold' />
                    <input value={lname} onChange={(e) => { setlname(e.target.value) }} type="text" placeholder='enter your last name' className=' p-3 text-black rounded-xl font-semibold' />
                    <input value={email} onChange={(e) => { setemail(e.target.value) }} type="text" placeholder='enter your email' className=' p-3 text-black rounded-xl font-semibold' />
                    <input value={mobile} onChange={(e) => { setmobile(e.target.value) }} type="text" placeholder='enter your mobile no.' className=' p-3 text-black rounded-xl font-semibold' />
                    <input value={password} onChange={(e) => { setpassword(e.target.value) }} type="text" placeholder='enter desired password' className=' p-3 text-black rounded-xl font-semibold' />
                    <input value={icon} onChange={(e) => { seticon(e.target.value) }} type="text" placeholder='enter your profile icon url' className=' p-3 text-black rounded-xl font-semibold' name='icon' />
                    <button onClick={registerUser} className=" bg-orange-600 px-5 p-2 rounded-md">Register</button>
                    <Link href='/' className=" bg-yellow-600 px-5 p-2 rounded-md">Home</Link>
                </div>
            </form>
        </div>
    )
}

export default page