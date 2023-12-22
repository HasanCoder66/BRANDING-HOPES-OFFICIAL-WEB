// ALL DEPENDENCIES IMPORTS ====>
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// SERVER LIVE ON THIS PORT LOCALLY
const PORT = 7500

const app = express()
dotenv.config()

// CONNECT TO BACKEND MONGO DB ====>
const connectToDb = () => {
// mongoose.connect(process.dotenv.MONGO_URI)
mongoose.connect('mongodb+srv://muhammadhasan3866:ib0iYKED119cRTUv@branding-hopes.ac9rdbh.mongodb.net/Branding-Hopes?retryWrites=true&w=majority')
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