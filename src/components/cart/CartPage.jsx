import Cartitem from "./Cartitem"
import CartSummary from "./CartSummary"
import api from "../../api"
import { useEffect, useState } from "react"
import Spinner from "../ui/Spinner"
import useCartData from "../../hooks/useCartData"

const CartPage = ({setNumCartItems}) => {

  const {cartitems , setCartItems , cartTotal , setCartTotal , loading } = useCartData()

  if(loading){
    return <Spinner loading={loading} />
  }

  if(cartitems.length<1){
    return (<div className="alert alert-primary" role="alert">
      No Product in your cart....
      </div>
      )
  }

  return (
    <div className="container my-3 py-3" style={{height: "80vh", overflow: "scroll"}}>
        <h5 className='mb-4'>Shopping Cart</h5>
        <div className='row'>
            <div className="col-md-8">
              {cartitems.map(item => <Cartitem key={item.id} item={item} cartitems={cartitems} setCartTotal={setCartTotal} setNumCartItems={setNumCartItems} setCartItems={setCartItems} /> )}
                
            </div>
            <CartSummary cartTotal={cartTotal}/>
        </div>
    </div>
  )
}

export default CartPage