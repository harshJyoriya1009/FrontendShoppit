import { useState } from "react"
import api , { BASE_URL } from "../../api"
import { toast } from "react-toastify"

const Cartitem = ({item , setCartTotal , cartitems , setNumCartItems , setCartItems}) => {

    const [quantity , setQuantity] = useState(item.quantity)
    const [loading , setLoading] = useState(false)

    const itemData = {quantity:quantity, item_id:item.id}
    const itemID = {item_id:item.id}

    function deleteCartitem(){
        const confirmDelete = window.confirm("Are you want to remove this product")

        if(confirmDelete){
            // api.post("delete_cartitem",itemID)
            // .then(res => {
            //     console.log(res.data)
            //     setCartItems(cartitems.filter(cartitem => cartitem.id != item.id))
            // })
            // .catch(err => {
            //     console.log(err.message)
            // })
            api.post("delete_cartitem/", itemID)
            .then(res => {
                console.log(res.data);
                toast.success("Item removed!");
                setCartItems(cartitems.filter(cartitem => cartitem.id !== item.id))
                setCartTotal(cartitems.filter((cartitem) => cartitem.id != item.id).reduce((acc,curr) => acc+curr.total, 0))
                setNumCartItems(cartitems.filter((cartitem) => cartitem.id != item.id).reduce((acc,curr) => acc+curr.quantity,0))
            })
            .catch(err => console.log(err.message));
        }
    }
    
    function updateCartitem(){
        setLoading(true)
        api.patch("update_quantity/", itemData)
        .then(res => {
            console.log(res.data)
            setLoading(false)
            toast.success("Cartitem successfully added..")
            setCartTotal(cartitems.map((cartitem) => cartitem.id === item.id ? res.data.data : cartitem).reduce((acc,curr) => acc+curr.total, 0))
            setNumCartItems(cartitems.map((cartitem) => cartitem.id === item.id ? res.data.data : cartitem).reduce((acc,curr) => acc+curr.quantity,0))
        })
        .catch(err => {
            console.log(err.message)
            setLoading(false)
        }) 
    } 

  return (
    <div className="col-md-12">
        <div className='cart-item d-flex align-items-center mb-3 p-3' style={{backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
            <img src={`${BASE_URL}${item.product.image}`} alt="Product Image" className='img-fluid' style={{width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px'}} />
            {/* <div className="ms-3 flex-glow-1">
                <h5 className="mb-1">Product Name</h5>
                <p className="mb-0 text-muted">1200</p>
            </div>
            <div className="d-flex align-items-center">
                <input type="number" className='form-control me-3' defaultvalue='1' style={{width:'70px'}} />
                <button className="btn btn-danger btn-sm">Remove</button>
            </div> */}

            <div className="d-flex justify-content-between align-items-center flex-grow-1 ms-3">
            <div>
                <h5 className="mb-1">{item.product.name}</h5>
                <p className="mb-0 text-muted">{`₹${item.product.price}`}</p>
            </div>

            <div className="d-flex align-items-center">
                <input 
                type="number" 
                className='form-control me-3' 
                min = "1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={{width:'70px'}} 
                />
                <button className="btn btn-sm mx-2" onClick={updateCartitem} style={{backgroundColor:"blue", color:"white", width:"66px"}} disabled={loading}>{loading ? "Adding" : "Add"}</button>
                <button className="btn btn-danger btn-sm" onClick={deleteCartitem}>Remove</button>
            </div>
            </div>

                </div>
            </div>
  )
}

export default Cartitem
