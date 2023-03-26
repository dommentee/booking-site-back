import mongoose from "mongoose";

const {Schema, Document} = mongoose;

//create service interface
export interface Service {
    _id: mongoose.ObjectId,
    title: string,
    price: number,
    duration: number,
    description: string,
}



//service schema
const serviceSchema: mongoose.Schema = new Schema (
    {
        title: {
            type: String,
            required:[true, 'title is required'],
            maxlength: [30, 'title can not exceed 30 characters']
        },
        price: {
            type: Number,
            required: [true, 'price is required']
        },
        duration: {
            type: Number,
            required: [true, 'duration is required']
        },
        description: {
            type: String,
            maxlength: [300, 'descriptions can not exceed 300 characters' ]
        }

    }
)

export const Service = mongoose.model<Service>('Service', serviceSchema);

