import React from "react";
import { Container } from "react-bootstrap";

export default function VerifyEmail() {
  return (
    <>
      <Container
        className="d-flex flex-row justify-content-center align-items-center bg-primary vh-100"
        variant="primary"
        fluid
      >
        <div className="text-white w-50 text-center">
          <div className="d-flex align-items-center justify-content-center">
            <div
              className="rounded-circle overflow-hidden"
              style={{
                width: "150px",
                height: "150px",
                border: "2px solid #fff",
              }}
            >
              <img
                src={
                  "https://img.freepik.com/free-vector/email-campaign-concept-illustration_114360-1633.jpg?size=626&ext=jpg&ga=GA1.1.228804938.1708005014&semt=sph"
                }
                alt="email"
                className="img-fluid w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <h1>Verification Email Sent</h1>
          <p>
            We have sent a verification email to your registered email address.
            Please click on the provided link in that email to verify your
            account and activate your account.
          </p>
        </div>
      </Container>
    </>
  );
}
