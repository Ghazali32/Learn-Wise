import { useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";
import { NameLogo } from "./NameLogo";
import { Popup } from "reactjs-popup";
import logo from "../assets/logo.png";

export function PostLoginNavBar() {
  const name = sessionStorage.getItem("name");
  const navigate = useNavigate();
  return (
    <div className="shadow-md w-screen p-3 flex">
      <img
        className="w-28 ml-2 cursor-pointer"
        src={logo}
      />
      <div className=" mt-3 ml-4">
        <h1 className="text-sm   text-gray-600 hover:text-purple-600 pointer:none cursor-pointer ">
          Categories
        </h1>
      </div>
      <input
        className="border ml-8 border-gray-600 w-1/2  rounded-full px-2 py-3"
        type="text"
        placeholder="Search for anything"
      />
      <div className="ml-8 flex gap-2">
        <Alert text="Teach on Udemy" to={"/admin"}></Alert>
        <Alert text="My Learnings" to={"/myLearnings"}></Alert>
        <Alert
          text="Log out"
          onClick={() => {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("name");
            alert("User Logged Out!!");
            navigate("/");
          }}
        ></Alert>
        <div
          onClick={() => {
            navigate("/cart");
          }}
          className="mt-3 ml-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 font-bold hover:text-purple-600 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </div>

        <div className="mt-1 ml-4">
          <NameLogo name={name}></NameLogo>
        </div>
      </div>
    </div>
  );
}
