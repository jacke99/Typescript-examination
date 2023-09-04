import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Server, Response } from "miragejs";
import { nanoid } from "nanoid";

let userArray = [
  { id: nanoid(), name: "Luke", password: "123", booked_workouts: [] },
  { id: nanoid(), name: "Leia", password: "123", booked_workouts: [] },
  { id: nanoid(), name: "Anakin", password: "123", booked_workouts: [] },
  { id: nanoid(), name: "Rey", password: "123", booked_workouts: [] },
];

const workoutArray = [
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
        return { users: user };
      } else {
        return new Response(400);
      }
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
