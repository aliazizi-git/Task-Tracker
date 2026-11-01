import React, { useState } from "react";
import useFormFields from "../../Hooks/useFormFields";
import { loginUser, registerUser } from "../../Services/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../Store/Slices/authSlice";
import notify from "../../Utils/notify";

export default function Auth() {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [fields, handleChange] = useFormFields({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLoginMode) {
      const result = await loginUser({
        username: fields.username,
        password: fields.password,
      });
        notify('success', "Welcome back!");
        dispatch(login(result.data));
        navigate("/tasks");
      
    } else {
      const result = await registerUser(fields);
      if (result.success) {
        notify('success', "Account created! Please sign in.");
        setIsLoginMode(true);
      }
    }
    } catch (error) {
          const errorMsg = error.response?.data?.message || "Something went wrong";
          notify('error',errorMsg)
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter your username"
          value={fields.username}
          onChange={handleChange}
        />
        {!isLoginMode && (
          <input
            type="text"
            placeholder="Enter email"
            value={fields.email}
            onChange={handleChange}
          />
        )}
        <input
          type="password"
          placeholder="enter password"
          value={fields.password}
          onChange={handleChange}
        />
        <button type="submit">{isLoginMode ? "sign in" : "sign up"}</button>
        {isLoginMode ? (
          <div>
            <p>Need an account?</p>
            <button type="button" onClick={() => setIsLoginMode(false)}>
              Sign up
            </button>
          </div>
        ) : (
          <div>
            <p>Already have an account?</p>
            <button type="button" onClick={() => setIsLoginMode(true)}>
              Sign in
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
