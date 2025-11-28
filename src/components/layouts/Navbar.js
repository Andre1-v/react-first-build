import { NavLink } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  // Properties ----------------------------------
  // Hooks ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------

  const getLinkStyle = ({ isActive }) => (isActive ? "navSelected" : null);

  // View ----------------------------------------
  return (
    <nav>
      <div className="navItem">
        <NavLink to="/" className={getLinkStyle} exact>
          Home
        </NavLink>
      </div>
      <div className="navItem">
        <NavLink to="/login" className={getLinkStyle}>
          Login
        </NavLink>
      </div>
      <div className="navItem">
        <NavLink to="/myassignments" className={getLinkStyle} exact>
          MyAssigments
        </NavLink>
      </div>
      <div className="navItem">
        <NavLink to="/contact" className={getLinkStyle}>
          Contact us
        </NavLink>
      </div>
    </nav>
  );
}
export default Navbar;
