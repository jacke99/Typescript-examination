import React, { useEffect, useState } from "react";
import { UserInterface, WorkoutInterface } from "../types/userInterface";
import WorkoutCards from "../components/WorkoutCards";
import BookedWorkoutCards from "../components/BookedWorkoutCards";
import Header from "../components/Header";
import { Link } from "react-router-dom";

type homePageProps = {
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

export default function HomePage({
  currentUser,
  setCurrentUser,
}: homePageProps): JSX.Element {
  const [workouts, setWorkouts] = useState<WorkoutInterface[]>(defaultWorkout);
  const [toggle, setToggle] = useState<boolean>(false);
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
        <BookedWorkoutCards
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      ) : (
        <WorkoutCards
          workouts={workouts}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}
    </div>
  );
}
