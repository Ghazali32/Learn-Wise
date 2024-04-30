import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";

export function CourseList({ courses,title }) {
  return (
    <div className="ml-5 py-6 px-10 w-screen flex flex-col ">
      <h1 className="font-bold text-2xl">{title}</h1>
      <div className="flex items-center overflow-x-auto overflow-y-hidden">
        <div className="flex">
          {courses.slice(0, 6).map((course) => (
            <CourseCard
            course = {course}
              key={course._id}
              src={course.imageUrl}
              title={course.title}
              admin={course.instructor}
              price={course.price}
              description = {course.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CourseCard({course, src, title, admin, price,description }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/courseDetail", {
      state: {
        courseId: course._id,
        title: course.title,
        imageUrl: course.imageUrl,
        instructor: course.instructor,
        price: course.price,
        description : course.description
      },
    });
  };
  return (
    <div className="ml-3 mr-3 mt-8 w-64 h-72 bg-white flex-none">
      <div
        className="w-full h-36 bg-purple-300 group relative" onClick={handleClick}
      >
        <img className="object-fit w-full h-full" src={src}></img>
        <div
          className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition duration-300"
          style={{ mixBlendMode: "multiply" }}
        ></div>
      </div>
      <div className="px-2 mt-2 ">
        <h1 className="font-bold">{title}</h1>
      </div>
      <div className="px-2 mt-1">
        <h1 className="font-light text-xs">{admin}</h1>
      </div>
      <div className="px-2 mt-1">
        <h1 className="font-bold">₹{price}</h1>
      </div>
    </div>
  );
}
