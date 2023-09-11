import React, { useState } from "react";
import InputElements from "../components/InputElements";
import { LoginInterface, UserInterface } from "../types/userInterface";
import { Link, useNavigate } from "react-router-dom";
import fetchOptions from "../service/fetchService";

type UserProps = {
  setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>;
  errorMsg?: string;
};

const defaultRegisterValues: LoginInterface = {
  name: "",
  password: "",
};
export default function RegisterPage(): JSX.Element {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState(defaultRegisterValues);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setInputValues((previnputValues) => {
      return {
        ...previnputValues,
        [name]: value,
      };
    });
  }

  async function handleRegisterClick(): Promise<void> {
    const body = inputValues;

    const res = await fetch(
      "/api/register",
      fetchOptions<LoginInterface>("POST", body)
    );
    const data = await res.json();
    navigate("/");
    alert(`Welcome to Strong n' Epic ${data.users.name}!`);
  }

  return (
    <div className="register-wrapper">
      <h1 className="login-title">Strong n' Epic</h1>
      <InputElements
        inputValue={inputValues}
        handleChange={handleChange}
        handleClick={handleRegisterClick}
      />
      <p className="link">
        Already have an account? Log in <Link to="/">here</Link>.
      </p>
    </div>
  );
}
