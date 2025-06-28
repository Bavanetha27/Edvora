import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import signup from "../assets/signup.png"
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    specialization:"",
    role: "Student",
    company: "",
    experience: 0,
    level :""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
      const req = await axios.post("https://skillsync-8z4m.onrender.com/signup",{
        username: formData.username,
        email: formData.email,
        password: formData.password,
        specialization:formData.specialization,
        role:formData.role,
        company:formData.company,
        experience:formData.experience,
        level:formData.level
      })
      alert("signup successfull");
      if(req.data.signupStatus){
        navigate("/login");
      }
      else{
        navigate("/signup")
      }
    }
      catch(err){
        console.log(err);
      }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        <div className="w-1/2 p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
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
            <input
              type="text"
              name="specialization"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="Student">Student</option>
              <option value="Professional">Professional</option>
            </select>
            {formData.role === "Professional" && (
              <>
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
                <input
                  type="number"
                  name="experience"
                  placeholder="Years of Experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </>
            )}
            {formData.role === "Student" && (
              <>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="fresher">Fresher</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="expert">Expert</option>
                </select>
              </>
            )}
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
            src={signup}
            alt="Registration Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
