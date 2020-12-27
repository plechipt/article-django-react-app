import { useMutation } from "@apollo/react-hooks";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Form, Message } from "semantic-ui-react";
import { USER_LOGIN_MUTATION } from "../../Api/user";
import "./Login.css";

const ONE_DAY = 1;
const MINUTES_IN_DAY = 1440;
const EXPIRATION_IN_MINUTES = 16;
const COOKIE_EXPIRATION_DATE =
  (ONE_DAY / MINUTES_IN_DAY) * EXPIRATION_IN_MINUTES;

const Login = () => {
  const history = useHistory();
  const [failedToLogin, setFailedToLogin] = useState("");
  const [allowButton, setAllowButton] = useState(false);

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [
    loginUser,
    { data: loginData, loading, error },
  ] = useMutation(USER_LOGIN_MUTATION, { errorPolicy: "all" });

  // After a successfull submit
  useEffect(() => {
    if (loginData) {
      const { tokenAuth } = loginData;

      if (tokenAuth !== null) {
        // Set expiration date
        const expirationDate = tokenAuth.payload.exp * 1000;
        Cookies.set("tokenExpiration", expirationDate, {
          expires: COOKIE_EXPIRATION_DATE,
        });

        history.push("/posts");
        window.location.reload(false); // Reset site
      }
    }
  }, [loginData, history, usernameInput]);

  // Valid credentials
  useEffect(() => {
    if (error) {
      setFailedToLogin(true);
      setPasswordInput("");
    }
  }, [error]);

  const handleOnSubmit = async (e) => {
    const user_pressed_enter = e.key === "Enter";
    const user_submited_button = e.target.tagName === "FORM";
    const canSubmit = allowButton;

    if ((canSubmit && user_pressed_enter) || user_submited_button) {
      await loginUser({
        variables: {
          username: usernameInput,
          password: passwordInput,
        },
      });
    }
  };

  // Check if username and password was filled
  useEffect(() => {
    const username_and_password_are_filled =
      usernameInput !== "" && passwordInput !== "";

    if (username_and_password_are_filled) {
      setAllowButton(true);
    } else {
      setAllowButton(false);
    }
  }, [usernameInput, passwordInput]);

  return (
    <div className="login-container">
      {failedToLogin !== false && failedToLogin !== "" ? (
        <Message
          className="error-message-container"
          error
          header="Please enter valid credentials"
        />
      ) : null}
      <Form onSubmit={handleOnSubmit}>
        <Form.Field>
          <label>Username</label>
          <input
            onChange={(e) => setUsernameInput(e.target.value)}
            value={usernameInput}
            autoComplete="one-time-code"
            placeholder="Username"
            maxLength="40"
            autoFocus
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            onChange={(e) => setPasswordInput(e.target.value)}
            value={passwordInput}
            autoComplete="one-time-code"
            type="password"
            maxLength="30"
            placeholder="Password"
          />
        </Form.Field>
        <Form.Field>
          <p className="text-muted">
            Need an account?{" "}
            <Link to="/register" className="ml-2">
              Sign up
            </Link>
          </p>
        </Form.Field>
        <Button
          disabled={!allowButton || loading}
          className="submit-button"
          type="submit"
          primary
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
