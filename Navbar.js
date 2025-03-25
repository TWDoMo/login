// Navbar.js
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">登入</Link>
      <Link to="/register">註冊</Link>
    </nav>
  );
};

export default Navbar;
