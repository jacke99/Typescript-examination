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
}: WorkoutProps): JSX.Element {
  async function bookWorkout(workoutId: string): Promise<void> {
    const BODY = {
      workoutId: workoutId,
      userId: currentUser.id,
    };

    const res: Response = await fetch(
      "/api/users/booking",
      fetchOptions("POST", BODY)
    );
    const data = await res.json();
    setCurrentUser({
      ...currentUser,
      booked_workouts: data.user.booked_workouts,
    });
    alert("Workout booked successfully!");
  }

  function checkIfBooked(obj: WorkoutInterface): boolean {
    const isBooked = currentUser.booked_workouts.some(
      (workout) =>
        // Compare the properties you want to check for equality here
        workout.id === obj.id && workout.title === obj.title
    );

    return isBooked;
  }

  const workoutElements: JSX.Element[] = workouts.map((workout) => {
    if (currentUser.booked_workouts.some((value) => value.id === workout.id)) {
      console.log("true");
    } else {
      console.log("false");
    }

    return (
      <div className="card" key={workout.id}>
        <div className="card-header">
          <h2>{workout.title}</h2>
          {checkIfBooked(workout) ? (
            <p className="booked-workout">Already booked</p>
          ) : (
            ""
          )}
        </div>

        <p>Trainer: {workout.trainer}</p>
        <p>Date: {workout.date}</p>
        <p>Time: {workout.time}</p>
        <p>Duration: {workout.duration} min</p>
        <button
          disabled={checkIfBooked(workout)}
          className="workout-btn"
          onClick={() => bookWorkout(workout.id)}
        >
          Book workout
        </button>
      </div>
    );
  });
  return <div className="card-container">{workoutElements}</div>;
}
