import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layouts/Layout.js";
import Home from "./components/pages/Home.js";
import SignIn from "./components/pages/SignIn.js";
import ContactUs from "./components/pages/ContactUs.js";
import PageNotFound from "./components/pages/404.js";
import MyAssignmets from "./components/pages/MyAssignments.js";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/myassignments" element={<MyAssignmets />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
