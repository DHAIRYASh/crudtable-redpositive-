import  mongoose  from "mongoose";
import User from "./model.js";
import  express  from "express";
import userRoutes from './route.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()
const connection = async( ) => {
    try { 
        const conn = await mongoose.connect(process.env.URL,
         {
            useUnifiedTopology:true,
            useNewUrlParser:true,
            // useCreateIndex:true,
        })

        console.log(`mongodb connected:${conn.connection.host}`)
    } catch (error) {console.log(error)
        
    }
}

 connection()

//   const ent = User.insertMany([{"name":"Dhairya","phoneNumber":"9409177401","email":"dhairya303030@gmail.com","hobbies":"cycling"}])

 const app = express()
 app.use(cors())
 app.use(express.json())
 app.use('/api/users',userRoutes)
 app.get('/',(req,res)=>{
    res.send('Hello')

 })
 const port = 5000;
 app.listen(port,console.log("server is running"))