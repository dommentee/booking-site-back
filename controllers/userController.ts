import express, {json} from "express";
import bcrypt from 'bcrypt'
import {User} from '../models/user'
import mongoose from "mongoose";

const router = express.Router()

//user type 
export interface User {
    _id: mongoose.ObjectId
    firstName: string,
    lastName: string,
    email: string
    password: string,
    isAdmin: boolean
    authCount: number
}

router.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (error: Error, createdUser: User) => {
        res.json(createdUser)
    }).catch(
        error => {
            console.error
        }
    )
})

router.post('/', (req,res) => {
    User.findOne({email: req.body.email}, (error: Error, foundUser: User) => {
        if(error){
            console.log(error);
            
        }else if(!foundUser) {
            console.log('no such user');  
        }else {
            if(bcrypt.compareSync(req.body.password, foundUser.password)) {
                res.json(foundUser)
            }else {
                console.log('email and passes does not match');
            }
        }
    })
})

//find user 
export const findUserById = (id:number): Promise<User> => {
    return new Promise((resolve:(user: User) => void , reject) => {
            User.findOne({_id: id}, (error: Error, foundUser: User) => {
        if(error){
            console.log(error);
            
        }else if(!foundUser) {
            console.log('no such user');
            reject('not found')  
        }else {
            resolve(foundUser)
        }
    })

    }) 
}


export default router