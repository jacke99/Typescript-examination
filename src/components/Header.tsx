import React from "react";

type headerProps = {
  username: string;
};

export default function Header({ username }: headerProps) {
  return (
    <header>
      <h2>Strong n' Epic</h2>
      <span>Welcome {username}</span>
    </header>
  );
}
