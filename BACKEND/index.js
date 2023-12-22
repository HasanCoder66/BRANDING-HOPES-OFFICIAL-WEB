// ALL DEPENDENCIES & FILES ARE IMPORTS HERE ====>

import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRouter from './routes/authRoutes.js'

// SERVER LIVE ON THIS PORT LOCALLY
const PORT = 7500

const app = express()
dotenv.config()

// MIDDLEWARES TO ROUTE API ON HIS LOCATIONS ====>
app.use(express.json())
app.use('/api/auth', authRouter)




// CONNECT TO BACKEND MONGO DB ====>
const connectToDb = () => {
// mongoose.connect(process.dotenv.MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log('Connect to DB')
})
.catch((err) => {
    throw err
})
};

// SERVER LISTENING
app.listen(PORT , () => {
    console.log(`Server connected on ${PORT}` )
    connectToDb()
})