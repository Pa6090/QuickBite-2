import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    timestamps : {
        type : Date,
        default : Date.now(),
        required : true
    }
})

export default mongoose.model("food", foodSchema)