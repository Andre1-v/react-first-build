import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/useAuth.js";
import Layout from "./components/layouts/Layout.js";
import Home from "./components/pages/Home.js";
import FauxLogin from "./components/pages/FauxLogin.js";
import ContactUs from "./components/pages/ContactUs.js";
import PageNotFound from "./components/pages/404.js";
import MyAssignmets from "./components/pages/MyAssignments.js";
import MyTickets from "./components/pages/MyTickets.js";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/myassignments" element={<MyAssignmets />} />
            <Route path="/mytickets" element={<MyTickets />} />
            <Route path="/login" element={<FauxLogin />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
