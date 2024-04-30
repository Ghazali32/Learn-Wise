
export function Input({placeholder , onChange, type})
{
    return <input className="mt-4 px-2 py-4 w-80 border border-black placeholder:text-black" type={type} placeholder={placeholder} onChange={onChange}/>
}