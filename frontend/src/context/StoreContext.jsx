import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [cartItems, setCartitems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([])
    const backendUrl = 'http://localhost:3000'

    const addToCart = (itemId) => {
        if(!cartItems[itemId]){
            setCartitems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartitems((prev)=>({...prev, [itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart = (itemId) => {
        setCartitems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }   

    const getCartTotal = () => {
        let totalAmount = 0
        for(const i in cartItems){
            console.log(i,'>>>')
            if(cartItems[i]>0){
                let itemInfo = food_list.find((p)=>p._id===i)
                console.log(itemInfo)
                totalAmount += (itemInfo.price * cartItems[i])
            }
        }
        return totalAmount
    }

    const fetchFoodList = async () => {
        const resp = await axios.get(`${backendUrl}/api/food/getFoodItems`)
        setFoodList(resp.data.data)
    }

    useEffect(()=>{
        const loadData = async () => {
            fetchFoodList()
            if (localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
            }
        }
        loadData()
    },[])

    const contextValue = {
        food_list, cartItems, backendUrl, token, setToken, setCartitems, addToCart, removeFromCart, getCartTotal
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider