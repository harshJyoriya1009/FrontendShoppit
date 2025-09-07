import {Link} from "react-router-dom"

const CartSummary = ({cartTotal}) => {

    const subTotal = cartTotal.toFixed(2)
    const total = subTotal

  return (
    <div className="col-md-4 align-self-start">
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Cart Summary</h5>
                <hr />
                {/* <div className="d-flex justify-content-between">
                    <span>Subtotal:</span>
                    <span>400</span>
                </div>
                <div className="d-flex justify-content-between">
                    <span>Tax:</span>
                    <span>200</span>
                </div> */}
                <div className="d-flex justify-content-between mb-3">
                    <span>Total:</span>
                    <strong>{`₹${total}`}</strong>
                </div>
                <Link to="/checkout">
                <button className='btn btn-primary w-100' style={{backgroundColor:'#0650DC', borderColor: '#0650DC'}}>Procceed to checkout</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default CartSummary

