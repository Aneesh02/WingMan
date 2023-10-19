import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { useEffect } from "react";
import "./SignupForm.css";

export default function SignupFormModal() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [errors, setErrors] = useState({});
  const [submitErrors, setSubmitErrors] = useState([]);
  const [disabled, setDisabled] = useState(true)
  const [triggerRerenderToggle, setTriggerRerenderToggle] = useState(false);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword && password.length >= 8) {
      const data = await dispatch(signUp(firstName, lastName, streetAddress, email, username, password));
      if (data) {
        setSubmitErrors(data);
      } else {
        closeModal();
      }
    } else {
      setSubmitErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  useEffect(() => {
    if (firstName && firstName.length < 1) {
      errors.firstName = 'Minimum 1 character';
      setTriggerRerenderToggle(!triggerRerenderToggle);
    } else {
      errors.firstName = "";
    };
  }, [firstName]);

  useEffect(() => {
    if (lastName && lastName.length < 2) {
      errors.lastName = 'Minimum 2 characters';
      setTriggerRerenderToggle(!triggerRerenderToggle);
    } else {
      errors.lastName = "";
    };
  }, [lastName]);

  useEffect(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && email.length > 0) {
      const isValid = emailPattern.test(email);
      setIsValidEmail(isValid);
    };
  }, [email]);

  useEffect(() => {
    if (username && username.length < 4) {
      errors.username = 'Minimum 4 characters';
      setTriggerRerenderToggle(!triggerRerenderToggle);
    } else {
      errors.username = "";
    };
  }, [username]);

  useEffect(() => {
    if (password.length > 0 && password.length < 8) {
      errors.password = "Minimum 8 characters";
      setDisabled(true);
      setTriggerRerenderToggle(!triggerRerenderToggle);
    } else {
      errors.password = "";
    };
    setTriggerRerenderToggle(!triggerRerenderToggle);
  }, [password]);

  useEffect(() => {
    if (confirmPassword && (confirmPassword !== password)) {
      errors.confirmPassword = "Passwords must match";
      setDisabled(true);
      setTriggerRerenderToggle(!triggerRerenderToggle);

    } else {
      errors.confirmPassword = "";
    };
    setTriggerRerenderToggle(!triggerRerenderToggle);
  }, [password, confirmPassword]);

  useEffect(() => {
    if (errors.firstName || errors.lastName ||
      !isValidEmail || errors.email ||
      errors.password || errors.confirmPassword) {
      setDisabled(true);
      // setTriggerRerenderToggle(!triggerRerenderToggle);
    } else if (!errors.firstName || !errors.lastName ||
      isValidEmail || !errors.email ||
      !errors.password || !errors.confirmPassword) {
      setDisabled(false);
      // setTriggerRerenderToggle(!triggerRerenderToggle);
    };
    setTriggerRerenderToggle(!triggerRerenderToggle);
  }, [errors, isValidEmail]);

  useEffect(() => {
  }, [triggerRerenderToggle, disabled]);

  return (
    <>
      <div id="signUpModalDiv">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          {/* <ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul> */}
          <label>
            <span className='signup-label-text'>First Name</span>
            <input
              className="signUpLabel"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            {/* {errors.firstName && (<p className="error-message">{errors.firstName}</p>)} */}
          </label>
          <label>
            <span className='signup-label-text'>Last Name</span>
            <input
              className="signUpLabel"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            {errors.lastName && (<p className="error-message">{errors.lastName}</p>)}
          </label>
          <label>
            <span className='signup-label-text'>Street Address</span>
            <input
              className="signUpLabel"
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              required
            />
            {errors.streetAddress && (<p className="error-message">{errors.streetAddress}</p>)}
          </label>
          <label>
            <span className='signup-label-text'>Email</span>
            <input
              className="signUpLabel"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && (<p className="error-message">{errors.email}</p>)}
            {!isValidEmail && <p className="error-message">Invalid email</p>}
            {submitErrors.email && (<p className="error-message">{submitErrors.email}</p>)}
          </label>
          <label>
            <span className='signup-label-text'>Username</span>
            <input
              className="signUpLabel"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {errors.username && (<p className="error-message">{errors.username}</p>)}
            {submitErrors.username && (<p className="error-message">{submitErrors.username}</p>)}
          </label>
          <label>
            <span className='signup-label-text'>Password</span>
            <input
              className="signUpLabel"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && (<p className="error-message">{errors.password}</p>)}
          </label>
          <label>
            <span className='signup-label-text'>Confirm Password</span>
            <input
              className="signUpLabel"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors.confirmPassword && (<p className="error-message">{errors.confirmPassword}</p>)}
          </label>
          <button
            id={disabled ? 'signupModalSignupButtonDisabled' : 'signupModalSignupButton'}
            type="submit"
            disabled={disabled}
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};
