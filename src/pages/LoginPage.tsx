import React, { useState } from "react";
import fetchOptions from "../service/fetchService";
import { Link, useNavigate } from "react-router-dom";
import { LoginInterface, UserInterface } from "../types/userInterface";

const defaultLoginValues: LoginInterface = {
  username: "",
  password: "",
};

type UserProps = {
  setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>;
  errorMsg?: string;
};

export default function LoginPage({ setCurrentUser, errorMsg }: UserProps) {
  const [inputValue, setInputValues] = useState(defaultLoginValues);
  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setInputValues((previnputValues) => {
      return {
        ...previnputValues,
        [name]: value,
      };
    });
  }

  async function handleLoginClick() {
    const body = inputValue;

    const res = await fetch(
      "/api/login",
      fetchOptions<LoginInterface>("PUT", body)
    );
    if (res.status !== 400) {
      const data = await res.json();
      setCurrentUser(data.user);
      navigate("/home");
    } else {
      alert("Wrong username or password");
    }
  }
  return (
    <div className="login-wrapper">
      <h1 className="login-title">Strong n' Epic</h1>
      <div className="login-container">
        <label htmlFor="username-field">Username</label>
        <input
          name="username"
          value={inputValue.username}
          type="text"
          className="username-field"
          onChange={handleChange}
        />
        <label htmlFor="password-field">Password</label>
        <input
          name="password"
          value={inputValue.password}
          type="password"
          className="password-field"
          onChange={handleChange}
        />
        <button className="login-btn" onClick={handleLoginClick} type="submit">
          Log in
        </button>
      </div>
      <p className="error-msg">{errorMsg}</p>
      <p className="link">
        Don't already have an account? Sign up <Link to="/register">here</Link>.
      </p>
    </div>
  );
}
