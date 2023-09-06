import fetchOptions from "../service/fetchService";
import { UserInterface, WorkoutInterface } from "../types/userInterface";

type WorkoutProps = {
  workouts: WorkoutInterface[];
  currentUser: UserInterface;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>;
};

export default function WorkoutElements({
  workouts,
  currentUser,
  setCurrentUser,
}: WorkoutProps) {
  async function bookWorkout(workoutId: string) {
    const BODY = {
      workoutId: workoutId,
      userId: currentUser.id,
    };

    const res = await fetch("/api/users/booking", fetchOptions("POST", BODY));
    const data = await res.json();
    setCurrentUser({
      ...currentUser,
      booked_workouts: data.user.booked_workouts,
    });
  }

  const workoutElements = workouts.map((workout) => {
    return (
      <div className="card" key={workout.id}>
        <h2>{workout.title}</h2>
        <p>Trainer: {workout.trainer}</p>
        <p>Date: {workout.date}</p>
        <p>Time: {workout.time}</p>
        <p>Duration: {workout.duration} min</p>
        <button className="workout-btn" onClick={() => bookWorkout(workout.id)}>
          Book workout
        </button>
      </div>
    );
  });
  return (
    <>
      <h3 className="workout-title">Book workout</h3>
      {workoutElements}
    </>
  );
}
