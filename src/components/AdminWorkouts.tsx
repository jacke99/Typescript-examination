import React, { useState } from "react";
import { WorkoutInterface } from "../types/userInterface";
import fetchOptions from "../service/fetchService";

type AdminWorkoutProps = {
  workouts: WorkoutInterface[];
  setWorkouts: React.Dispatch<React.SetStateAction<WorkoutInterface[]>>;
};

const defaultWorkout: WorkoutInterface = {
  id: "",
  title: "",
  trainer: "",
  time: "",
  date: "",
  duration: 0,
};

export default function AdminWorkouts({
  workouts,
  setWorkouts,
}: AdminWorkoutProps): JSX.Element {
  const [toggle, setToggle] = useState(false);
  const [inputValues, setInputValues] = useState(defaultWorkout);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setInputValues((previnputValues) => {
      return {
        ...previnputValues,
        [name]: value,
      };
    });
  }

  async function deleteWorkout(workoutId: string): Promise<void> {
    const body = { workoutId: workoutId };
    const res = await fetch("/api/workouts", fetchOptions("DELETE", body));
    const data = await res.json();
    setInputValues(defaultWorkout);
    setWorkouts(data.workouts);
    setToggle(false);
  }

  async function addWorkout(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const body = inputValues;
    const res = await fetch("/api/workouts", fetchOptions("POST", body));
    const data = await res.json();
    setWorkouts(data.workouts);
    setInputValues(defaultWorkout);
    alert("Workout added successfully!");
  }

  function editWorkout(workout: WorkoutInterface): void {
    setInputValues(workout);
    setToggle(true);
  }

  function closeEditWorkout(): void {
    setToggle(false);
    setInputValues(defaultWorkout);
  }

  const addWorkoutElement: JSX.Element = (
    <form onSubmit={addWorkout} className="new-workout-card">
      <div className="new-workout-header">
        {inputValues.id === "" ? <h2>Add workout</h2> : <h2>Edit workout</h2>}
        <span onClick={closeEditWorkout} className="new-workout-close">
          &#10006;
        </span>
      </div>

      <input
        onChange={handleChange}
        name="title"
        value={inputValues.title}
        type="text"
        placeholder="Title"
        required
      />
      <input
        onChange={handleChange}
        name="trainer"
        value={inputValues.trainer}
        type="text"
        placeholder="Trainer"
        required
      />
      <div>
        <input
          onChange={handleChange}
          name="date"
          value={inputValues.date}
          type="date"
          placeholder="Date"
          required
        />
        <input
          onChange={handleChange}
          name="time"
          value={inputValues.time}
          type="time"
          placeholder="Time"
          required
        />
      </div>

      <input
        onChange={handleChange}
        name="duration"
        value={inputValues.duration}
        type="number"
        placeholder="Duration"
        required
      />

      <div className="edit-btn-container">
        <button type="submit" className="new-workout-add">
          {inputValues.id === "" ? "Add workout" : "Save"}
        </button>

        {inputValues.id !== "" ? (
          <button
            type="button"
            onClick={() => deleteWorkout(inputValues.id)}
            className="delete-btn"
          >
            Delete
          </button>
        ) : (
          ""
        )}
      </div>
    </form>
  );

  const workoutElements: JSX.Element[] = workouts.map((workout) => {
    return (
      <div className="card" key={workout.id}>
        <div className="card-header">
          <h2>{workout.title}</h2>
          <span className="edit-btn" onClick={() => editWorkout(workout)}>
            &#9881;
          </span>
        </div>

        <p>Trainer: {workout.trainer}</p>
        <p>Date: {workout.date}</p>
        <p>Time: {workout.time}</p>
        <p>Duration: {workout.duration} min</p>
      </div>
    );
  });

  return (
    <>
      <button className="add-workout-btn" onClick={() => setToggle(true)}>
        Add new workout
      </button>
      {toggle && addWorkoutElement}
      <div className="card-container">{workoutElements}</div>
    </>
  );
}
