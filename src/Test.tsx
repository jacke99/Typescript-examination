import React, { useEffect } from "react";

export default function Test() {
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((res) => console.log(res));

    fetch("/api/workouts")
      .then((res) => res.json())
      .then((res) => console.log(res));
  }, []);
  return <div>Test</div>;
}
