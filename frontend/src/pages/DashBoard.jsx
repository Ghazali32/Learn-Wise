import { ImageComponent } from "../components/ImageComponent";
import { NavBar } from "../components/NavBar";
import { Partners } from "../components/Partners";
import { CourseList } from "../components/CourseList";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Categories } from "../components/Categories";
import { Intsructor } from "../components/Instructor";
import { Footer } from "../components/Footer";

export function DashBoard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function allCourses() {
      const res = await axios.get("http://localhost:3000/Udemy/course/all");
      const data = res.data.course;
      setCourses(data);
    }
    allCourses();
  }, []);
  return (
    <div className="w-screen h-screen">
      <NavBar></NavBar>
      <ImageComponent></ImageComponent>
      <Partners></Partners>
      <CourseList courses={courses} title='Learners are viewing'></CourseList>
      <Categories></Categories>
      <Intsructor></Intsructor>
      <Footer></Footer>
    </div>
  );
}
