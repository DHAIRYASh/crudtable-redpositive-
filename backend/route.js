import express from 'express';
const router = express.Router()
import {getAllUsers,postUser,deleteUser,updateUser} from './controller.js'
router.get('/',getAllUsers)
router.post('/',postUser)
router.get('/delete/:id',deleteUser)
router.put('/update/:id',updateUser)
export default router