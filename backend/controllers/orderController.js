import order from '../models/orderModel.js'
import user from '../models/userModel.js'
// import Stripe from 'stripe'

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const placeOrder = async (req, res) => {
    try{
        const newOrder = new order({
            userId : req.body.userId,
            items : req.body.items,
            amount : req.body.amount,
            address : req.body.address
        })

        await newOrder.save()
        
        // const lineItems = req.body.items.map((item)=>({
        //     priceData : {
        //         currency : "INR",
        //         productData : {
        //             name : item.name,
        //         },
        //         unitAmount : item.price*100
        //     },
        //     quantity : item.quantity 
        // }))

        // lineItems.push({
        //     priceData : {
        //         currency : "INR",
        //         productData : {
        //             name : "Delivery Charges"
        //         },
        //         unitAmount : 80
        //     },
        //     quantity : 1
        // })
        
        // const session = await stripe.checkout.sessions.create({
        //     lineItems : lineItems,
        //     mode : 'payment',  
        // })

        res.json({success:true, message : "Record Inserted"})
    }catch(err){
        console.log(err)
        res.json({success:false,message:err})
    }
}

const getOrderByUserId = async (req, res) => {
    try{
        // console.log(req.body.userId)
        const resp = await order.find({userId:req.body.userId})
        res.json({success:true, data:resp})
    }catch(err){
        console.log(err)
        res.json({success:false, message:err})
    }
}

export {placeOrder, getOrderByUserId} 
