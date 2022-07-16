import express, {Request, Response} from "express";
import bcrypt, {hash, compare} from 'bcrypt'
import {User, IUser} from '../models/user'
import mongoose from "mongoose";
import {CreateAccessToken} from '../middleware/isAuth'
import{CreateRefreshToken} from '../middleware/isAuth'


const router = express.Router()

//user type 

export interface MyContext {
    req: Request;
    res: Response;
}

router.post('/register', (req, res) => {
    try{
        const {firstName, lastName, email, password} = req.body
        //check of inputs
        if(!firstName||!lastName||!email||!password) {
            return res.status(400).json({msg: "All field must be filled"})
        }
        

        //check password length 
        if(password.length < 5) {
            return res.status(400).json({msg: "password must be 5 characters or more"})

        }
        //compare passwords for confirmation

        //create user
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        User.create(req.body, (error: Error, createdUser: IUser) => {
            res.json(createdUser)
        })

    }catch(error) {
        console.log(error)
    }
    // req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    // User.create(req.body, (error: Error, createdUser: User) => {
    //     res.json(createdUser)
    // })
})


//route to login
router.post('/login', async (req,res) => {
    //Authenticate user
    try {
        const {email, password } = req.body
        const user = await User.findOne( {email: email}) 
        //if no user
        if(!user) {
            return res.status(400).json('invalid login')
        }
        //compare passwords 
        const valid = await compare(password, user.password)
        
        //if not valid 
        if(!valid) {
            return res.status(400).json('invalid user or password')
        }
         //sucessful login
        res.cookie("acess-token",CreateAccessToken(user), {httpOnly: true ,sameSite: "none", secure: true})
        res.cookie("refresh-token",CreateRefreshToken(user), {httpOnly: true ,sameSite: "none", secure: true})
        res.status(200).json({})
    

        
    }catch(error) {
        console.log(error);
        
    }
})


export default router