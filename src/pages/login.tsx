import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";

import { RootState } from "../store/store";

import "../css/pages/login.css";

import icon from "../assets/images/Icon.png";

import { AuthUserSchema } from "../schemas/schema";

import SnackBar from "../components/SnackBar/snackBar";
import FooterLogin from "../components/FooterLogin/footerLogin";

/**
 * Login page.
 * @returns {JSX.Element} Login Page.
 */

const Login: React.FC = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showSnackBar, setShowSnackBar] = useState(false);

  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const result = AuthUserSchema.safeParse({ userName: name, isLoggedIn });
    if (result.success) {
      dispatch(login(name));
    } else {
      setShowSnackBar(true);
      setError(result.error.errors[0].message);
      setTimeout(() => {
        setShowSnackBar(false);
      }, 3000);
      return;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/order");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <div className="loginContainer">
        <div className="loginContent">
          <img src={icon} alt="icon" width="150px" height="150px" />

          <div className="formContainer">
            <input
              type="text"
              placeholder="Insira um nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>

      <FooterLogin />

      {showSnackBar && <SnackBar message={error} show={showSnackBar} />}
    </>
  );
};

export default Login;
