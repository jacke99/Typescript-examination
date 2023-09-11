import { useLocation } from "react-router-dom";
import { LoginInterface } from "../types/userInterface";

type InputProps = {
  inputValue: LoginInterface;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleClick: () => void;
};
export default function InputElements({
  inputValue,
  handleChange,
  handleClick,
}: InputProps): JSX.Element {
  const location = useLocation();

  return (
    <div className="login-container">
      <label htmlFor="username-field">Username</label>
      <input
        name="name"
        value={inputValue.name}
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
      <button className="login-btn" onClick={handleClick} type="submit">
        {location.pathname === "/register" ? "Sign up" : "Log in"}
      </button>
    </div>
  );
}
