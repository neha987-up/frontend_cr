import React, { useState } from "react";
import * as images from "./../utilities/images";
import Image from "next/image";
import Link from "next/link";
import { changePassword } from "../redux/slices/auth";
import { passwordRegex } from "../utilities/validators";
import { useDispatch } from "react-redux";
const NewPassword = ({ close }) => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [oldPasswordError, setOldPasswordError] = useState();
  const [newPasswordError, setNewPasswordError] = useState();
  const [confirmPasswordError, setConfirmPasswordError] = useState();
  const [oldpasswordShown, setOldPasswordShown] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [conpasswordShown, setConPasswordShown] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const handleChangePassword = (e) => {
    e.preventDefault();
    setOldPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");

    // Validation
    if (!oldPassword) {
      setOldPasswordError("Please enter your old password");
    } else if (!newPassword) {
      setNewPasswordError("Please enter new password");
    } else if (!passwordRegex.test(newPassword)) {
      setNewPasswordError(
        "Password must be at least 8 characters long, and include a number, a capital letter and a special character."
      );
    } else if (!confirmPassword) {
      setConfirmPasswordError("Please enter confirm password");
    } else if (!passwordRegex.test(confirmPassword)) {
      setConfirmPasswordError(
        "Password must be at least 8 characters long, and include a number, a capital letter and a special character."
      );
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Password not matched");
    } else {
      setIsLoading(true);
      const param = {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      };
      dispatch(
        changePassword({
          params: param,
          callback: (res, error) => {
            console.log(
              "🏋🏼‍♀️ ~ file: newPassword.js:55 ~ handleChangePassword ~ res:",
              res
            );
            setIsLoading(false);
            if (res) {
              close();
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
            Old Password
          </label>
          <br />
          <div className="position-relative">
            <input
              type={oldpasswordShown ? "text" : "password"}
              name="email"
              className="common_Input"
              placeholder="Enter your old password"
              onChange={(e) => {
                setOldPasswordError("");
                setOldPassword(e.target.value);
              }}
            />
            <Image
              src={oldpasswordShown ? images.hideIcon : images.showIcon}
              className="passShowIcon"
              onClick={() => setOldPasswordShown(!oldpasswordShown)}
            />
          </div>
          {oldPasswordError && (
            <p className="error_message mb-0">{oldPasswordError}</p>
          )}
        </div>
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
                setNewPasswordError("");
                setNewPassword(e.target.value);
              }}
            />
            <Image
              src={passwordShown ? images.hideIcon : images.showIcon}
              className="passShowIcon"
              onClick={() => setPasswordShown(!passwordShown)}
            />
          </div>
          {newPasswordError && (
            <p className="error_message mb-0">{newPasswordError}</p>
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
          onClick={(e) => handleChangePassword(e)}
        >
          {loading ? <div className="spinner"></div> : "Change Password"}
        </button>
        {/* <Link
          onClick={() => onOpenModal("loginModal")}
          href=""
          className="goBack"
        >
          <i class="fas fa-arrow-left me-2"></i> Go back to login
        </Link> */}
      </form>
    </>
  );
};

export default NewPassword;
