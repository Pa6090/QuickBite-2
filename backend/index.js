import express from 'express'
import cors from 'cors';
import connectdb from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import orderRouter from './routes/orderRoute.js';
import dotenv from 'dotenv';

dotenv.config()
const app = express()

app.get('/',(req, res)=>{
    res.send('Hi')
})

app.use(express.json())
app.use(cors({
            origin : ["https://quickbite-e26u.onrender.com"],
            methods : ["POST", "GET"],
            credentials : true
        })
)

// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","https://quickbite-e26u.onrender.com/");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// })

connectdb();

app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);
app.use('/images', express.static('uploads'))

app.listen(process.env.PORT, () => {
    console.log("Server connected on 3000")
})
