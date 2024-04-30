import { useNavigate } from "react-router-dom"

export function FootNav()
{
    const navigate = useNavigate()
    return <div className="w-screen bg-[#1c1d1f] px-14">
        <div className="flex justify-between">
            <div className="py-5">
                <h1 className="text-white font-bold text-lg">Teach the World Online</h1>
                <h1 className="text-white font-medium mt-1 text-sm">Create an online video course, reach students across the globe, and earn money</h1>
            </div>
            <button className=" mt-5 border border-white px-4 py-1 h-10  bg-[#1c1d1f] text-white font-bold hover:bg-gray-800" onClick={()=>{navigate('/admin')}}>
                Teach on Learn Wise
            </button>
        </div>
    </div>
}