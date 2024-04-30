import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Input } from "../components/InputComponent";
import { NavBar } from "../components/NavBar";
import { Alert } from "../components/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignUp() {
    
    const navigate = useNavigate();

    const [firstName, setFirtstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return <div className="w-screen h-screen">
        <NavBar></NavBar>
        <div className="h-3/4 w-screen flex justify-center items-center flex-col">
            <div className="mt-12 flex justify-center  flex-col">
                <Heading text={'Sign Up and start learning'}>
                </Heading>
                <Input placeholder={'First Name'} onChange={(e) => {
                    setFirtstName(e.target.value)
                }}></Input>
                <Input placeholder={'Last Name'} onChange={(e) => {
                    setLastName(e.target.value)
                }}></Input>
                <Input placeholder={'Email'} onChange={(e) => {
                    setEmail(e.target.value)
                }}></Input>
                <Input type={'password'} placeholder={'Password'} onChange={(e) => {
                    setPassword(e.target.value)
                }}></Input>
                <Button text={'Sign Up'} onClick = { async () => {
                    const res = await axios.post('http://localhost:3000/Udemy/user/signup', {
                        username : email,
                        password : password, 
                        firstName : firstName,
                        lastName : lastName

                    })
                    if(res.error){
                        alert(res.error)
                        return
                    }
                    try{
                        const token = res.data.token
                        const name = res.data.name
                        sessionStorage.setItem('token', token)
                        sessionStorage.setItem('name' , name)
                        navigate('/postlogin')
                    }catch(e)
                    {
                        alert(e)
                    }
                }}></Button>
                <div className="w-80">
                    <Alert preText={"Already an account?"} text={'Sign In'} to={'/signin'}></Alert>
                </div>
            </div>
        </div>

    </div>
}