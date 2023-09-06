import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Server, Response } from "miragejs";
import { nanoid } from "nanoid";
import { UserInterface, WorkoutInterface } from "./types/userInterface";

const userArray: UserInterface[] = [
  {
    id: nanoid(),
    name: "Luke",
    password: "123",
    role: "ADMIN",
    booked_workouts: [],
  },
  {
    id: nanoid(),
    name: "Leia",
    password: "123",
    role: "USER",
    booked_workouts: [],
  },
  {
    id: nanoid(),
    name: "Anakin",
    password: "123",
    role: "USER",
    booked_workouts: [],
  },
  {
    id: nanoid(),
    name: "Rey",
    password: "123",
    role: "USER",
    booked_workouts: [],
  },
];

const workoutArray: WorkoutInterface[] = [
  {
    id: nanoid(),
    title: "Crossfit",
    trainer: "Gertrude trainersson",
    time: new Date("2023-09-30T20:30").toLocaleTimeString(),
    date: new Date("2023-09-30T20:30").toDateString(),
    duration: 60,
  },
  {
    id: nanoid(),
    title: "Gym with Arnold",
    trainer: "Arnold Schwarzenegger",
    time: new Date("2023-10-02T18:00").toLocaleTimeString(),
    date: new Date("2023-10-02T18:00").toDateString(),
    duration: 120,
  },
  {
    id: nanoid(),
    title: "Yoga",
    trainer: "Yves Flexible",
    time: new Date("2023-10-02T09:00").toLocaleTimeString(),
    date: new Date("2023-10-02T09:00").toDateString(),
    duration: 90,
  },
];

new Server({
  routes() {
    this.namespace = "api";
    this.get("/users", () => {
      return {
        users: userArray,
      };
    });
    this.get("/workouts", () => {
      return {
        workouts: workoutArray,
      };
    });

    this.post("/workouts", (schema, request) => {
      let attrs = JSON.parse(request.requestBody);
      attrs.id = nanoid();
      workoutArray.push(attrs);
      return { workouts: attrs };
    });

    this.post("/users", (schema, request) => {
      let attrs = JSON.parse(request.requestBody);
      attrs.id = nanoid();
      workoutArray.push(attrs);
      return { users: attrs };
    });

    this.put("/login", (schema, request) => {
      let body = JSON.parse(request.requestBody);

      const user = userArray.find(
        (user) => user.name === body.username && user.password === body.password
      );
      if (user) {
        return { user: user };
      } else {
        return new Response(400);
      }
    });

    this.post("/users/booking", (schema, request) => {
      let body = JSON.parse(request.requestBody);
      const workout = workoutArray.find(
        (workout) => workout.id === body.workoutId
      );
      console.log(workout);
      if (workout) {
        const userIndex = userArray.findIndex(
          (user) => user.id === body.userId
        );
        userArray[userIndex].booked_workouts.push(workout);
        return { user: userArray[userIndex] };
      } else {
        return new Response(400);
      }
    });
    this.delete("/users/booking", (schema, request) => {
      let body = JSON.parse(request.requestBody);
      const userIndex = userArray.findIndex((user) => user.id === body.userId);
      const workoutIndex = userArray[userIndex].booked_workouts.findIndex(
        (workout) => workout.id === body.workoutId
      );

      userArray[userIndex].booked_workouts.splice(workoutIndex, 1);
      console.log(userArray[userIndex].booked_workouts);

      return { user: userArray[userIndex] };
    });
    this.delete("/users", (schema, request) => {
      let body = JSON.parse(request.requestBody);
      const userIndex = userArray.findIndex((user) => user.id === body.userId);
      userArray.splice(userIndex, 1);
      return { users: userArray };
    });
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
