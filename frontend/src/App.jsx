import {useContext} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import MyPath from "./components/MyPath";
import Assessment from "./components/Assessment";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import Footer from "./components/Footer";

import PrivateRoute from "./components/PrivateRoute";
import { AuthContext } from "./components/AuthContext";

const App = () => {
  const { user, dispatch } = useContext(AuthContext);
  
  console.log(user)

  return (
    <Router>
      <Nav/>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute user={user} />}>
          <Route path="/mypath" element={<MyPath />} />
          <Route path="/ass" element={<Assessment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
