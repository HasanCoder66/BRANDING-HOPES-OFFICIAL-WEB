import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        min : 3,
        max : 25
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },

    password: {
        type: String,
        required : true,
        min: 6,
    },
    
    isAdmin: {
        type: Boolean,
        default: false
    },

    fromGoogle : {
        type : Boolean,
        default : false
    },
    
},
    { timestamps: true }
)

export default mongoose.model('user' , userSchema)