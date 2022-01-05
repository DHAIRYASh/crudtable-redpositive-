import  mongoose  from "mongoose";

const userSchema = mongoose.Schema({
    
    name:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    hobbies:{
        type:String,
        required:true,
    },
    
    isDeleted : {
        type:Boolean,
        required:true,
        default:false,
    }
   
},{
    timestamps: true
})


const User = mongoose.model('User',userSchema)

export default User