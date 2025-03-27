import { React, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as images from "./../utilities/images";
import ForgetModal from "./forgetModal";
import CustomModal from "./modals/CustomModal";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/slices/auth";
import { emailReg } from "../utilities/validators";
import SignUpModal from "./signUpModal";
import VerifyOtpModal from "./verifyOtpModal";
const LoginModal = ({ onOpenModal, close, clearPrevData, setPrevData }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [key, setKey] = useState(Math.random());
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });

  //closeModal
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

  const handleLogin = (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    // Validation
    if (!email) {
      setEmailError("Please enter your email address");
    } else if (!emailReg.test(email)) {
      setEmailError("Please enter a valid email address");
    } else if (!password) {
      setPasswordError("Please enter your password");
    } else {
      setLoading(true);
      const param = {
        email: email.trim(),
        password: password.trim(),
      };
      dispatch(
        userLogin({
          params: param,
          callback: (res, error) => {
            setLoading(false);
            if (res) {
              close();
              // router.push("/home");
            } else if (error) {
              if (error?.payload?.is_email_verified == 0) {
                close();
                setPrevData({
                  name: "",
                  email: email?.trim(),
                  password: "",
                  from: "Login",
                });

                setTimeout(() => {
                  onOpenModal("verifyOtpModal");
                }, 200);
              }
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
            Email
          </label>
          <br />
          <input
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
        <div className="mb-2">
          <label for="email" className="common_Label fontSize16 white">
            Password
          </label>
          <br />
          <div className="position-relative">
            <input
              type={passwordShown ? "text" : "password"}
              name="password"
              className="common_Input"
              placeholder="Enter your password"
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
        <p
          className="fw700 forgot_password"
          onClick={() => {
            clearPrevData();
            close();
            setTimeout(() => {
              onOpenModal("forgetModal");
            }, 200);
          }}
        >
          Forgot Password?
        </p>
        <button
          className="common_Btn modal_Btn w-100 fw700"
          type="submit"
          onClick={(e) => handleLogin(e)}
        >
          {loading ? <div className="spinner"></div> : "Login"}
        </button>
        <p className="modal_Footer fontSize16 white mb-0">
          New to Collection Rewards?{" "}
          <Link
            onClick={() => {
              close();
              setTimeout(() => {
                onOpenModal("SignupModal");
              }, 200);

              // handleOpenModal("SignupModal");
            }}
            href=""
            className="fw700 blue"
          >
            Create Account
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginModal;
