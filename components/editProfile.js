import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  selectLoginAuth,
  updateUserProfile,
} from "../redux/slices/auth";

const EditProfile = ({ getProfile, close }) => {
  const authData = useSelector(selectLoginAuth);
  const dispatch = useDispatch();
  const [name, setName] = useState(authData?.usersInfo?.user?.name ?? "");
  const [nameError, setNameError] = useState();
  const [loading, setIsLoading] = useState(false);

  const handleChangeName = (e) => {
    e.preventDefault();
    setNameError("");

    // Validation
    if (!name?.trim()) {
      setNameError("Please enter your name");
    } else {
      setIsLoading(true);
      const param = {
        name: name?.trim(),
      };
      dispatch(
        updateUserProfile({
          params: param,
          callback: (res, error) => {
            setIsLoading(false);
            if (res) {
              getProfile();
              close();
            }
          },
        })
      );
    }
  };
  return (
    <form>
      <div className="mb-3">
        <label for="email" className="common_Label fontSize16 white">
          Your Name
        </label>
        <br />
        <div className="position-relative">
          <input
            value={name}
            type={"text"}
            name="email"
            className="common_Input"
            placeholder="Enter your full name"
            onChange={(e) => {
              setNameError("");
              setName(e.target.value);
            }}
          />
        </div>
        {nameError && <p className="error_message mb-0">{nameError}</p>}
      </div>
      <button
        className="common_Btn modal_Btn w-100 fw700"
        type="submit"
        onClick={(e) => handleChangeName(e)}
      >
        {loading ? <div className="spinner"></div> : " Save Changes"}
      </button>
      {/* <Link
          onClick={() => onOpenModal("loginModal")}
          href=""
          className="goBack"
        >
          <i class="fas fa-arrow-left me-2"></i> Go back to login
        </Link> */}
    </form>
  );
};

export default EditProfile;
