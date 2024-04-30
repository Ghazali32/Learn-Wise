import { useNavigate } from "react-router-dom"

export function Intsructor()
{
    const navigate = useNavigate()
    return <div className="flex w-screen justify-center py-10">
        <div>
            <img className="h-96" src="https://s.udemycdn.com/home/non-student-cta/instructor-1x-v3.jpg"/>
        </div>
        <div className="flex flex-col mt-20 ml-16 max-w-96 items-start">
                <h1 className="text-4xl font-bold">
                Become an instructor
                </h1>
                <h1 className=" mt-6 text-xl font-semibold">
                Instructors from around the world teach millions of learners on Udemy. We provide the tools and skills to teach what you love.
                </h1>
                <button onClick={()=>{
                    navigate('/admin')
                }} className="mt-6 bg-[#1c1d1f] text-white font-semibold py-3 px-4 hover:bg-gray-800">
                    Start teaching today
                </button>
            </div>
    </div>
}