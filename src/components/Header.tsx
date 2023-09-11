import React from "react";
import { UserInterface } from "../types/userInterface";
import { defaultUser } from "../App";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

type headerProps = {
  username: string;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>;
};

export default function Header({
  username,
  setCurrentUser,
}: headerProps): JSX.Element {
  const navigate = useNavigate();
  function logOut(): void {
    setCurrentUser(defaultUser);
    navigate("/");
  }
  return (
    <header>
      <h2>Strong n' Epic</h2>
      <div className="header-container">
        <span>Welcome {username}</span>
        <button onClick={logOut}>
          Log out <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </button>
      </div>
    </header>
  );
}
