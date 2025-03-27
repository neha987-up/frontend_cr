import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as images from "./../utilities/images";
import VerifyOtpModal from "./verifyOtpModal";
import CustomModal from "./modals/CustomModal";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../redux/slices/auth";
import { emailReg } from "../utilities/validators";
import Link from "next/link";
const ForgetModal = ({ prevData, onOpenModal, setPrevData }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState("");

  const [key, setKey] = useState(Math.random());
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });
  useEffect(() => {
    if (prevData?.email) {
      setEmail(prevData?.email);
    }
  }, [prevData?.email]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError("");
    if (!email) {
      setEmailError("Please enter your email address");
    } else if (!emailReg.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setIsLoading(true);
      const param = {
        email: email.trim(),
      };
      dispatch(
        forgotPassword({
          params: param,
          callback: (res, error) => {
            setIsLoading(false);
            if (res) {
              setPrevData({ email: email, from: "Forgot" });
              onOpenModal("verifyOtpModal");
              // onOpen(
              //   true,
              //   ModalTypes.VerifyOtp,
              //   {
              //     email: email.trim(),
              //     goBack: ModalTypes.Forgot,
              //   },
              //   { name: "", email: email?.trim(), password: "" }
              // );
              // setEmail(email);
            } else {
              setIsLoading(false);
            }
          },
        })
      );
    }
  };
  const onGoback = () => {
    close();
    setTimeout(() => {
      onOpenModal("loginModal");
    }, 200);
  };
  return (
    <>
      <form>
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
        <button
          className="common_Btn modal_Btn w-100 fw700"
          type="button"
          onClick={(e) => handleSubmit(e)}
        // onClick={() => {
        //   handleOpenModal("verifyOtpModal");
        // }}
        >
          {loading ? <div className="spinner"></div> : "Continue"}
        </button>
      </form>
      <Link onClick={() => onGoback()} href="" className="goBack">
        <i className="fas fa-arrow-left me-2"></i> Go Back
      </Link>
      {/* <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={
          modalDetail.flag === "verifyOtpModal" ? "commonWidth" : "commonWidth"
        }
        ids={modalDetail.flag === "verifyOtpModal" ? "verifyOtpModal" : ""}
        child={
          modalDetail.flag === "verifyOtpModal" ? (
            <VerifyOtpModal
              prevData={{ email: email, from: "Forgot" }}
              close={() => handleOnCloseModal()}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "verifyOtpModal" ? (
            <>
              <div className="modal_Header">
                <Image src={images.mainLogo} alt="mainLogo" />
                <h1 className="modal_Head  fontSize24 white mb-2">
                  Verify your email address
                </h1>
                <p className="verifySubHeading">
                  Enter the 4-digit code sent to you at +{email}
                </p>
              </div>
              <p onClick={handleOnCloseModal} className="modal_Cancle">
                <i class="fa-solid fa-xmark cancleLogo"></i>
              </p>
              <Image
                onClick={handleOnCloseModal}
                src={images.cross}
                width={24}
                height={24}
                className="modal_Cancle"
              />
            </>
          ) : (
            ""
          )
        }
        onCloseModal={() => handleOnCloseModal()}
      /> */}
    </>
  );
};

export default ForgetModal;
