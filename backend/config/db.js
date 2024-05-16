import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()
const connectdb = async () => {
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to MongoDB")
        // const foodItemsData = await (await mongoose.connection.db.collection("food_items")).find({}).toArray();
        // const foodCategory = await (await mongoose.connection.db.collection("food_category")).find({}).toArray();
        // global.foodData = [foodItemsData, foodCategory]
    } catch(error){
        console.log(error)
    }
}
mongoose.connection.on("disconnected", ()=>{
    console.log("MongoDB disconnected !!")
})

mongoose.connection.on("connected", ()=>{
    console.log("Connected to MongoDB")
})

export default connectdb