import { useContext,useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import login from "../assets/login.png";
import { AuthContext } from "./AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
      console.log("event triggered");
      const req = await axios.post("https://skillsync-8z4m.onrender.com/login",{
        email:formData.email,
        password:formData.password
      })
      dispatch({
        type: "LOGIN",
        payload: req.data.token,
      });
      localStorage.setItem("token", req.data.token);
      var isLoginSuccessful = req.data.loginStatus;
      if (isLoginSuccessful) {
        navigate("/");
      } else {
        alert(req.data.response);
      }
    }
    catch(err){
        console.log(err);
    }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        <div className="w-1/2 p-12">
          <h2 className="text-2xl font-bold text-center mb-4">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center space-y-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
            <button
              type="submit"
              className="w-full bg-teal-600 text-white p-2 rounded-md hover:bg-teal-500"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="w-1/2">
          <img
            src={login}
            alt="Registration Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
