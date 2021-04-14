import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../users/authorization";
import "./LoginModal.scss";
interface LoginModalProps {}

export function LoginModal(props: LoginModalProps) {
  const { user, login } = useAuth();
  const [userLogin, setUserLogin] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const history = useHistory();

  function onSubmitClick() {
    login({
      login: userLogin,
      password: password,
      rememberMe: rememberMe,
    });
  }

  useEffect(() => {
    if (user) {
      history.push({
        pathname: "projects",
      });
    }
  }, [user, history]);

  return (
    <div className="login-page">
      <div className="login-modal">
        <form style={{ marginTop: "12%" }}>
          <h3>Sign In</h3>
          <br></br>
          <input
            value={userLogin}
            onChange={(e) => setUserLogin(e.target.value)}
            className="input form-control "
            placeholder="Enter login"
          />
          <br></br>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control input"
            placeholder="Enter password"
          />

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <br></br>
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>
        </form>
        <button
          className="btn btn-primary btn-block submit-button"
          onClick={() => onSubmitClick()}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
