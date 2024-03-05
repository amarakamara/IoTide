import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const url = "http://localhost:3001";

export default function EmailVerified() {
  const { token, role } = useParams();

  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(url + `/verify/${token}`);
        if (response.ok) {
          setVerified(true);
        } else {
          throw new Error("Invalid or expired link.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    verifyEmail();
  }, [token]);

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
          {verified ? (
            <>
              <h1>Email Verified Successfully</h1>
              <p>
                Your Email Account is verified. You can now use your email to
                log in and access all the features of our platform
              </p>
              <Button>
                <NavLink to="/admin/login">Login</NavLink>
              </Button>
            </>
          ) : (
            <>
              <h1> Expired or Invalid Token</h1>
              <p>
                Your Email Account couldn't be verified. The token is either
                expired or invalid!
              </p>
              <Button>
                <NavLink to={`/${role}/login`}>Login</NavLink>
              </Button>
            </>
          )}
        </div>
      </Container>
    </>
  );
}
