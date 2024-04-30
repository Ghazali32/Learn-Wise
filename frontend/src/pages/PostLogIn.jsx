import { ImageComponent } from "../components/ImageComponent"
import { NavBar } from "../components/NavBar"
import { Partners } from "../components/Partners"
import { PostLoginNavBar } from "../components/PostLoginNavBar"
import { useEffect,useState } from "react";
import axios from "axios";
import { CourseList } from "../components/CourseList";
import { Recomendation } from "../components/Recomendation";
import { FootNav } from "../components/FootNav";
import { Footer } from "../components/Footer";
import { useNavigate} from "react-router-dom";

export function PostLoginPage()
{
    const [courses, setCourses] = useState([])
    const navigate = useNavigate()
    
    useEffect(()=>{
        async function allCourses()
        {
            const res = await axios.get('http://localhost:3000/Udemy/course/all');
            const data = res.data.course
            setCourses(data)
        }
        allCourses();
    }, [])

    
    return <div className="w-screen h-screen">
        <PostLoginNavBar></PostLoginNavBar>
        <ImageComponent></ImageComponent>
        <CourseList courses = {courses} title='Learners are viewing'></CourseList>
        <Recomendation></Recomendation>
        <Partners></Partners>
        <FootNav></FootNav>
        <div className="w-screen bg-gray-600 h-px">
        </div>
        <Footer></Footer>
        
    </div>
}
