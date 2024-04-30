import { useLocation } from "react-router-dom";
import CourseBuy from "../components/CourseBuy";
import { CourseList } from "../components/CourseList";
import { PostLoginNavBar } from "../components/PostLoginNavBar";
import axios from "axios";
import {useEffect,useState} from 'react'
import { Footer } from "../components/Footer";
import { FootNav } from "../components/FootNav";

export function CourseDetails() {
  const [courses, setCourses] = useState([])
  const location = useLocation();
  const state = location.state;

  useEffect(()=>{
    async function allCourses()
    {
        const res = await axios.get('http://localhost:3000/Udemy/course/all');
        const data = res.data.course
        setCourses(data)
    }
    allCourses();
}, [])

  return (
    <div className="w-screen h-screen">
      <PostLoginNavBar></PostLoginNavBar>
      <CourseBuy state = {state}></CourseBuy>
      <CourseList courses = {courses} title = 'Browse Other Courses'></CourseList>
      <FootNav></FootNav>
      <div className="w-screen bg-gray-600 h-px">
        </div>
      <Footer></Footer>
    </div>
  );
}
