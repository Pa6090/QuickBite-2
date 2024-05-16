import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

export default function PlaceOrder() {
  const {token,backendUrl,food_list,cartItems,getCartTotal} = useContext(StoreContext)
  const [data, setData] = useState({
    firstName : "",
    lastName : "",
    email : "",
    street : "",
    city : "",
    state : "",
    zipcode : "",
    country : "",
    contact : ""
  })

  const navigate = useNavigate()

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData(data => ({...data, [name]:value}))
  }
  
  const placeOrder = async (event) => {
    event.preventDefault();
    const orderItems = [];
    food_list.map((item)=>{
      if (cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo.quantity = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })

    let orderData = {
      userId : localStorage.getItem('userId'),
      address : data,
      items : orderItems,
      amount : getCartTotal()+80
    }

    let resp = await axios.post(`${backendUrl}/api/order/placeOrder`, orderData, {headers:{token}})
    if(resp.data.success){
      console.log(resp.data)
      navigate('/listorders')
    }else{

    }
  }

  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }else if(getCartTotal()===0){
      navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order mx-5'>
      <div className='place-order-left'>
        <p className='title'>
          Delivery Information
        </p>
        <div className='multi-fields'>
          <input required name='firstName' value={data.firstName} onChange={onChangeHandler} type='text' placeholder='First Name'/>
          <input required name='lastName' value={data.lastName} onChange={onChangeHandler} type='text' placeholder='Last Name'/>
        </div>
        <input required name='email'  value={data.email} onChange={onChangeHandler} type='text' placeholder='Email Address'/>
        <input required name='street' value={data.street} onChange={onChangeHandler} type='text' placeholder='Street'/>
        <div className='multi-fields'>
          <input required name='city' value={data.city} onChange={onChangeHandler} type='text' placeholder='City'/>
          <input required name='state' value={data.state} onChange={onChangeHandler} type='text' placeholder='State'/>
        </div>
        <div className='multi-fields'>
          <input required name='zipcode' value={data.zipcode} onChange={onChangeHandler} type='text' placeholder='Zip Code'/>
          <input required name='country' value={data.country} onChange={onChangeHandler} type='text' placeholder='Country'/>
        </div>
        <input required name='contact' value={data.contact} onChange={onChangeHandler} type='text' placeholder='Contact Number'/>
      </div>
      <div className='place-order-right'>
      `<div className='cart-total'>
          <h3 className='mb-5'>Total Cart Value</h3>
          <div className='cart-total-details'>
            <p>Subtotal</p>
            <p>{getCartTotal()}</p>
          </div>
          <div className='cart-total-details'>
            <p>Delivery Fee</p>
            {getCartTotal()>0 ? <p>Rs.{80}</p> : <p>Rs.{0}</p>}
            
          </div>
          <div className='cart-total-details'>
            <p>Total</p>
            {getCartTotal()>0 ? <p>Rs.{getCartTotal()+80}</p> : <p>Rs.{0}</p>}
          </div>
          <button type='submit'>PLACE ORDER</button>
        </div>`
      </div>
    </form>
  )
}
