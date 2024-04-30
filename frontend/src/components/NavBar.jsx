import { useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import logo from "../assets/logo.png"

export function NavBar() {
    const navigator = useNavigate()

    const loginClick = () => {
        navigator('/signin')
    }
    const signUpClick = () => {
        navigator('/signup')
    }

    return <div className="shadow-md w-screen p-3 flex">
        <img className="w-28 ml-2 mt-1 cursor-pointer" src={logo}/>
        <div className=" mt-3 ml-5"><h1 className="text-sm   text-gray-600 hover:text-purple-600 pointer:none cursor-pointer ">Categories</h1></div>
        <input className="border border-gray-600 w-1/2 ml-5 rounded-full px-2 py-3" type="text" placeholder="Search for anything" />
        <div className="ml-5 flex justify-evenly">
        <Alert text='Teach on Learn Wise' to={'/admin'}></Alert>
        <div className="mt-3 ml-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 font-bold">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
        </div>
        <div className="ml-8 flex gap-5">
        <div>
            <button onClick={loginClick} className="p-2 border border-black px-5 mt-1 ml-8 font-semibold hover:bg-gray-300">Log in</button>
        </div>
        <div>
            <button onClick = {signUpClick} className="p-2 border border-black px-5 mt-1 ml-3 text-white bg-[#1c1d1f] font-semibold hover:bg-gray-800">Sign up</button>
        </div>
        </div>
        </div>
        
        
    </div>
}