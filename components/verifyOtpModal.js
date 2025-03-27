import React, { useState } from "react";
import Link from "next/link";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import { resendOtp, setUserLogin, verifyOtp } from "../redux/slices/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
const VerifyOtpModal = ({ onOpenModal, close, prevData, clearPrevData, }) => {
  console.log("DAATATATTATA", prevData);
  const [otp, setOtp] = useState("");
  const [key, setKey] = useState(Math.random());
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
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

  const handleOtpChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;

      // Move to the next input field
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }

      // Move back to the previous input field
      if (!value && index > 0) {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        if (prevInput) {
          prevInput.focus();
        }
      }

      setOtp(newOtp);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp === "" || otp.length < 4) {
      toast.error("Please Fill all the OTP fields");
      return;
    } else if (otp == "0000") {
      toast.error("Invalid OTP");
    } else {
      setIsLoading(true);
      const param = {
        email: prevData?.email,
        otp: otp,
      };

      dispatch(
        verifyOtp({
          params: param,
          callback: (res) => {
            setIsLoading(false);
            if (res) {
              if (prevData?.from == "Signup") {
                clearPrevData();
                close();
                localStorage.setItem(
                  "authToken",
                  JSON.stringify(res.data?.payload?.token)
                );
                dispatch(setUserLogin(res.data?.payload));
              } else if (prevData?.from == "Forgot") {
                onOpenModal("createNewPassword");
              } else if (prevData?.from == "Login") {
                clearPrevData();
                close();
                localStorage.setItem(
                  "authToken",
                  JSON.stringify(res.data?.payload?.token)
                );
                dispatch(setUserLogin(res.data?.payload));
              }

              // if (extraData.goBack == ModalTypes.Forgot) {

              //   onOpen(
              //     true,
              //     ModalTypes.Reset,
              //     { email: extraData?.email },
              //     { name: "", email: "", password: "" }
              //   );
              // } else {
              //   onClose();
              //   localStorage.setItem(
              //     "authToken",
              //     JSON.stringify(res.data?.payload?.token)
              //   );
              //   dispatch(setUserLogin(res.data?.payload));
              //   router.push("/home");
              // }
            }
          },
        })
      );
    }
  };
  const handleResendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const param = {
      email: prevData?.email,
    };

    if (prevData?.from == 'Forgot') {
      param.type = 1
    }

    dispatch(
      resendOtp({
        params: param,
        callback: (res, error) => {
          setIsLoading(false);
        },
      })
    );
  };
  const onGoback = () => {
    if (prevData?.from == "Signup") {
      onOpenModal("SignupModal");
    } else if (prevData?.from == "Login") {
      onOpenModal("loginModal");
    } else if (prevData?.from == "Forgot") {
      onOpenModal("forgetModal");
    }
  };
  return (
    <>
      <form>
        <div className="otpInput_Parent d-flex justify-content-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            inputType="tel"
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
          />
        </div>
        <p className="modal_Footer fontSize16 notReceive_Txt mb-0">
          Didn't receive?
          <Link
            onClick={(e) => handleResendOtp(e)}
            href="#"
            className="fw700 blue ps-1"
          >
            Resend Code
          </Link>
        </p>
        <button
          className="common_Btn modal_Btn w-100 fw700"
          type="button"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          {isLoading ? <div className="spinner"></div> : " Verify & Continue"}
        </button>
        <Link onClick={() => onGoback()} href="" className="goBack">
          <i className="fas fa-arrow-left me-2"></i> Go Back
        </Link>
      </form>

      {/* <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={
          modalDetail.flag === "createNewPassword"
            ? "commonWidth"
            : "commonWidth"
        }
        ids={
          modalDetail.flag === "createNewPassword" ? "createNewPassword" : ""
        }
        child={
          modalDetail.flag === "createNewPassword" ? (
            <CreateNewPassword
              prevData={prevData}
              close={() => handleOnCloseModal()}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "createNewPassword" ? (
            <>
              <div className="modal_Header">
                <Image src={images.mainLogo} alt="mainLogo" />
                <h1 className="modal_Head  fontSize24 white mb-2">
                  Create New Password
                </h1>
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

export default VerifyOtpModal;
