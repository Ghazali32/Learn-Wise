const express = require('express')
const userRouter = require('./user')
const courseRouter = require('./course')
const adminRouter = require('./admin')

const router = express.Router()


router.use('/user',userRouter)
router.use('/course',courseRouter)
router.use('/admin', adminRouter)


module.exports = router;
