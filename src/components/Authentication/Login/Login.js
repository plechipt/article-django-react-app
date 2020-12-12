import { useMutation } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Message } from "semantic-ui-react";
import { USER_LOGIN_MUTATION } from "../../Api/user";
import "./Login.css";

const Login = () => {
  const history = useHistory();
  const [failedToLogin, setFailedToLogin] = useState("");
  const [allowButton, setAllowButton] = useState(false);

  const [loginUser, { data: loginData, loading }] = useMutation(
    USER_LOGIN_MUTATION
  );

  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  // After a submit
  useEffect(() => {
    if (loginData) {
      if (loginData.tokenAuth.success === true) {
        history.push("/posts");
        window.location.reload(false); // Reset site
      } else {
        setFailedToLogin(true);
      }
    }
  }, [loginData, history, usernameInput]);

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
          header="Please, enter valid credentials"
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
            <a href="/register" className="ml-2">
              Sign up
            </a>
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
