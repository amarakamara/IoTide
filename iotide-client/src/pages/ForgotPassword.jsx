import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateID } from "../features/auth/authSlice";
import { updateToken } from "../features/auth/authSlice";
import { setUserInfo } from "../features/user/userSlice";
import SubmitButton from "../components/SubmitButton.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: formData.username,
    };

    fetch("http://localhost:3001/forgotpassword", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          alert("Error logging in");
        }
        navigate(`/resetpassword`, {
          replace: true,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="container-bg vw-100 vh-100 vw-100 p-0" fluid>
      <Container
        className="containerInner-bg m-0 vh-100 d-flex flex-row justify-content-center align-items-center"
        fluid
      >
        <div
          className="p-3 bg-primary rounded glassy-border"
          style={{ width: "350px" }}
        >
          <Form onSubmit={handleSubmit}>
            <div className="w-100 mt-1 d-flex flex-row justify-content-center">
              <img
                style={{
                  alignSelf: "center",
                  width: "10%",
                }}
                src="../public/assets/logo.png"
                alt="logoImage"
              />
            </div>
            <h4 className="text-white fs-6 text-center mb-3 mt-2">
              Enter your email to reset your password
            </h4>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                onChange={handleChange}
                value={FormData.username}
                name="username"
                required
                className="form-control"
                type="email"
                placeholder="email"
              />
            </Form.Group>
            <SubmitButton />
          </Form>
        </div>
      </Container>
    </Container>
  );
}

export default ForgotPassword;
