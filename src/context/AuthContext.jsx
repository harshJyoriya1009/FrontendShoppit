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


    useEffect(function(){
        handleAuth()
        get_username()
    },[])

    const authValue = {isAuthenticated , username , setIsAuthenticated, get_username}

    return <AuthContext.Provider value={authValue}>
        {children}
    </AuthContext.Provider>
}


// import { jwtDecode } from "jwt-decode";
// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext({});

// export function AuthProvider({ children }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [username , setUsername]  = useState("")
//   const [user, setUser] = useState(null);

//   const handleAuth = () => {
//     const token = localStorage.getItem("access");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         const expiry_date = decoded.exp;
//         const current_date = Date.now() / 1000;

//         if (expiry_date >= current_date) {
//           setIsAuthenticated(true);
//           setUser({ username: decoded.username }); // 👈 assuming token has `username`
//         } else {
//           setIsAuthenticated(false);
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("Invalid token", error);
//         setIsAuthenticated(false);
//         setUser(null);
//       }
//     } else {
//       setIsAuthenticated(false);
//       setUser(null);
//     }
//   };

//   function get_username(){
//     api.get("get_username")
//     .then(res => {
//         setUsername(res.data.username)
//     })
//     .catch(err => {
//         console.log(err.message)
//     })
//   }

//   useEffect(() => {
//     handleAuth();
//   }, []);

//   const authValue = { isAuthenticated, setIsAuthenticated, user, setUser };

//   return (
//     <AuthContext.Provider value={authValue}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
