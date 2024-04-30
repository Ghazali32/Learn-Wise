import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import MyCourse from "./MyCourse";
import { PostLoginNavBar } from "./PostLoginNavBar";
import {CourseList} from './CourseList'
import { FootNav } from "./FootNav";
import { Footer } from "./Footer";

function MyLearnings() {
  const [courses, setCourses] = useState([]);
  const [allCourses,setAllCourses] = useState([])
  const [total, setTotal] = useState(0);
  const token = sessionStorage.getItem("token");

  const calculateAmount = () => {
    let sum = 0;
    for (let i = 0; i < courses.length; i++) {
      sum += courses[i].price;
    }
    console.log(sum);
    setTotal(sum);
  };

  const getCourse = async () => {
    const res = await axios.get("http://localhost:3000/Udemy/user/myCourses", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (res.data.error) {
      alert(res.data.error);
      return;
    }
    if (res.data.purchasedCourses) {
      console.log(res.data.purchasedCourses);
      setCourses(res.data.purchasedCourses);
    }
  };

  useEffect(() => {
    async function allCourses() {
      const res = await axios.get("http://localhost:3000/Udemy/course/all");
      const data = res.data.course;
      setAllCourses(data);
    }
    allCourses();
    getCourse();
  }, []);

  useEffect(() => {
    calculateAmount();
  }, [courses]);

  return (
    <div className="w-screen h-screen">
    <PostLoginNavBar></PostLoginNavBar>
    <MyCourse
      title="My Leanings"
      courses={courses}
      subTitle="Courses Purchased"
      url = 'http://localhost:3000/Udemy/user/removePurchased'
      total={total}
    />
    <CourseList courses = {allCourses} title='You might also like'></CourseList>
    <FootNav></FootNav>
    <div className="w-screen bg-gray-600 h-px">
      </div>
    <Footer></Footer>
  </div>
  )
}

export default MyLearnings