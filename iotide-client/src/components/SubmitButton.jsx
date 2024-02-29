import React from "react";
import Button from "react-bootstrap/Button";

export default function SubmitButton() {
  return (
    <Button
      className="form-control text-white"
      type="submit"
      style={{ "--bs-border-opacity": 0.5 }}
      variant="secondary"
      size="md"
    >
      Submit
    </Button>
  );
}
