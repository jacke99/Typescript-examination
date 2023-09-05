import { WorkoutInterface } from "../types/userInterface";

type WorkoutProps = {
  workouts: WorkoutInterface[];
};

export default function WorkoutElements({ workouts }: WorkoutProps) {
  const workoutElements = workouts.map((workout) => {
    return (
      <div className="card" key={workout.id}>
        <h2>{workout.title}</h2>
        <p>Trainer: {workout.trainer}</p>
        <p>Date: {workout.date}</p>
        <p>Time: {workout.time}</p>
        <p>Duration: {workout.duration} min</p>
        <button>Book workout</button>
      </div>
    );
  });
  return <>{workoutElements}</>;
}
