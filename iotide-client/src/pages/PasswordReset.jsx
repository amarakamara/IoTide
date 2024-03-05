import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

function PasswordReset() {
  const navigate = useNavigate();
  const { token } = useParams();

  console.log(token);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
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
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const data = {
      newPassword: formData.password,
    };

    if (token) {
      fetch(`http://localhost:3001/resetpassword/${token}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      })
        .then(async (response) => {
          if (!response.ok) {
            alert("Error Resetting Password");
            return;
          }
          const responseData = await response.json();

          const role = responseData.role;

          navigate(`/${role}/resetsuccessful`, {
            replace: true,
          });
        })
        .catch((err) => console.log(err));
    } else {
      alert("Token empty");
    }
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
            <Form.Group className="mb-3" controlId="newPasswordField">
              <div className="w-100 mt-2 d-flex flex-row justify-content-center">
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
                Create a new password
              </h4>
              <Form.Control
                onChange={handleChange}
                value={formData.password}
                name="password"
                required
                className="form-control"
                type="password"
                placeholder="new password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmNewPassword">
              <Form.Control
                onChange={handleChange}
                value={formData.confirmPassword}
                name="confirmPassword"
                required
                className="form-control"
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Group>
            <SubmitButton />
          </Form>
        </div>
      </Container>
    </Container>
  );
}

export default PasswordReset;
