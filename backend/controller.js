
import User from "./model.js";
import asynHandler from "express-async-handler"

export const getAllUsers = asynHandler(async(req,res)=> {
const allUser = await User.find({
    isDeleted:false
})

res.json(allUser)

})

export const postUser = asynHandler(async(req,res)=> {
   console.log(req.body)
  await User.create(req.body)
  res.send("User created")
    
    
    })
export const updateUser = asynHandler(async(req,res)=> {
        const id = req.params.id
    console.log("updated")
        await User.updateOne({_id:id},req.body)
           res.send("User Updated")
         
             
             })

export const deleteUser = asynHandler(async(req,res)=> {
    const id = req.params.id
    await User.updateOne({_id:id},{isDeleted:true})
       
       res.send("User deleted")
         
         
         })