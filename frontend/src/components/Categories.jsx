import category from '../assets/category.png'
export function Categories()
{
    return <div className="py-6 px-10 ml-5 w-screen flex flex-col ">
        <h1 className="font-bold text-2xl">Learners are viewing</h1>
        <div className="flex items-center justify-start">
            <img className ="mt-12 ml-20 h-2/3 w-10/12 " src={category}/>
        </div>
    </div>
}