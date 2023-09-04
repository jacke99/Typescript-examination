import { log } from "console";
import React, { useState } from "react";

interface LoginInterface {
  username: string;
  password: string;
}

const defaultLoginValues: LoginInterface = {
  username: "",
  password: "",
};

export default function LoginPage() {
  const [inputValue, setInputValues] = useState(defaultLoginValues);

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
    const fetchOption = {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await fetch("/api/login", fetchOption);
    if (res.status !== 400) {
      const data = await res.json();
      console.log(data);
    } else {
      alert("Wrong username or password");
    }
  }
  return (
    <div className="login-wrapper">
      <h1 className="login-title">Strong n' Epic</h1>
      <div className="login-container">
        <label htmlFor="username-field">Användarnamn</label>
        <input
          name="username"
          value={inputValue.username}
          type="text"
          className="username-field"
          onChange={handleChange}
        />
        <label htmlFor="password-field">Lösenord</label>
        <input
          name="password"
          value={inputValue.password}
          type="password"
          className="password-field"
          onChange={handleChange}
        />
        <button className="login-btn" onClick={handleLoginClick} type="submit">
          Logga in
        </button>
      </div>
    </div>
  );
}
