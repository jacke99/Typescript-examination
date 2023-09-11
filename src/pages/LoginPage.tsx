import React, { useState } from "react";
import fetchOptions from "../service/fetchService";
import { Link, useNavigate } from "react-router-dom";
import { LoginInterface, UserInterface } from "../types/userInterface";
import InputElements from "../components/InputElements";

const defaultLoginValues: LoginInterface = {
  name: "",
  password: "",
};

type UserProps = {
  setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>;
  errorMsg?: string;
};

export default function LoginPage({
  setCurrentUser,
  errorMsg,
}: UserProps): JSX.Element {
  const [inputValues, setInputValues] = useState(defaultLoginValues);
  const navigate = useNavigate();

  async function handleLoginClick() {
    const body = inputValues;

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

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setInputValues((previnputValues) => {
      return {
        ...previnputValues,
        [name]: value,
      };
    });
  }

  return (
    <div className="login-wrapper">
      <h1 className="login-title">Strong n' Epic</h1>
      <InputElements
        inputValue={inputValues}
        handleChange={handleChange}
        handleClick={handleLoginClick}
      />
      <p className="error-msg">{errorMsg}</p>
      <p className="link">
        Don't already have an account? Sign up <Link to="/register">here</Link>.
      </p>
    </div>
  );
}
