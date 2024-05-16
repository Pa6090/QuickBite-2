import React, { useContext, useEffect, useState } from 'react'
import './Orders.css'
import { StoreContext } from '../../context/StoreContext.jsx'
import axios from 'axios'
import { assets } from '../../assets/assets.js'

export default function Orders() {
    const [data, setData] = useState([])
    const {backendUrl, token} = useContext(StoreContext)

    const fetchOrders = async(req, res) => {
        const resp = await axios.post(`${backendUrl}/api/order/getOrders`,{userId:localStorage.getItem('userId')}, {headers:{token}})
        setData(resp.data.data)
        console.log(resp)
    }

    useEffect(()=>{
        if(token){
            fetchOrders()
        }
    }, [token])

  return (
    <div className='my-orders'>
      <h2 className='container'>My Orders</h2>
      <div className='container'>
        {data.map((order, index) => {
          return (
            <div className='my-orders-order' key={index}>
              <img src={assets.parcel_icon} alt=''/>
              <p>{order.items.map((item, index) => {
                if(index===order.items.length-1){
                  return item.name + " x " + item.quantity
                }
                else{
                  return item.name + " x " + item.quantity + " ,"
                }
              })}</p>
              <p>Rs. {order.amount}.00</p>
              <p>Items : {order.items.length}</p>
              <p style={{color:'solid-black'}}>Order Delivered</p>
              <p>Order date: {order.timeStamps.slice(0,10)}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
