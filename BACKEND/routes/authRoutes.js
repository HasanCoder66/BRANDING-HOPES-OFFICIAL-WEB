import express from 'express'
import {
    register,
    login,
    googleAuth
}
from '../controllers/authController.js'


const authRouter = express.Router()

// Auth ===> MIDDLEWARES

// Signup middleware and api ↡↓
//https://localhost:7500/api/auth/register
authRouter.post('/register', register)



// login middleware and api ↡↓
//https://localhost:7500/api/auth/login
authRouter.post('/login' , login)



// SignIn with google middleware and api ↡↓
//https://localhost:7500/api/auth/register
authRouter.post('/google' , googleAuth)


export default authRouter