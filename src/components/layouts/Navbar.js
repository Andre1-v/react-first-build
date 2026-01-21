import { NavLink } from "react-router-dom";
import Icon from "../UI/Icons.js";
import { useAuth } from "../auth/useAuth.js";
import "./Navbar.css";

function Navbar() {
  const { loggedinUser } = useAuth();

  const getLinkStyle = ({ isActive }) => (isActive ? "active" : "");

  return (
    <div className="navbar">
      <NavLink to="/" className={getLinkStyle} end>
        <Icon.Home /> Home
      </NavLink>
      <NavLink to="/login" className={getLinkStyle}>
        <Icon.Login /> Login
      </NavLink>
      <NavLink to="/mytickets" className={getLinkStyle}>
        <Icon.Ticket /> MyTickets
      </NavLink>
      <NavLink to="/jobs" className={getLinkStyle}>
        <Icon.Job /> Jobs
      </NavLink>
      <NavLink to="/myassignments" className={getLinkStyle}>
        <Icon.Assignment /> MyAssignments
      </NavLink>
      <NavLink to="/contact" className={getLinkStyle}>
        <Icon.Contact /> Contact
      </NavLink>
      {loggedinUser && (
        <div className="navbar-right">
          <span>
            {`Welcome ${loggedinUser.UserFirstName} (${loggedinUser.UserUserTypeName})`}
          </span>
        </div>
      )}
    </div>
  );
}

export default Navbar;
