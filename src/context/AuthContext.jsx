import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { createContext, useState } from "react";
import api from "../api";


export const AuthContext = createContext(false)

export function AuthProvider({children}){
    const [isAuthenticated , setIsAuthenticated] = useState(false)
    const [username , setUsername]  = useState("")

    const handleAuth = () => {
        const token = localStorage.getItem("access")
        if(token){
            const decoded = jwtDecode(token)
            const expiry_date = decoded.exp
            const current_date = Date.now() / 1000
            if(expiry_date >= current_date){
                setIsAuthenticated(true)
            }
        }
    }

    function get_username(){
        api.get("get_username")
        .then(res => {
            setUsername(res.data.username)
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    function loginUser(access , refresh){
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        handleAuth();
        get_username();
    }


    useEffect(function(){
        handleAuth()
        get_username()
    },[])

    const authValue = {isAuthenticated , username , setIsAuthenticated, get_username, loginUser}

    return <AuthContext.Provider value={authValue}>
        {children}
    </AuthContext.Provider>
}
