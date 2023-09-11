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
    trainer: "Gertrude Trainersson",
    time: new Date("2023-09-30T20:30").toTimeString().substring(0, 5),
    date: new Date("2023-09-30T20:30").toISOString().split("T")[0],
    duration: 60,
  },
  {
    id: nanoid(),
    title: "Bodybuilding",
    trainer: "Arnold Schwarzenegger",
    time: new Date("2023-10-02T18:00").toTimeString().substring(0, 5),
    date: new Date("2023-10-02T18:00").toDateString(),
    duration: 120,
  },
  {
    id: nanoid(),
    title: "Yoga",
    trainer: "Yves Flexible",
    time: new Date("2023-10-02T09:00").toTimeString().substring(0, 5),
    date: new Date("2023-10-02T09:00").toDateString(),
    duration: 90,
  },
  {
    id: nanoid(),
    title: "Spinning",
    trainer: "Greta Spinnersson",
    time: new Date("2023-10-02T09:00").toTimeString().substring(0, 5),
    date: new Date("2023-10-02T09:00").toDateString(),
    duration: 90,
  },
  {
    id: nanoid(),
    title: "Karate",
    trainer: "Chuck Norris",
    time: new Date("2023-10-02T09:00").toTimeString().substring(0, 5),
    date: new Date("2023-10-02T09:00").toDateString(),
    duration: 90,
  },
  {
    id: nanoid(),
    title: "Jogging",
    trainer: "Usain Bolt",
    time: new Date("2023-10-02T09:00").toTimeString().substring(0, 5),
    date: new Date("2023-10-02T09:00").toDateString(),
    duration: 90,
  },
  {
    id: nanoid(),
    title: "Zumba",
    trainer: "Zoe Zumbason",
    time: new Date("2023-10-02T09:00").toTimeString().substring(0, 5),
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
      let body = JSON.parse(request.requestBody);
      if (body.id === "") {
        body.id = nanoid();
        workoutArray.push(body);
      } else {
        const workoutIndex = workoutArray.findIndex(
          (workout) => workout.id === body.id
        );
        workoutArray[workoutIndex] = body;
      }
      return { workouts: workoutArray };
    });

    this.post("/register", (schema, request) => {
      let body = JSON.parse(request.requestBody);
      const user = userArray.find((user) => user.name === body.name);
      if (user) {
        return new Response(400);
      } else {
        body.id = nanoid();
        body.role = "ADMIN";
        body.booked_workouts = [];
        userArray.push(body);
        return { users: body };
      }
    });

    this.put("/login", (schema, request) => {
      let body = JSON.parse(request.requestBody);

      const user = userArray.find(
        (user) => user.name === body.name && user.password === body.password
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

      return { user: userArray[userIndex] };
    });
    this.delete("/users", (schema, request) => {
      let body = JSON.parse(request.requestBody);
      const userIndex = userArray.findIndex((user) => user.id === body.userId);
      userArray.splice(userIndex, 1);
      return { users: userArray };
    });

    this.delete("/workouts", (schema, request) => {
      let body = JSON.parse(request.requestBody);
      const newArray = workoutArray.filter((workout) => {
        return workout.id !== body.workoutId;
      });
      return { workouts: newArray };
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
