import React from "react";
import LoginForm from "../components/LoginForm.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  return (
    <Container>
      <Row>
        <Col>
          <LoginForm />
        </Col>
        <Col>
          <h1>An Image</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
