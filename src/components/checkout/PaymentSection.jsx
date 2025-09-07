import { useState } from "react"
import styles from "./PaymentSection.module.css"
import api from "../../api"

const PaymentSection = () => {

    const cart_code = localStorage.getItem("cart_code")
    const [loading , setLoading] = useState(false)

    function makePayment(){
        api.post("initiate_payment/", {cart_code})
        .then(res => {
            console.log(res.data)
            window.location.href = res.data.data.link
        })
        .catch(err => {
            console.log(err.message)
        })
    }

  return (
    <div className="col-md-4">
        <div className={`card ${styles.card}`}>
            <div className="card-header" style={{backgroundColor:"black", color:"white"}}>
                <h5>Payment option</h5>
            </div>
            <div className="card-body">
                {/* <button className={`btn btn-primary w-100 mb-3 ${styles.googlepayButton}`} id="googlepay-button">
                    <i className="bi bi-googlepay"></i> Pay with Google pay
                </button> */}

                <button className={`w-100 ${styles.phonepayButton}`} onClick={makePayment} id="phonepay-button">
                    <i className="bi bi-phonepay"></i>Pay with Flutterwave
                </button>
            </div>
        </div>
    </div>
  )
}

export default PaymentSection
