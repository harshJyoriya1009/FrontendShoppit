import styles from "./LoginPage.module.css";
import { useContext, useState } from "react";
import Error from "../ui/Error";
import api from "../../api";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const LoginPage = () => {

  const {setIsAuthenticated, get_username} = useContext(AuthContext)

    const location = useLocation()
    const navigate = useNavigate()

      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const [loading , setLoading] = useState(false);
      const [error , setError] = useState("")

      const userInfo = {username , password}

      function handleSubmit(e){
         e.preventDefault()
         setLoading(true)
         
         api.post("token/", userInfo )
         .then(res => {
             console.log(res.data)
             localStorage.setItem("access" , res.data.access)
             localStorage.setItem("refresh" , res.data.refresh)
             setUsername("")
             setPassword("")
             setLoading(false)
             setIsAuthenticated(true)
             get_username()
             setError("")

             const from = location?.state?.from?.pathname || "/"; 
             navigate(from, { replace: true });
            })
            .catch(err => {
                console.log(err.message)
                setError(err.message)
                setLoading(false)
         })

      }

  return (
     <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className={`card shadow-lg p-4 ${styles.card}`}>
        <div
          className="card-header text-center"
          style={{ backgroundColor: "purple", color: "white" }}
        >
            {error && <Error error={error} />}
          <h4>Welcome...</h4>
        </div>

        <div className="card-body">
          <form
            onSubmit={handleSubmit}
          >
            {/* Username */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Enter username here"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter password here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Buttons */}
          <div className="d-flex justify-content-between mb-3">
            <button type="submit" disabled={loading} className="btn btn-primary w-50 me-2">
              Login
            </button>
            <Link to="/register_user" className="btn btn-outline-secondary w-50">
              Signup
            </Link>
          </div>


            {/* Forgot Password */}
            {/* <div className="text-center">
              <button
                type="button"
                className="btn btn-link text-decoration-none"
                style={{ color: "purple" }}
              >
                Forgot Password?
              </button>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
