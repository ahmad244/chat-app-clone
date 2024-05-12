import React, { useState } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import "@fortawesome/fontawesome-free/css/all.css";
import { useNavigate } from "react-router-dom";

import "../css/register.css";
import { RegisterUser } from "../api/user";
import { loginSuccess } from "../redux/userRedux";
import { useDispatch } from "react-redux";


export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // console.log({
    //   ...formData,
    //   [name]: value,
    // });
  };

  async function  handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      const registeredUserRes = await RegisterUser(
        formData.email,
        formData.password,
        formData.phoneNumber
      );

      console.log("registeredUserRes ", registeredUserRes);
      if (registeredUserRes.success) {
        dispatch(loginSuccess(registeredUserRes.user));
        navigate("/");
      } else {
        console.log("registration error ", registeredUserRes);
      }
    }
  }

  function togglePasswordVisibility(e) {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  }

  function toggleConfirmPasswordVisibility(e) {
    e.preventDefault();
    setConfirmPasswordShown(!confirmPasswordShown);
  }

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="w-50 w-sm-100 p-5 mx-auto shadow-lg p-3 mb-5 bg-body rounded"
        style={{}}
      >
        <div className="d-flex justify-content-between">
          <Image className="w-25 mx-auto" src="logo.png" rounded />
        </div>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={onChange}
            placeholder="Enter Your email"
            required
            value={formData.email}
            isInvalid={
              validated &&
              !formData.email.match(
                /^[_a-z0-9-]+(.[a-z0-9-]+)*(.[a-z0-9-]{2,4})@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/
              )
            }
          />

          <Form.Control.Feedback type="invalid">
            please enter a valid email
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>password</Form.Label>

          <InputGroup>
            <Form.Control
              type={`${passwordShown ? "" : "password"}`}
              name="password"
              onChange={onChange}
              value={formData.password}
              placeholder="Enter Your password"
              required
            />
            <Button
              className="btn-light"
              onMouseDown={togglePasswordVisibility}
              onMouseUp={togglePasswordVisibility}
            >
              <i
                className={`fa fa-eye${passwordShown ? "" : "-slash"}`}
                aria-hidden="true"
              ></i>
            </Button>
          </InputGroup>
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm password</Form.Label>

          <InputGroup>
            <Form.Control
              type={`${confirmPasswordShown ? "" : "password"}`}
              name="confirmPassword"
              onChange={onChange}
              value={formData.confirmPassword}
              placeholder="Confirm Your password"
              required
              isInvalid={
                // check password and confirm password match
                validated && formData.password !== formData.confirmPassword
              }
            />
            <Button
              className="btn-light"
              onMouseDown={toggleConfirmPasswordVisibility}
              onMouseUp={toggleConfirmPasswordVisibility}
            >
              <i
                className={`fa fa-eye${confirmPasswordShown ? "" : "-slash"}`}
                aria-hidden="true"
              ></i>
            </Button>
          </InputGroup>

          <Form.Control.Feedback type="invalid">
            password does not match
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="my-2" controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phoneNumber"
            onChange={onChange}
            value={formData.phoneNumber}
            placeholder="Enter Your phone number"
            required
          />
        </Form.Group>

        <Form.Group className="mt-2">
          <Button type="submit" className="me-2 ">
            Register
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
