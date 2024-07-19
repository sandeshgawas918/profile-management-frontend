"use client"

import axios from 'axios'
import { ArrowBigLeftDash, DatabaseZapIcon, FilePenLine, Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import DisplayUser from '../_components/DisplayUser'

const page = () => {

    const [users, setusers] = useState('')

    const getAllUsers = async () => {
        await axios.get('http://localhost:7000/api/fetchUsers')
            .then((res) => {
                setusers(res.data)
            })
            .catch((err) => {
                console.log('error on admin page', err);
            })
    }

    useEffect(() => {
        getAllUsers()
    })

    return (
        <div>
            <button className=' m-5 p-2 bg-red-500 rounded-lg'>
                <Link href='/' className='px-5 flex flex-row gap-1'> <ArrowBigLeftDash /> Back</Link>
            </button>
            <h1 className=' md:text-5xl text-2xl font-bold text-center mt-9 flex flex-row items-center justify-center gap-5'>Administrator
            </h1>
            <DisplayUser users={users} />
        </div>
    )
}

export default page