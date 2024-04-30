
export function Button({text , onClick})
{
    return <button onClick={onClick} className="bg-purple-600 px-2 py-4 w-80 mt-4 hover:bg-purple-700">
        <h1 className="text-white font-bold">{text}</h1>
    </button>
}