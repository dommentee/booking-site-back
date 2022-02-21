import express, { json } from 'express';
const PostData =  require('../models/postData.ts')
const router = express.Router();


router.post('/', (req,res) => {
    PostData.create(req.body, (error: Error, createdData: any) => {
        res.json(createdData)
    })
})

router.get('/', (req,res) => {
    PostData.find({}, (erorr:any, foundPost: any) => {
        res.json(foundPost)
    })
})

export default router