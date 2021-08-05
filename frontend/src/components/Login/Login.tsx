import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { setLogin, setUser, setToken } from "../../store/main.store";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./Login.module.css";

const Login: React.FC<{}> = (props) => {
  const dispatch = useDispatch();
  const userRef: any = useRef();
  const passwordRef: any = useRef();

  const submitLogin = async (LoginRequest: any, user: string) => {
    const res = await fetch("https://localhost:5001/Auth/Login", LoginRequest);
    const result = await res.json();
    if (!result.success) {
      alert("Login Failed: please verify your username and password");
    } else {
      dispatch(setLogin(true));
      dispatch(setUser(user));
      dispatch(setToken(result.data.toString()));
    }
  };
  const loginHandler = (event: any) => {
    event.preventDefault();
    const user = userRef.current.value;
    const loginRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user,
        password: passwordRef.current.value,
      }),
    };
    submitLogin(loginRequest, user);
  };

  return (
    <div className={classes.loginWrapper}>
      <Form className="text-center" onSubmit={loginHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter Username"
            ref={userRef}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
