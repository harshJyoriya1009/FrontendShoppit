import OrderSummary from "./OrderSummary"
import PaymentSection from "./PaymentSection"
import useCartData from "../../hooks/useCartData"

const CheckOutPage = () => {

  const {cartitems , setCartItems , cartTotal , setCartTotal , loading } = useCartData()

  return (
    <div className="container my-3">
        <div className="row">
            <OrderSummary cartitems={cartitems} cartTotal={cartTotal} />
            <PaymentSection />
        </div>
    </div>
  )
}

export default CheckOutPage