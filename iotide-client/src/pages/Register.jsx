import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Forms from "../components/Forms.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import validator from "validator";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    username: "",
    password: "",
  });

  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));

    if (name === "username") {
      setIsValidEmail(validator.isEmail(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstName: formData.fName,
      lastName: formData.lName,
      username: formData.username,
      password: formData.password,
    };

    fetch("http://localhost:3001/register", {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          navigate("/verifyemail", { replace: true });
        } else {
          alert("Error in registration");
        }
      })
      .catch((error) => {
        alert(`Error: ${error}`);
      });

    setFormData("");
  };

  return (
    <Container className="container-bg vw-100 vh-100 vw-100 p-0" fluid>
      <Container
        className="containerInner-bg m-0 vh-100 d-flex flex-row justify-content-center align-items-center"
        fluid
      >
        <Forms
          values={formData}
          submit={handleSubmit}
          handleChange={handleChange}
          type="register"
        />
      </Container>
    </Container>
  );
}

export default Register;
