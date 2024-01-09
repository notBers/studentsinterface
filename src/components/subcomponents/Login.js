import { Link, redirect } from "react-router-dom";
import { useState } from "react";
import "../../stylesheets/Login.css";

function Login() {
  const [identifier, setIdentifier] = useState();

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login">
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <input
            type="text"
            id="specialsubmit"
            placeholder="Enter identifier here"
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <Link className="submitlogin" to={identifier}>Submit</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;