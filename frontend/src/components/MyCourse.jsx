import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { Alert } from "./Alert";

function MyCourse({ title, subTitle, courses, total, isTrue, url }) {
  return (
    <div className="w-screen px-24 py-8">
      <h1 className="font-bold text-4xl">{title}</h1>
      <div className="grid grid-cols-3 gap-2 mt-6">
        <div className="col-span-2 h-full flex flex-col gap-2">
          <h1 className="font-bold text-md">
            {courses.length} {subTitle}
          </h1>
          <div className="h-px bg-gray-300"></div>
          {courses.map((course) => {
            return <CourseTile url={url} course={course}></CourseTile>;
          })}
        </div>
        {isTrue ? (
          <div className="col-span-1">
            <CheckOut amount={total}></CheckOut>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

function CourseTile({ course, url }) {
  const [purchased, setPurchased] = useState(false);
  const [action, setAction] = useState(false);

  // Check if the user has already purchased this course
  const token = sessionStorage.getItem("token");

  async function check() {
    const res = await axios.post(
      "http://localhost:3000/Udemy/user/checkCourse",
      {
        courseId: course._id,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (res.data.msg === "Purchased" || res.data.msg === "yes") {
      setPurchased(true);
    }
  }
  useEffect(() => {
    check();
  }, []);

  useEffect(() => {
    check();
  }, [action]);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(url, {
        data: { courseId: course._id }, // Send data as 'data' property
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (res.data.error) {
        alert(res.data.error);
        return;
      }

      if (res.data.msg) {
        setAction(!action);
        alert(res.data.msg);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again."); // Handle generic error
    }
  };

  const handleBuy = async () => {
    const res = await axios.post(
      "http://localhost:3000/Udemy/user/purchase",
      {
        courseId: course._id,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (res.data.error) {
      alert(res.data.error);
      return;
    } else if (res.data.msgErr) {
      alert(res.data.msgErr);
      return;
    }
    if (res.data.msg) {
      setAction(!action);
      alert(res.data.msg);
    }
  };

  return (
    <div>
      <div className="h-36 grid grid-cols-6 gap-2">
        <div className="col-span-1 flex items-center">
          <img src={course.imageUrl} />
        </div>
        <div className=" col-span-3 flex flex-col py-6 px-2 gap-1">
          <h1 className="font-bold text-md">{course.title}</h1>
          <h1 className="font text-sm text-gray-600">By {course.instructor}</h1>
          <div className="flex gap-3 mt-1">
            <div className="bg-yellow-200 h-6 w-24 text-center">
              <h1 className="font text-sm ">Best Seller</h1>
            </div>
            <div className="bg-teal-400 h-6 px-3 text-center">
              <h1 className="font text-sm">Recently Updated</h1>
            </div>
            <h1 className="text-sm text-gray-600">(281,824 ratings)</h1>
          </div>
        </div>
        <div
          onClick={handleDelete}
          className="col-span-1 flex flex-col gap-2 items-end px-2 py-6"
        >
          <h1 className="text-md text-purple-600 hover:text-purple-800  cursor-pointer">
            Remove
          </h1>
          <h1 className="text-md text-purple-600 hover:text-purple-800  cursor-pointer">
            Save for Later
          </h1>
          {purchased ? (
            <h1 className="text-lg text-purple-600 hover:text-purple-800 font-bold  cursor-pointer">
              Purchased!
            </h1>
          ) : (
            <button
              onClick={handleBuy}
              className="bg-purple-600 px-5 py-1 text-white hover:bg-purple-700 font-bold"
            >
              Buy Course
            </button>
          )}
        </div>
        <div className="col-span-1 px-2 py-6 text-center">
          <h1 className="font-bold text-lg text-purple-600 hover:text-purple-800  cursor-pointer">
            ₹{course.price}
          </h1>
        </div>
      </div>
      <div className="h-px bg-gray-300"></div>
    </div>
  );
}

function CheckOut({ amount }) {
  return (
    <div className="flex flex-col gap-2 px-6 py-5 m-6">
      <h1 className="font-bold text-gray-600 text-lg">Total:</h1>
      <h1 className="font-bold text-4xl">₹{amount}</h1>
      <Button text="Checkout"></Button>
      <h1 className="font-bold text-md">Promotions</h1>
      <div className="flex gap-1">
        <div className="col-span-2">
          <input
            className="border px-1 py-2 border-gray-800"
            placeholder=" Enter Coupon"
          />
        </div>
        <button className="p-2 px-10  text-white bg-purple-600 font-semibold hover:bg-purple-700">
          Apply
        </button>
      </div>
      <div className="text-start w-full">
        <Alert text={"See Purchased Courses"} to={"/myLearnings"}></Alert>
      </div>
    </div>
  );
}

export default MyCourse;
