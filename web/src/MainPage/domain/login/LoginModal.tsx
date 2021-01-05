import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../Users/authorization";
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
  }, [user]);

  return (
    <div className="loginPage">
      <div className="loginModal" style={{ marginTop: "auto" }}>
        <form style={{ marginTop: "12%" }}>
          <h3>Sign In</h3>
          <br></br>

          <div className="form-group">
            <input
              value={userLogin}
              onChange={(e) => setUserLogin(e.target.value)}
              className="form-control"
              style={{ width: "50%", margin: "auto", borderRadius: "40px" }}
              placeholder="Enter login"
            />
          </div>
          <br></br>
          <div className="form-group" style={{ width: "50%", margin: "auto" }}>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              placeholder="Enter password"
              style={{ borderRadius: "40px" }}
            />
          </div>

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
          className="btn btn-primary btn-block"
          onClick={() => onSubmitClick()}
          style={{ width: "50%", margin: "auto", bottom: "5%" }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
