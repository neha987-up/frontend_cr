import React, { useEffect, useState } from "react";
import Link from "next/link";
import { userSignup } from "../redux/slices/auth";
import { useDispatch } from "react-redux";
import { emailReg, passwordRegex } from "../utilities/validators";
import LoginModal from "./loginModal";
import CustomModal from "./modals/CustomModal";
import * as images from "./../utilities/images";
import Image from "next/image";
import VerifyOtpModal from "./verifyOtpModal";
import PhoneInput from "react-phone-input-2";

const SignUpModal = ({
  prevData,
  onOpenModal,
  close,
  setPrevData,
  clearPrevData,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setIsLoading] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [key, setKey] = useState(Math.random());
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });

  useEffect(() => {
    if (prevData?.name) {
      setName(prevData?.name);
    }
    if (prevData?.email) {
      setEmail(prevData?.email);
    }
    if (prevData?.password) {
      setPassword(prevData?.password);
    }
    if (prevData?.phone) {
      setPhone(prevData?.phone);
    }
  }, [prevData?.email, prevData.name, prevData.password, prevData.phone]);

  const handleSignUp = (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset error messages
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setPhoneError("")

    // Validation
    if (name.trim() == "") {
      setNameError("Please enter your name");
      isValid = false;
    } else if (phone.trim() == "") {
      setPhoneError("Please enter your phone number");
      isValid = false;
    } else if (phone.trim().length < 8) {
      setPhoneError("Phone number must be at least 8 digits long");
      isValid = false;
    } else if (phone.trim().length > 15) {
      setPhoneError("Phone number must be under 15 digits long");
      isValid = false;
    } else if (email.trim() == "") {
      setEmailError("Please enter your email address");
      isValid = false;
    } else if (!emailReg.test(email.trim())) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else if (!password) {
      setPasswordError("Please enter your password");
      isValid = false;
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, and include a number, a capital letter and a special character."
      );
      isValid = false;
    }

    if (isValid) {
      setIsLoading(true);
      const param = {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
        phone_no: phone.trim()
      };
      dispatch(
        userSignup({
          params: param,
          callback: (res, error) => {
            setIsLoading(false);
            if (res) {
              setPrevData({
                name: name,
                email: email,
                password: password,
                phone,
                from: "Signup",
              });
              onOpenModal("verifyOtpModal");
            } else {
              setIsLoading(false);
            }
          },
        })
      );
    }
  };

  const handleOnCloseModal = () => {
    setModalDetail({
      show: false,
      title: "",
      flag: "",
    });
    setKey(Math.random());
  };

  // open modal
  const handleOpenModal = (flag) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
  };
  return (
    <>
      <form>
        <div>
          <label for="email" className="common_Label fontSize16 white">
            Your Name
          </label>
          <br />
          <input
            value={name}
            type="text"
            name="email"
            className="common_Input"
            placeholder="Enter your full name"
            onChange={(e) => {
              setNameError("");
              setName(e.target.value);
            }}
          />
          {nameError && <p className="error_message mb-0">{nameError}</p>}
        </div>
        <div className="formInput_Parent">
          <label for="phone" className="common_Label fontSize16 white">
            Phone Number
          </label>
          <br />
          <PhoneInput
            value={phone}
            name="phone"
            country="au"
            enableSearch={true}
            enableLongNumbers={true}
            placeholder="Enter your phone number"
            onChange={(e) => {
              setPhoneError("");
              setPhone(e);
            }}
          />
          {phoneError && <p className="error_message mb-0">{phoneError}</p>}
        </div>
        <div className="formInput_Parent">
          <label for="email" className="common_Label fontSize16 white">
            Email
          </label>
          <br />
          <input
            value={email}
            type="text"
            name="email"
            className="common_Input"
            placeholder="Enter your email address"
            onChange={(e) => {
              setEmailError("");
              setEmail(e.target.value);
            }}
          />
          {emailError && <p className="error_message mb-0">{emailError}</p>}
        </div>
        <div className="formInput_Parent">
          <label for="password" className="common_Label fontSize16 white">
            Password
          </label>
          <br />
          {/* <input
            value={password}
            type="text"
            name="password"
            className="common_Input"
            placeholder="Enter your password"
            onChange={(e) => {
              setPasswordError("");
              setPassword(e.target.value);
            }}
          /> */}
          <div className="position-relative">
            <input
              type={passwordShown ? "text" : "password"}
              name="email"
              className="common_Input"
              placeholder="Please enter your passowrd"
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
        <button
          className="common_Btn modal_Btn w-100 fw700"
          onClick={(e) => handleSignUp(e)}
        >
          {loading ? <div className="spinner"></div> : "Signup Now"}
        </button>
        <p className="modal_Footer fontSize16 white mb-0">
          <span>Already a member? </span>
          <Link
            onClick={() => {
              clearPrevData(), close();
              setTimeout(() => {
                onOpenModal("loginModal");
              }, 200);
            }}
            href=""
            className="fw700 blue"
          >
            Sign in
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignUpModal;
