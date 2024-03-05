import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SubmitButton from "./SubmitButton";

function Forms(props) {
  return (
    <div
      className="p-3 bg-primary rounded glassy-border"
      style={{ width: "350px" }}
    >
      <Form onSubmit={props.submit} className="mx-2">
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
        <h2
          className="text-white text-center mt-2 mb-3 fs-5"
          style={{ fontWeight: "bolder" }}
        >
          {props.type == "login" ? "Login" : "Registration"}
        </h2>
        {props.type === "login" ? (
          " "
        ) : (
          <>
            <Form.Group className="mb-3 " controlId="formBasicFirstName">
              <Form.Control
                onChange={props.handleChange}
                value={props.values.fName}
                name="fName"
                className="form-control"
                type="text"
                placeholder="First name"
              />
            </Form.Group>
            <Form.Group className="mb-3 w-100" controlId="formBasicLastName">
              <Form.Control
                onChange={props.handleChange}
                value={props.values.lName}
                name="lName"
                className="form-control"
                type="text"
                placeholder="Last name"
              />
            </Form.Group>
          </>
        )}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            onChange={props.handleChange}
            value={props.values.username}
            name="username"
            required
            className="form-control"
            type="email"
            placeholder="email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            onChange={props.handleChange}
            value={props.values.password}
            name="password"
            required
            className="form-control"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <SubmitButton />
        <div className="d-flex flex-row justify-content-center align-items-center mt-2">
          <h4 className="text-white  fs-6">
            {props.type === "login"
              ? "Don't have an account?"
              : "Already have an account?"}

            <NavLink to={props.link} className=" m-1">
              {props.type === "login" ? "Register" : "Login"}
            </NavLink>
          </h4>
          <h4
            className="text-white mx-1"
            style={{ fontWeight: "light", fontSize: "0.89rem" }}
          >
            {props.type === "login" ? "|" : " "}
          </h4>
          <h4 className="text-white  fs-6">
            <NavLink to={"/forgotpassword"} className=" m-1">
              {props.type === "login" ? "Forgot password?" : " "}
            </NavLink>
          </h4>
        </div>
      </Form>
    </div>
  );
}

export default Forms;
