import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Lead from "../components/Lead_source/Lead";
import Customer from "../components/Customer_information/Customer";
import Location from "../components/Location/Location";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lead />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/location" element={<Location />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
