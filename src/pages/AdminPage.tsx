import React, { useState, useEffect } from "react";
import { UserInterface, WorkoutInterface } from "../types/userInterface";
import Header from "../components/Header";
import AdminUsers from "../components/AdminUsers";
import AdminWorkouts from "../components/AdminWorkouts";

type AdminProps = {
  currentUser: UserInterface;
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

export default function AdminPage({ currentUser }: AdminProps) {
  const [users, setUsers] = useState(defaultUser);
  const [workouts, setWorkouts] = useState(defaultWorkout);
  const [toggle, setToggle] = useState(false);

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
      <Header username={currentUser.name} />
      <button className="admin-home-btn">&#8592; Home page</button>
      <h2 className="admin-title">Admin page</h2>
      {!toggle ? (
        <AdminUsers setUsers={setUsers} users={users} />
      ) : (
        <AdminWorkouts workouts={workouts} setWorkouts={setWorkouts} />
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
    </div>
  );
}
