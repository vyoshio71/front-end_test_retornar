import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useSelector } from "react-redux";

import { RootState } from "./store/store";

import "./App.css";

import OrderSteps from "./pages/orderSteps";
import Login from "./pages/login";

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/order/*"
          element={isLoggedIn ? <OrderSteps /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
