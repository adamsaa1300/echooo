import "./Navbar.css";

import Search from "@mui/icons-material/Search";
import Notification from "@mui/icons-material/Notifications";
import Settings from "@mui/icons-material/Settings";
import Message from "@mui/icons-material/Message";
import Home from "@mui/icons-material/Home";
import Profile from "@mui/icons-material/Person";
import logo from "../../../../img/echoo_logo.png";

function Navbar() {
    return (
        <nav className="navbar">

            <div className="nav-logo">
                <img src={logo} alt="Echoo Logo" />
            </div>

            <ul className="navbar-links">
                <li><a href="#"><Home /></a></li>
                <li><a href="#"><Profile /></a></li>
                <li><a href="#"><Message /></a></li>
                <li><a href="#"><Notification /></a></li>
                <li><a href="#"><Settings /></a></li>
            </ul>

            <div className="navbar-search">
                <a href="#"><Search /></a>
            </div>

        </nav>
    );
}

export default Navbar;