import React from "react";

import { FaUser, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";

import "./loginFrom.css";
function FormLogin() {
  const { register, handleSubmit } = useForm();

  const { signin } = useAuth();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <div >
      <form onSubmit={onSubmit} >
        <h1>Login</h1>
        <div >
          <input
            type="email"
            placeholder="email"
            {...register("email", { required: true })}
          />
          <FaUser className="icon" />
        </div>
        <div >
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <FaLock className="icon" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default FormLogin;
