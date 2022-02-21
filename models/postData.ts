import mongoose from "mongoose";
// import  testData  from "../helpers/types"


const postDataSchema = new mongoose.Schema(
    {
        id: Number,
        creator: String,
        testData: String

    }

)
const PostData = mongoose.model("PostData", postDataSchema);
module.exports = PostData