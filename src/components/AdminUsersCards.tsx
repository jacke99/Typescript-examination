import React, { useState } from "react";
import { UserInterface, WorkoutInterface } from "../types/userInterface";
import fetchOptions from "../service/fetchService";

type AdminUserProps = {
  users: UserInterface[];
  setUsers: React.Dispatch<React.SetStateAction<UserInterface[]>>;
};

export default function AdminUsers({
  users,
  setUsers,
}: AdminUserProps): JSX.Element {
  const [toggle, setToggle] = useState({});

  function toggleFunction(id: string): void {
    setToggle({
      ...toggle,
      [id]: !toggle[id as keyof typeof toggle],
    });
  }
  async function deleteUser(userId: string): Promise<void> {
    const body = { userId: userId };
    const res = await fetch("/api/users", fetchOptions("DELETE", body));
    const data = await res.json();
    setUsers(data.users);
  }

  function toggleUserWorkouts(
    array: WorkoutInterface[]
  ): JSX.Element | JSX.Element[] {
    const elements = array?.map((workout) => {
      return (
        <>
          <p>{workout.title}</p>
          <p>{workout.trainer}</p>
          <p>
            {workout.date} at: {workout.time}
          </p>
        </>
      );
    });
    if (elements.length > 0) {
      return elements;
    } else {
      return <p>User has no booked workouts</p>;
    }
  }
  const usersElement: JSX.Element[] = users.map((user) => {
    return (
      <div className="card" key={user.id}>
        <h2>{user.name}</h2>
        <p>User id: {user.id}</p>
        <p>Role: {user.role}</p>
        <div onClick={() => toggleFunction(user.id)}>
          <div className="workouts-toggle">
            Workouts
            {toggle[user.id as keyof typeof toggle] ? (
              <span>&#8593;</span>
            ) : (
              <span>&#8595;</span>
            )}
          </div>
          {toggle[user.id as keyof typeof toggle] &&
            toggleUserWorkouts(user.booked_workouts)}
        </div>

        <button onClick={() => deleteUser(user.id)} className="delete-user-btn">
          Delete user
        </button>
      </div>
    );
  });
  return <div className="card-container">{usersElement}</div>;
}
