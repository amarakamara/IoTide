import { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <h2>Home</h2>
      <Button variant="primary">
        <NavLink className="text-white" to="/admin/login">
          Admin Login
        </NavLink>
      </Button>
      <Button variant="primary">
        <NavLink className="text-white" to="/admin/register">
          Admin Registration
        </NavLink>
      </Button>
    </>
  );
}

export default App;
