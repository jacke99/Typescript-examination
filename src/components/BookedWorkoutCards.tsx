import React from "react";
import { UserInterface } from "../types/userInterface";
import fetchOptions from "../service/fetchService";

type BookedProps = {
  currentUser: UserInterface;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>;
};

export default function BookedElements({
  currentUser,
  setCurrentUser,
}: BookedProps): JSX.Element {
  async function cancelWorkout(workoutId: string): Promise<void> {
    const body = {
      workoutId: workoutId,
      userId: currentUser.id,
    };

    const res: Response = await fetch(
      "/api/users/booking",
      fetchOptions("DELETE", body)
    );
    const data = await res.json();
    setCurrentUser({
      ...currentUser,
      booked_workouts: data.user.booked_workouts,
    });
  }

  const workoutElements: JSX.Element[] = currentUser.booked_workouts?.map(
    (workout) => {
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
    }
  );
  return (
    <>
      <h3 className="booked-title">Your workouts</h3>
      {currentUser.booked_workouts.length > 0 ? (
        <div className="card-container">{workoutElements}</div>
      ) : (
        <h2 className="booked-status">You don't have any booked workouts</h2>
      )}
    </>
  );
}
