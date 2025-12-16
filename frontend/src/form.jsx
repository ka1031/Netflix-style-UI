import React, { useState } from "react";
import "./styles/form.css";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        navigate("/Home")
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="form_flex">
      <div className="form_tile">
        <div className="tileHead">
          <h1>Sign in</h1>
        </div>

        <div className="form1">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                placeholder="Email or Phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <button type="submit" className="submit">
                Sign in
              </button>
            </div>

            <div>OR</div>

            <div>
              <button type="button" className="submit1">
                Use Sign In Code
              </button>
            </div>

            <div>
              <a href="#">Forgot Password?</a>
            </div>

            <div>
              <input type="checkbox" />
              <label> Remember me</label>
            </div>

            <p>
              New to Netflix? <a href="#">Sign Up now</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
