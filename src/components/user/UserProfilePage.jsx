import UserInfo from "./UserInfo"
import OrderHistoryIemContainer from "./OrderHistoryIemContainer"
import { useEffect, useState } from "react"
import api from "../../api"
import Spinner from "../ui/Spinner"

const UserProfilePage = () => {

  const [userInfo , setUserInfo] = useState({})
  const [orderitems , setOrderItems] = useState([])
  const [loading , setLoading] = useState(false)
 
  useEffect(function(){
    setLoading(true)
    api.get("user_info")
    .then(res => {
      console.log(res.data)
      setUserInfo(res.data)
      setOrderItems(res.data.items)
      setLoading(false)
    })
    .catch(err => {
      console.log(err.message)
      setLoading(false)
    }) 
  },[])

  if(loading){
    return <Spinner loading={loading}/>
  }

  return (
    <div className="container my-5">
        <UserInfo userInfo={userInfo}/>
        <OrderHistoryIemContainer orderitems={orderitems}/>
      
    </div>
  )
}

export default UserProfilePage
