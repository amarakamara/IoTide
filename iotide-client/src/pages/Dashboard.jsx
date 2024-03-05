import react from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function Dashboard(props) {

  const handleClick = (e)=>{
    

  }
  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin</p>
      <Button onClick={handleClick} variant="primary">
        <NavLink className="text-white" to="/">
          logout
        </NavLink>
      </Button>
    </div>
  );
}
