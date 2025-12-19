import { Link } from "react-router-dom";
import Icon from "../UI/Icons.js";
import { useAuth } from "../auth/useAuth.js";
import "./Header.css";

function Header() {
  // Initialisation ------------------------------
  const { loggedinUser } = useAuth();
  // State ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <header className="Header">
      <Link to="/">
        <Icon.Group />
      </Link>
      <Link to={"/"}>
        <h1>Office Connect</h1>
      </Link>
      {loggedinUser && (
        <div className="login">
          <p>{`Welcome ${loggedinUser.UserFirstName} (${loggedinUser.UserUserTypeName})`}</p>
        </div>
      )}
    </header>
  );
}

export default Header;
