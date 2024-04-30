import {Link} from 'react-router-dom' 
export function Alert({
  text,to,preText,onClick
})
{
    return <div onClick={onClick} className="flex p-2">
        <div>{preText}</div>
        <Link className="pointer pl-1 cursor-pointer no-underline" to={to}>
        <div className="mt-1 ml-3"><h1 className="text-sm  text-gray-600 hover:text-purple-600 pointer:none cursor-pointer ">{text}</h1></div>
      </Link>
    </div>
}