import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  updateID,
  updateToken,
  updateResetToken,
} from "../features/auth/authSlice";
import { setUserInfo } from "../features/user/userSlice";
import Forms from "../components/Forms.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [uid, setUid] = useState(" ");
  const [token, setToken] = useState(" ");
  const [resetToken, setResetToken] = useState(" ");
  const [userData, setUserData] = useState({});

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
    const data = {
      username: formData.username,
      password: formData.password,
    };

    fetch("http://localhost:3001/login", {
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

        const userInfo = {
          uid: responseData.userId,
          firstName: responseData.firstName,
          lastName: responseData.lastName,
          email: responseData.email,
          token: responseData.token,
        };
        setUid(userInfo.uid);
        setToken(userInfo.accessToken);
        setResetToken(userInfo.resetToken);
        setUserData(userInfo);

        dispatch(updateID({ uid }));
        dispatch(updateToken({ token }));
        dispatch(updateResetToken({ resetToken }));
        dispatch(setUserInfo({ userData }));
        setUid(" ");
        setToken(" ");
        navigate(`/dashboard/${userInfo.firstName.toLowerCase()}`, {
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
        <Forms
          values={formData}
          handleChange={handleChange}
          submit={handleSubmit}
          type="login"
          link="/admin/register"
        />
      </Container>
    </Container>
  );
}

export default AdminLogin;
