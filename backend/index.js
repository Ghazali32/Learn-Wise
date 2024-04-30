const express = require('express')
const cors = require('cors')
const app = express()
const router = require('./routes/index');


app.use(express.json())
app.use(cors())


app.use('/Udemy', router)


app.listen(3000,()=>{
    console.log('Udemy Server active')
})