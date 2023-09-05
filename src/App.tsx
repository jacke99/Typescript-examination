import React, { useState } from "react";
import Test from "./Test";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { UserInterface } from "./types/userInterface";
import HomePage from "./pages/HomePage";

const defaultUser: UserInterface = {
  id: "",
  name: "",
  password: "",
  role: "USER",
  booked_workouts: [],
};

function App() {
  const [currentUser, setCurrentUser] = useState(defaultUser);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginPage setCurrentUser={setCurrentUser} />}
        />
        <Route path="/home" element={<HomePage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
