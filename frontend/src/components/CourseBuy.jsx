import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "./Button";
import {useNavigate} from 'react-router-dom'

function CourseBuy({ state }) {
  const token = sessionStorage.getItem("token");
  const [isPurchased, setPurchase] = useState(false);
  const [isCart, setCart] = useState(false)
  const [yes,setYes] = useState(false)
  const navigate = useNavigate()

  const [action,setAction] = useState(true)
  async function check() {
    const res = await axios.post(
      "http://localhost:3000/Udemy/user/checkCourse",
      {
        courseId: state.courseId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(res.data)
    if(res.data.msg === 'Purchased')
    {
      setPurchase(true)
    }
    else if(res.data.msg === 'cart')
    {
        setCart(true)
    }
    else if(res.data.msg === 'yes')
    {
        setYes(true)
    }
  }
  useEffect(() => {
    check()
  }, []);

  useEffect(() => {
    check()
  }, [action]);

  const handleCart = async () => {
    const res = await axios.post(
      "http://localhost:3000/Udemy/user/addToCart",
      {
        courseId: state.courseId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (res.data.error) {
      alert(error);
      return;
    }
    setAction(!action)
    console.log(res.data);
  };

  const handleBuy = async () => {
    const res = await axios.post(
      "http://localhost:3000/Udemy/user/purchase",
      {
        courseId: state.courseId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (res.data.error) {
      alert(error);
      return;
    }
    setAction(!action)
    console.log(res.data);
  };

  return (
    <div className="w-screen  bg-[#2d2f31] px-28 py-12 grid grid-cols-3 gap-6">
      <div className="col-span-2 px-3 pl-10 py-2 flex flex-col gap-4">
        <h1 className="text-white font-bold text-4xl">{state.title}</h1>
        <h1 className="text-white font-semibold text-lg">
          {state.description}
        </h1>
        <h1 className="text-white font-normal">
          Created by{" "}
          <span className="text-[#c0c4fc] underline">{state.instructor}</span>
        </h1>
        <div>
            {(isPurchased||yes)?<h1 className="text-white font-bold text-2xl">Course Already Purchased
            !</h1>:<Button text="Buy Course" onClick={handleBuy} />}
        </div>
      </div>
      <div className="col-span-1 px-10 ">
        <div className="bg-white flex items-center flex-col p-4 gap-2">
          <img className="object-fit w-11/12" src={state.imageUrl} alt="" />
          <div className={'w-full text-center'}>
            {
            (isCart||yes)?<button
            onClick = {()=>{
                navigate('/cart')
            }}
            className="border-2 w-11/12 py-2 font-bold border-gray-800 hover:bg-gray-200"
          >
            Go to Cart
          </button> : <button
            onClick={handleCart}
            className="border-2 w-11/12 py-2 font-bold border-gray-800 hover:bg-gray-200"
          >
            Add to Cart
          </button>
            }
          </div>
          <div className="grid grid-cols-3 gap-1">
            <div className="col-span-2">
              <input
                className="border px-1 py-2 border-gray-800"
                placeholder=" Enter Coupon"
              />
            </div>
            <button className=" rounded p-2 border border-black px-5 text-white bg-[#1c1d1f] font-semibold hover:bg-gray-800">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseBuy;
