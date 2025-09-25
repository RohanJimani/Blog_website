import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/signup.css";

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // First Name & Last Name
    if (!firstName.trim() || !/^[A-Za-z]{2,}$/.test(firstName))
      newErrors.firstName = "First name must be at least 2 letters.";
    if (!lastName.trim() || !/^[A-Za-z]{2,}$/.test(lastName))
      newErrors.lastName = "Last name must be at least 2 letters.";

    // Email
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email address.";

    // Password
    if (!password.trim() || !/^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/.test(password))
      newErrors.password = "Password must be at least 6 characters, include a number and a special character.";

    // Date of Birth (at least 13 years old)
    if (!dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required.";
    } else {
      const dob = new Date(dateOfBirth);
      const age = new Date().getFullYear() - dob.getFullYear();
      if (age < 13) newErrors.dateOfBirth = "You must be at least 13 years old.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstName, lastName, dateOfBirth }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Registered! You can now login.");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (err) {
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
          </div>

          <div>
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div>
            <label>Date of Birth</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            {errors.dateOfBirth && <p className="error">{errors.dateOfBirth}</p>}
          </div>

          <button type="submit" className="btn-primary">
            Register
          </button>
        </form>

        <div className="auth-footer">
          <span>Already have an account?</span>
          <button className="btn-outline" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
