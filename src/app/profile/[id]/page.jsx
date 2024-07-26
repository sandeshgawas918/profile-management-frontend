"use client";

import axios from "axios";
import { ArrowBigLeftDash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const page = () => {
  const params = useParams();
  const [user, setuser] = useState("");
  const [name, setname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [icon, seticon] = useState(null);

  const inputFile = useRef()

  const displayUser = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_KEY}/api/getUser/${params.id}`)
      .then((res) => {
        setuser(res.data);
        setname(res.data.name);
        setlname(res.data.lname);
        setemail(res.data.email);
        setmobile(res.data.mobile);
        seticon(res.data.icon)
      })
      .catch((err) => {
        console.log('Error while displaying users : ', err);
      });
  };

  const updateUser = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("lname", lname);
    formData.append("icon", icon);

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_KEY}/api/updateUser/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      toast.success('User has been updated')
      setemail("");
      setname("");
      seticon(null);
      setmobile("");
      setlname("");

      displayUser()

    } catch (error) {
      toast.error('Error while updating User')
      console.log('Profile page error : ', error);
    }
  };

  useEffect(() => {
    displayUser();
  }, []);

  return (
    <div>
      <ToastContainer/>
      <button className=" m-5 p-2 bg-red-500 rounded-lg">
        <Link href="/" className="px-5 flex flex-row gap-1">
          {" "}
          <ArrowBigLeftDash /> Back
        </Link>
      </button>
      <div>
        <h1 className=" text-center text-2xl md:text-5xl font-bold m-9">
          Hey... {user && user.name.toUpperCase()}{" "}🙋‍♂️
        </h1>
      </div>
      <div>
        <div className="grid md:grid-cols-5 gap-5 md:px-10">
          <div className="grid col-span-2 p-5">
            <div className="flex items-center justify-end h-full">
              {user && (
                <div className=" bg-black flex gap-4 flex-col border border-yellow-600  rounded-xl p-6 font-serif items-center">
                  <Image
                    src={user.icon}
                    width={230}
                    height={270}
                    alt="img"
                    className=" p-1 rounded-full border-[3px] border-yellow-600"
                  />
                  <p className="text-[20px]">
                    <span className=" font-semibold text-[23px]">Name :</span>{" "}
                    {user.name} {user && user.lname}{" "}
                  </p>
                  <p className="text-[20px]">
                    <span className=" font-semibold text-[23px]">Email :</span>{" "}
                    {user.email}
                  </p>
                  <p className="text-[20px]">
                    <span className=" font-semibold text-[23px]">Mobile :</span>{" "}
                    {user.mobile}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="grid col-span-3 p-5">
            <div className="">
              <form
                action=""
                className=" flex flex-col justify-center md:items-start h-full"
              >
                <div className=" text-center md:w-[500px] md:h-[430px] p-7 border border-yellow-600 rounded-lg flex flex-col gap-5 shadow-lg">
                  <div className="text-3xl text-yellow-600 font-bold">
                    Update Here
                  </div>
                  <div className="flex md:flex-row flex-col gap-5 md:gap-1">
                    <input
                      value={name}
                      onChange={(e) => {
                        setname(e.target.value);
                      }}
                      type="text"
                      placeholder=" enter your first name"
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
                  </div>
                  <input
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    type="text"
                    placeholder="enter your email"
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
                    ref={inputFile}
                    onChange={(e) => {
                      seticon(e.target.files[0]);
                    }}
                    type="file"
                    placeholder="enter your profile icon url"
                    className=" p-3 text-blue rounded-xl font-semibold"
                  />
                  <button
                    onClick={updateUser}
                    className=" bg-yellow-600 px-5 p-2 rounded-md"
                  >
                    Update
                  </button>
                  {/* <Link href='/' className=" bg-yellow-600 px-5 p-2 rounded-md">Home</Link> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
