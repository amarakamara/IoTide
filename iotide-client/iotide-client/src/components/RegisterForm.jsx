import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SubmitButton from "./SubmitButton";

function RegisterForm() {
  return (
    <div
      className="p-3 bg-primary rounded glassy-border"
      style={{ width: "350px" }}
    >
      <Form>
        <h2
          className="text-white text-center mt-2 mb-3 fs-5"
          style={{ fontWeight: "bolder" }}
        >
          Admin Registration
        </h2>
        <Form.Group className="mb-3 " controlId="formBasicText">
          <Form.Control
            className="form-control"
            type="text"
            placeholder="First name"
          />
        </Form.Group>
        <Form.Group className="mb-3 w-100" controlId="formBasicText">
          <Form.Control
            className="form-control"
            type="text"
            placeholder="Last name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            className="form-control"
            type="email"
            placeholder="email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            className="form-control"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <SubmitButton />
        <h4 className="text-white text-center mt-2 fs-6 inline">
          Already have an account?{" "}
          <a className="inline fs-6" href="#">
            Login
          </a>
        </h4>
      </Form>
    </div>
  );
}

export default RegisterForm;
