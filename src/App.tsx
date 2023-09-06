import { useState } from "react";
import Test from "./Test";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { UserInterface } from "./types/userInterface";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";

const defaultUser: UserInterface = {
  id: "",
  name: "",
  password: "",
  role: "USER",
  booked_workouts: [],
};

function App() {
  const [currentUser, setCurrentUser] = useState(defaultUser);

  const errorMsg = "You need to be logged in to access the home page";
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginPage setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/home"
          element={
            currentUser.id !== "" ? (
              <HomePage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            ) : (
              <LoginPage setCurrentUser={setCurrentUser} errorMsg={errorMsg} />
            )
          }
        />
        <Route path="/test" element={<Test />} />
        <Route
          path="/admin"
          element={
            currentUser.role === "ADMIN" ? (
              <AdminPage currentUser={currentUser} />
            ) : (
              <HomePage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
