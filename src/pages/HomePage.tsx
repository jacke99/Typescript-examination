import React, { useEffect, useState } from "react";
import { WorkoutInterface } from "../types/userInterface";
import WorkoutElements from "../components/WorkoutElements";

export default function HomePage() {
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
  useEffect(() => {
    fetch("/api/workouts")
      .then((res) => res.json())
      .then((res) => setWorkouts(res.workouts));
  }, []);

  return (
    <div className="home-wrapper">
      <nav className="workout-nav">
        <button className="nav-btn">Book workout</button>
        <button className="nav-btn">Your Workouts</button>
      </nav>
      <WorkoutElements workouts={workouts} />
    </div>
  );
}
