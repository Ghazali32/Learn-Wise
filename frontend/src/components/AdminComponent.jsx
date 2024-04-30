import React from "react";
import { useNavigate } from "react-router-dom";
import Admin from "../assets/Admin.jpg";
import Admin2 from "../assets/Admin2.jpg";
function AdminComponent() {
    
  return (
    <div>
      <div className="flex relative">
        <ButtonComp></ButtonComp>
        <img src={Admin} alt="" />
      </div>
      <div className="mt-10">
        <AdminPitch></AdminPitch>
      </div>
    </div>
  );
}

export default AdminComponent;

function ButtonComp() {
    const navigate = useNavigate()
  return (
    <div className="gap-2 ml-20 p-8 z-999 absolute w-80 h-full flex flex-col items-start justify-center">
      <h1 className="font-bold text-4xl">Come Teach with us</h1>
      <h1 className=" text-lg ">
        Become an instructor and change lives including your own
      </h1>
      <button onClick={()=>{
        navigate('/signup')
      }} className="bg-[#1c1d1f] text-white font-semibold py-3 px-4 hover:bg-gray-800">
        Start teaching today
      </button>
    </div>
  );
}

function AdminPitch() {
    const navigate = useNavigate()
  return (
    <div className="w-screen flex gap-4">
      <img src={Admin2}></img>
      <div className=" ml-32 h-96 w-1/2 flex flex-col gap-4 justify-center items-start">
        <div className="w-full">
        <h1 className="font-bold text-4xl text-start">Sign Up As an Admin to continue</h1>
        </div>
        <h1 className="text-lg">
        Ready to share your knowledge with the world? As an instructor, you have the power to inspire and transform lives through education. By recording and sharing your course videos, you can reach a wider audience and make a greater impact.
        </h1>
        <button onClick={()=>{
        navigate('/signup')
      }} className="bg-[#1c1d1f] text-white font-semibold py-3 px-4 hover:bg-gray-800">
        Start teaching today
      </button>
      </div>
    </div>
  );
}
