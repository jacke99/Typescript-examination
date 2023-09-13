import React, { useEffect, useState } from "react";
import { UserInterface, WorkoutInterface } from "../types/userInterface";
import WorkoutElements from "../components/WorkoutCards";
import BookedElements from "../components/BookedWorkoutCards";
import Header from "../components/Header";
import { Link } from "react-router-dom";

type currentUserProps = {
  currentUser: UserInterface;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>;
};

export default function HomePage({
  currentUser,
  setCurrentUser,
}: currentUserProps): JSX.Element {
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

  const [workouts, setWorkouts] = useState(defaultWorkout);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    fetch("/api/workouts")
      .then((res) => res.json())
      .then((res) => setWorkouts(res.workouts));
  }, []);

  return (
    <div className={!toggle ? "home-wrapper" : "home-wrapper booked"}>
      <Header username={currentUser.name} setCurrentUser={setCurrentUser} />
      {currentUser.role === "ADMIN" && (
        <Link className="admin-link" to="/admin">
          Admin page &#8594;
        </Link>
      )}
      <nav className="workout-nav">
        <button
          onClick={() => setToggle(false)}
          className={!toggle ? "active nav-btn" : "nav-btn"}
        >
          Book workout
        </button>
        <button
          onClick={() => setToggle(true)}
          className={toggle ? "active nav-btn" : "nav-btn"}
        >
          Your Workouts
        </button>
      </nav>
      {toggle ? (
        <BookedElements
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      ) : (
        <WorkoutElements
          workouts={workouts}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}
    </div>
  );
}
