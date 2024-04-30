const express = require('express')
const zod = require('zod')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../constant/Password')
const middleware = require('../middleware/middleWare')
const { Admin, Course } = require('../database/DataBase')

const adminRouter = express.Router()


const signUpSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstName: zod.string(),
    lastName: zod.string()
})

adminRouter.post('/signup', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName

    const isValidated = signUpSchema.safeParse(req.body);
    if (!isValidated.success) {
        res.status(411).json({
            error: 'e-main or password incorrect'
        })
        return
    }

    const isPresent = await Admin.findOne({
        username: username
    })
    if (isPresent) {
        res.status(411).json({
            error: 'Email already taken'
        })
        return
    }

    const admin = await Admin.create({
        username,
        password,
        firstName,
        lastName
    })

    const userId = admin._id;
    const token =  jwt.sign({userId},JWT_SECRET)

    res.status(200).json({
        msg: 'Admin Created Successfully',
        token: token
    });
})

const signInSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)
})
adminRouter.post('/signin', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const isValid = signInSchema.safeParse(req.body)
    if (!isValid.success) {
        res.status(411).json({
            error: 'Invalid email or password'
        })
        return
    }

    const admin = await Admin.findOne({
        username: username,
        password: password
    })

    if (admin) {
        const userId = admin._id;
        const token = jwt.sign({ userId }, JWT_SECRET)

        res.status(200).json({
            msg: 'Admin signed in Successfully',
            token: token
        })
        return
    }
    res.status(411).json({
        error: 'error while signing in'
    })
})

adminRouter.post('/create', middleware, async (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const instructor = req.body.instructor
    const price = req.body.price
    const userId = req.userId
    const imageUrl = req.body.imageUrl

    const courseExist = await Course.findOne({
        title: title
    })

    if (courseExist) {
        res.status(411).json({
            error: 'Course Already exists'
        })
        return
    }

    const course = await Course.create({
        title,
        description,
        instructor,
        price,
        imageUrl
    })

    await Admin.findByIdAndUpdate(userId, {
        $push: {
            Courses: course
        }
    });
    res.status(200).json({
        msg: 'Course Created successfully',
        course
    })
})

adminRouter.get('/myCourses', middleware, async (req, res) => {
    const userId = req.userId


    try {
        const admin = await Admin.findById(userId).populate('Courses').exec()

        res.status(200).json({
            Courses: admin.Courses
        })
        return
    } catch (e) {
        res.status(411).json({
            error: e
        })
        return
    }
})




module.exports = adminRouter