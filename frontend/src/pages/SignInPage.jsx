import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Input } from "../components/InputComponent";
import { NavBar } from "../components/NavBar";

export function SignIn() {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    return <div className="w-screen h-screen">
        <NavBar></NavBar>
        <div className="h-3/4 w-screen flex justify-center items-center flex-col">
            <div className="mt-12 flex justify-center  flex-col">
                <Heading text={'Log in to your Learn Wise account'}></Heading>
                <Input placeholder={'Email'} onChange={(e) => {
                    setUserName(e.target.value)
                }}></Input>
                <Input placeholder={'Password'} type={'password'} onChange={(e) => {
                    setPassword(e.target.value)
                }}></Input>
                <Button text={'Log in'} onClick={async () => {
                    const res = await axios.post('http://localhost:3000/Udemy/user/signin', {
                        username: username,
                        password: password
                    })
                    if (res.error) {
                        alert(res.error)
                        return
                    }
                    try {
                        const token = res.data.token
                        const name = res.data.name
                        sessionStorage.setItem('token', token)
                        sessionStorage.setItem('name', name)
                        navigate('/postlogin')
                    } catch (e) {
                        alert(e)
                    }
                }}></Button>
                <div className="w-80">
                    <Alert preText={"Don't have an account?"} text={'Sign Up'} to={'/signup'}></Alert>
                </div>
            </div>
        </div>
    </div>
}