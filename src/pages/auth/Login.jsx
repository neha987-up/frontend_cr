import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, selectLoginAuth } from '../../redux/auth/authSlice';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationPatterns } from '../../constants/constant';

const Login = () => {
  const auth = useSelector(selectLoginAuth)
  const dispatch = useDispatch()

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("This is a required field")
      .matches(validationPatterns.email, "Invalid Email"),
    password: yup.string().required("This is a required field"),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [passwordShown, setPasswordShown] = useState(false);

  const getLoginDetails = () => {
    dispatch(loginAsync())
      .then(unwrapResult)
      .then((obj) => {

      }
      )
      .catch((obj) => {
      })
  }
  useEffect(() => {
    // getLoginDetails()
  }, [])

  const onSave = async (data) => {

  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSave)}>
        <div>
          <label htmlFor="email" >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <span className="error">{errors.email?.message}</span>
        )}

        <div>
          <label htmlFor="password" >
            Password
          </label>
          <input
            type={passwordShown ? "text" : "password"}
            id="password"
            name="password"
            {...register("password")}
          />

          <span
            onClick={() => setPasswordShown(!passwordShown)}
          >
            {passwordShown ? "Hide" : "Show"}
          </span>
        </div>
        {errors.password && (
          <span className="error">{errors.password?.message}</span>
        )}
        <button
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login