import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import { Admin } from './pages/Admin'
import { DashBoard } from './pages/DashBoard'
import { PostLoginPage } from './pages/PostLogIn'
import { SignIn } from './pages/SignInPage'
import {CourseDetails} from './pages/CourseDeltail'
import { SignUp } from './pages/SignUp'
import Cart from './components/Cart'
import MyLearnings from './components/MyLearnings'

function App() {
  return (
    <div className='overflow-x-hidden'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<DashBoard></DashBoard>}></Route>
          <Route path='/postlogin' element = {<PostLoginPage></PostLoginPage>}></Route>
          <Route path='/admin' element = {<Admin></Admin>}></Route>
          <Route path='/signin' element = {<SignIn></SignIn>}></Route>
          <Route path='/signup' element = {<SignUp></SignUp>}></Route>
          <Route path='/courseDetail' element= {<CourseDetails></CourseDetails>}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path = '/myLearnings' element = {<MyLearnings />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
