import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateID } from "../features/auth/authSlice";
import { updateToken} from "../features/auth/authSlice";
import Forms from "../components/Forms.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [uid, setUid] = useState(" ");
  const [token, setToken] = useState(" ");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("You submitted the form", formData);
    const data = {
      username: formData.username,
      password: formData.password,
    };

    fetch("http://localhost:3001/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          alert("Error logging in");
        }
        const responseData = await response.json();
      

        setUid(responseData.user_id);
        setToken(responseData.token);
        dispatch(updateID({ uid }));
        dispatch(updateToken({ token }));
        setUid(" ");
        setToken(" ");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="container-bg vw-100 vh-100 vw-100 p-0" fluid>
      <Container
        className="containerInner-bg m-0 vh-100 d-flex flex-row justify-content-center align-items-center"
        fluid
      >
        <Forms
          values={formData}
          handleChange={handleChange}
          submit={handleSubmit}
          type="login"
        />
      </Container>
    </Container>
  );
}

export default Login;
