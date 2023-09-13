import React, { useState, useEffect } from "react";
import { UserInterface, WorkoutInterface } from "../types/userInterface";
import Header from "../components/Header";
import AdminUsersCards from "../components/AdminUsersCards";
import AdminWorkoutsCards from "../components/AdminWorkoutCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
type AdminProps = {
  currentUser: UserInterface;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>;
};

const defaultWorkout: WorkoutInterface[] = [
  {
    id: "",
    title: "",
    trainer: "",
    time: "",
    date: "",
    duration: 0,
  },
];

const defaultUser: UserInterface[] = [
  {
    id: "",
    name: "",
    password: "",
    role: "USER",
    booked_workouts: defaultWorkout,
  },
];

export default function AdminPage({
  currentUser,
  setCurrentUser,
}: AdminProps): JSX.Element {
  const [users, setUsers] = useState<UserInterface[]>(defaultUser);
  const [workouts, setWorkouts] = useState<WorkoutInterface[]>(defaultWorkout);
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((res) => setUsers(res.users));

    fetch("/api/workouts")
      .then((res) => res.json())
      .then((res) => setWorkouts(res.workouts));
  }, []);
  return (
    <div className="admin-wrapper">
      <Header username={currentUser.name} setCurrentUser={setCurrentUser} />
      <Link to={"/home"} className="admin-home-btn">
        {" "}
        <FontAwesomeIcon icon={faLeftLong} />
        Home page
      </Link>
      {toggle ? (
        <h2 className="admin-title">Admin page Workouts</h2>
      ) : (
        <h2 className="admin-title">Admin page Users</h2>
      )}
      <nav className="workout-nav">
        <button
          onClick={() => setToggle(false)}
          className={!toggle ? "active nav-btn" : "nav-btn"}
        >
          Users
        </button>
        <button
          onClick={() => setToggle(true)}
          className={toggle ? "active nav-btn" : "nav-btn"}
        >
          Workouts
        </button>
      </nav>
      {!toggle ? (
        <AdminUsersCards setUsers={setUsers} users={users} />
      ) : (
        <AdminWorkoutsCards workouts={workouts} setWorkouts={setWorkouts} />
      )}
    </div>
  );
}
