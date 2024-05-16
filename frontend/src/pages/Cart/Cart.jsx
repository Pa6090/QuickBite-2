import React, { useContext, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const {cartItems, food_list, removeFromCart, getCartTotal} = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title mx-5'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        {/* <br />
        <hr /> */}
        {food_list.map((item, index)=>{
          if(cartItems[item._id]>0){
            return (
              <div className='cart-items-title cart-items-item mx-5'>
                <p>{item.category}</p>
                <p>{item.name}</p>
                <p>Rs.{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>Rs.{item.price * cartItems[item._id]}</p>
                <p style={{cursor:'pointer'}} onClick={()=>removeFromCart(item._id)}>
                  <button className='btn'> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-minus" viewBox="0 0 16 16">
                      <path d="M5.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5"/>
                      <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1"/>
                    </svg>
                  </button>
                </p>
              </div>
            )
          }
        })}
      </div>
      <div className='cart-bottom mx-5'>
        <div className='cart-total'>
          <h3>Total Cart Value</h3>
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
          <button onClick={()=>navigate('/placeorder')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className='cart-promocode'>
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type='text' placeholder='promo-code'></input>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}
