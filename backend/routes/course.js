const express = require('express')
const { Course } = require('../database/DataBase')

const courseRouter = express.Router()

courseRouter.post('/', async (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const instructor = req.body.instructor
    const price = req.body.price

    const course = await Course.create({
        title,
        description,
        instructor,
        price
    })

    res.json({
        course
    })

})

courseRouter.get('/all', async (req,res)=>{
    const course = await Course.find({});

    if(!course)
    {
        res.json({
            error : "Some error"
        })
        return
    }

    res.status(200).json({
        course
    })
})

courseRouter.get('/filter', async(req,res)=>{
    const filter = req.query.filter
    let course = null
    try{
        course = await Course.find({
            title : {
                '$regex' : filter
            }
        })
    }catch(e)
    {
        res.json({
            error : e
        })
        return
    }

    res.json({
        course
    })
})




module.exports = courseRouter