import React from "react";
import AppBar from "../Components/AppBar";
import Login from "../Components/Login";
import Main from "../Views/Main";

import { useUser } from "../Hooks/UseUser";

export default function Home() {
  const { user } = useUser();

  return (
    <div>
      <AppBar />
      {user.name ? <Main /> : <Login />}
    </div>
  );
}
