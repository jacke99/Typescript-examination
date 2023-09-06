import React from "react";
import { UserInterface } from "../types/userInterface";

type BookedProps = {
  currentUser: UserInterface;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>;
};

export default function BookedElements({
  currentUser,
  setCurrentUser,
}: BookedProps) {
  async function cancelWorkout(workoutId: string) {
    const BODY = {
      workoutId: workoutId,
      userId: currentUser.id,
    };

    const res = await fetch("/api/users/booking", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(BODY),
    });
    const data = await res.json();
    setCurrentUser({
      ...currentUser,
      booked_workouts: data.user.booked_workouts,
    });
  }

  const workoutElements = currentUser.booked_workouts?.map((workout) => {
    return (
      <div className="card" key={workout.id}>
        <h2>{workout.title}</h2>
        <p>Trainer: {workout.trainer}</p>
        <p>Date: {workout.date}</p>
        <p>Time: {workout.time}</p>
        <p>Duration: {workout.duration} min</p>
        <button
          className="booked-btn"
          onClick={() => cancelWorkout(workout.id)}
        >
          Cancel
        </button>
      </div>
    );
  });
  return (
    <>
      <h3 className="booked-title">Your workouts</h3>
      {currentUser.booked_workouts.length > 0 ? (
        workoutElements
      ) : (
        <h2 className="booked-status">You don't have any booked workouts</h2>
      )}
    </>
  );
}