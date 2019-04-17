import React from 'react';
import AppBar from '../Components/AppBar';
import Login from '../Components/Login';
import { useUser } from '../Hooks/UseUser';

export default function Home() {
  const { user } = useUser();

  return (
    <div>
      <AppBar />
      {
        user.name? <h1>{`Hello, ${user.name}`}</h1> : <Login />
      }
    </div>
  );
}
