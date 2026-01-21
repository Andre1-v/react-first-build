import Modal from "../UI/Modal.js";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import "./Layout.css";

export default function Layout({ children }) {
  // Properties ----------------------------------
  // Hooks ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <Modal.Provider>
      <div className="Layout">
        <div className="StickyHeader">
          <Navbar />
        </div>
        <main className="Layout">{children}</main>
        <Footer />
      </div>
    </Modal.Provider>
  );
}
