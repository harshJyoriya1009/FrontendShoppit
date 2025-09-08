import { useContext, useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post("register_user/", formData);

      // Save JWT tokens
      loginUser(res.data.access, res.data.refresh);

      // Save cart_code in localStorage for new user
      if (res.data.cart_code) {
        localStorage.setItem("cart_code", res.data.cart_code);
      }

      toast.success("Account created & logged in!");
      navigate("/"); // Redirect to homepage
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Registration failed!");
    }
  }

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-12">
          <label className="form-label">Address</label>
          <textarea
            name="address"
            className="form-control"
            rows="2"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="col-md-6">
          <label className="form-label">City</label>
          <input
            type="text"
            name="city"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">State</label>
          <input
            type="text"
            name="state"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
