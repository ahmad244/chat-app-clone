import React, { useRef, useState } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { LoginUser } from "../api/user";
import { loginSuccess } from "../redux/userRedux";
import { useDispatch } from "react-redux";

import "@fortawesome/fontawesome-free/css/all.css";
import "../css/login.css";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const emailRef = useRef();
  const passwordRef = useRef();

  const [passwordShown, setPasswordShown] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await LoginUser(
      emailRef.current.value,
      passwordRef.current.value
    );
    
    if (response.success) {
      console.log("Login Success", response.user);
      dispatch(loginSuccess(response.user));
      navigate("/");
    } else {
      console.log("Login Failed");
    }

    //onIdSubmit(emailRef.current.value, passwordRef.current.value);
  }
  function NavigateToRegistration() {
    navigate("/register");
  }

  function togglePasswordVisibility(e) {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  }

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form
        onSubmit={handleSubmit}
        className="w-50 w-sm-100 p-5 mx-auto shadow-lg p-3 mb-5 bg-body rounded"
        style={{}}
      >
        <div className="d-flex justify-content-between ">
          <Image className="w-25 mx-auto" src="logo.png" rounded />
        </div>
        <Form.Group className="my-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            ref={emailRef}
            placeholder="Enter Your email"
            required
          />
        </Form.Group>

        <Form.Group className="my-2">
          <Form.Label>password</Form.Label>

          <InputGroup id="show_hide_password">
            <Form.Control
              type={`${passwordShown ? "" : "password"}`}
              ref={passwordRef}
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

        <Form.Group className="mt-2">
          <Button type="submit" className="me-2 ">
            Login
          </Button>
          <Button onClick={NavigateToRegistration} variant="secondary">
            Create A New Account
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
