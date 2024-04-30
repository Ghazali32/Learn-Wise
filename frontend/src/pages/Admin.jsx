import AdminComponent from "../components/AdminComponent";
import { NavBar } from "../components/NavBar";

export function Admin()
{
    return <div className="w-screen h-screen">
        <NavBar></NavBar>
        <AdminComponent></AdminComponent>
    </div>
}