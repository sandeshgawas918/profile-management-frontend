"use client";

import axios from "axios";
import { ArrowBigLeftDash } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [password, setpassword] = useState("");
  const [icon, seticon] = useState("");
  const [lname, setlname] = useState("");

  const fileInput=useRef()

  const registerUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("password", password);
    formData.append("icon", icon);
    formData.append("lname", lname);
    let user = await axios
      .post(`${process.env.NEXT_PUBLIC_API_KEY}/api/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success('Registration Successfull...')
        setemail("");
        setname("");
        seticon("");
        setmobile("");
        setpassword("");
        setlname("");

        fileInput.current.value=''
      })
      .catch((err) => {
       toast.error('Form not filled properly. Please fill again.')
        console.log("Error on register route (nextapp) : ", err);
      });
  };

  return (
    <div>
       <ToastContainer />
      <button className=" m-5 p-2 bg-red-500 rounded-lg">
        <Link href="/" className="px-5 flex flex-row gap-1">
          {" "}
          <ArrowBigLeftDash /> Back
        </Link>
      </button>
      <form
        action=""
        className=" flex flex-col justify-center items-center"
        encType="multipart/form-data"
      >
        <div className=" text-center md:w-[400px] p-7 border rounded-lg flex flex-col gap-5 md:mt-5 shadow-lg">
          <div className="text-3xl text-orange-600 font-bold">
            Register Here
          </div>
          <input
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
            type="text"
            placeholder="enter your first name *"
            className=" p-3 text-black rounded-xl font-semibold"
          /> 
          <input
            value={lname}
            onChange={(e) => {
              setlname(e.target.value);
            }}
            type="text"
            placeholder="enter your last name"
            className=" p-3 text-black rounded-xl font-semibold"
          />
          <input
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            type="text"
            placeholder="enter your email *"
            className=" p-3 text-black rounded-xl font-semibold"
          />
          <input
            value={mobile}
            onChange={(e) => {
              setmobile(e.target.value);
            }}
            type="text"
            placeholder="enter your mobile no."
            className=" p-3 text-black rounded-xl font-semibold"
          />
          <input
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            type="password"
            placeholder="enter desired password *"
            className=" p-3 text-black rounded-xl font-semibold"
          />
          <input
          ref={fileInput}
            onChange={(e) => {
              seticon(e.target.files[0]);
            }}
            type="file"
            placeholder="enter your profile icon url"
            className=" p-3 text-blue rounded-xl font-semibold"
          />
          <button
            onClick={registerUser}
            className=" bg-orange-600 px-5 p-2 rounded-md"
          >
            Register
          </button>
          <Link href="/" className=" bg-yellow-600 px-5 p-2 rounded-md">
            Home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default page;
