import React, { useState } from "react";
import Image from "next/image";
import * as images from "./../utilities/images";
import { resetPassword } from "../redux/slices/auth";
import { passwordRegex } from "../utilities/validators";
import { useDispatch } from "react-redux";
import Link from "next/link";
const CreateNewPassword = ({ onOpenModal, prevData, close }) => {
  const dispatch = useDispatch();
  const [passwordShown, setPasswordShown] = useState(false);
  const [conpasswordShown, setConPasswordShown] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    setPasswordError("");
    setConfirmPasswordError("");

    if (!password) {
      setPasswordError("Please enter your password");
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, and include a number, a capital letter and a special character."
      );
      isValid = false;
    } else if (!confirmPassword) {
      setConfirmPasswordError("Please enter confirm password");
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      setConfirmPasswordError(
        "Password must be at least 8 characters long, and include a number, a capital letter and a special character."
      );
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Password not matched");
      isValid = false;
    }

    if (isValid) {
      setIsLoading(true);
      const param = {
        email: prevData?.email,
        password: password.trim(),
      };
      dispatch(
        resetPassword({
          params: param,
          callback: (res, error) => {
            setIsLoading(false);
            if (res) {
              onOpenModal("loginModal");
              // onOpen(
              //   true,
              //   ModalTypes.Login,
              //   { email: "" },
              //   { name: "", email: "", password: "" }
              // );
            }
          },
        })
      );
    }
  };
  return (
    <>
      <form>
        <div className="mb-3">
          <label for="email" className="common_Label fontSize16 white">
            New Password
          </label>
          <br />
          <div className="position-relative">
            <input
              type={passwordShown ? "text" : "password"}
              name="email"
              className="common_Input"
              placeholder="Enter your new password"
              onChange={(e) => {
                setPasswordError("");
                setPassword(e.target.value);
              }}
            />
            <Image
              src={passwordShown ? images.hideIcon : images.showIcon}
              className="passShowIcon"
              onClick={() => setPasswordShown(!passwordShown)}
            />
          </div>
          {passwordError && (
            <p className="error_message mb-0">{passwordError}</p>
          )}
        </div>
        <div className="mb-2">
          <label for="email" className="common_Label fontSize16 white">
            Confirm Password
          </label>
          <br />
          <div className="position-relative">
            <input
              type={conpasswordShown ? "text" : "password"}
              name="email"
              className="common_Input"
              placeholder="Re-enter your passowrd"
              onChange={(e) => {
                setConfirmPasswordError("");
                setConfirmPassword(e.target.value);
              }}
            />
            <Image
              src={conpasswordShown ? images.hideIcon : images.showIcon}
              className="passShowIcon"
              onClick={() => setConPasswordShown(!conpasswordShown)}
            />
          </div>
          {confirmPasswordError && (
            <p className="error_message mb-0">{confirmPasswordError}</p>
          )}
        </div>
        <button
          className="common_Btn modal_Btn w-100 fw700"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          {loading ? <div className="spinner"></div> : "Submit"}
        </button>
        <Link
          onClick={() => onOpenModal("loginModal")}
          href=""
          className="goBack"
        >
          <i className="fas fa-arrow-left me-2"></i> Go back to login
        </Link>
      </form>
    </>
  );
};

export default CreateNewPassword;
