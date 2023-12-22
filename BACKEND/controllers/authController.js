import bcrypt from 'bcrypt'
import User from '../models/userSchema.js'

// Register Full Controller Function going to Routes files
export const register = async (req, res , next) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        // console.log(salt);
        const hash = bcrypt.hashSync(req.body.password , salt)
        // console.log(hash);
        const newUser = new User({
            ...req.body , password : hash
        })
        // console.log(newUser);
        await newUser.save()
        res.status(200).json({
            message : "USER SIGNUP SUCCESSFULLY",
            user : newUser
        })
    } catch (error) {
        console.log(error);
    }
}




// Login Full Controller Function going to Routes files


export const login = async(req, res , next) => {
    try {
        
    } catch (error) {
        console.log(error)
    }
}