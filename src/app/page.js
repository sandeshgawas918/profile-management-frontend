import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" h-screen flex justify-center items-center bg-slate-900 text-white flex-col">
        <h1 className=" md:text-5xl text-center">Welcome to Profile Management Application</h1>
        <br />
        <div className=" flex flex-row gap-5">
        <Link href='/admin' className=" bg-blue-600 px-5 p-2 rounded-md">Admin</Link>
        <Link href='/register' className=" bg-orange-600 px-5 p-2 rounded-md hover:bg-orange-700">Register</Link>
        <Link href='/login' className=" bg-green-600 px-5 p-2 rounded-md">Login</Link>
        </div>
    </div>
  );
}
