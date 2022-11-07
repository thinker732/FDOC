const express=require('express')


require('./db/mongoose')


const userRouter=require('./routers/user')
const doctorRouter=require('./routers/doctor')
const app=express()

app.use(express.json())
app.use(userRouter)
app.use(doctorRouter)

module.exports=app