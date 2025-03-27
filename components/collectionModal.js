import React, { useState, useEffect } from "react";
import Image from "next/image";
import * as images from "./../utilities/images";
import { buyToken } from "../redux/slices/token";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  calculateTimeLeft,
  capitalizeFirstLetter,
} from "../utilities/globalMethods";
import CreateNewPassword from "./createNewPassword";
import ForgetModal from "./forgetModal";
import VerifyOtpModal from "./verifyOtpModal";
import SignUpModal from "./signUpModal";
import LoginModal from "./loginModal";
import CustomModal from "./modals/CustomModal";
import StripePayment from "../pages/stripe/StripePayment";

const CollectionModal = ({ tokenDetail, close }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = calculateTimeLeft(tokenDetail?.token_expire_at);
      setRemainingTime(timeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [tokenDetail]);

  const purchaseToken = (intent) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setLoading(true);
      const param = {
        token_id: tokenDetail?.id,
        price: tokenDetail?.standard_price_individual,
        token_type: 1,
        buying_type: 1,
        intent_id: intent?.id,
      };

      dispatch(
        buyToken({
          params: param,
          callback: (res, error) => {
            setLoading(false);
            if (res) {
              toast.success(res?.data?.msg);
              close();
            } else if (error) {
            }
          },
        })
      );
    } else {
      handleOpenModal("loginModal");
    }
  };

  const [key, setKey] = useState(Math.random());
  const [prevData, setPrevData] = useState({
    name: "",
    email: "",
    password: "",
    from: "",
  });
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });

  // closeModal
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
  const clearPrevData = () => {
    setPrevData({
      name: "",
      email: "",
      password: "",
      from: "",
    });
  };

  console.log("Remaining_Time", JSON.stringify(remainingTime));
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4">
            <div className="collectionCard">
              <Image
                className="img-fluid"
                width={704}
                height={300}
                src={tokenDetail?.token_image}
                style={{
                  width: "100%",
                  height: "100%",
                  // minHeight: "300px",
                  // maxHeight: "300px",
                  borderRadius: "15px",
                  // objectFit: "cover",
                }}
              />
            </div>
          </div>
          <div className="col-sm-8">
            {/* {remainingTime?.hours == 0 &&
            remainingTime?.minutes == 0 &&
            remainingTime?.seconds == 0 ? (
              <div className="spinnerContainer">
                <div className="spinner"></div>
              </div>
            ) : ( */}
            <>
              <h1 className="fontSize30 mb-4">
                {capitalizeFirstLetter(tokenDetail?.name)}
              </h1>
              <div className="collectionInnerCard">
                {/* <ul className="collectionCardList text-start">
                  <li>
                    <h2>{remainingTime.hours}</h2>
                    <span>Hours</span>
                  </li>
                  <li>
                    <h2>{remainingTime.minutes}</h2>
                    <span>Minutes</span>
                  </li>
                  <li>
                    <h2>{remainingTime.seconds}</h2>
                    <span>Seconds</span>
                  </li>
                </ul> */}

                <p className="collectionCardPrice">
                  {"$" + tokenDetail?.standard_price_individual}
                </p>
                <button
                  onClick={() => handleOpenModal(localStorage.getItem("authToken") ? "purchaseModal" : 'loginModal')}
                  className="common_Btn w-100"
                >
                  {loading ? <div className="spinner"></div> : " Buy Now"}
                </button>
              </div>
            </>
            {/* )} */}
          </div>
        </div>
      </div>

      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={
          modalDetail.flag === "loginModal" ? "commonWidth" : "commonWidth"
        }
        ids={
          modalDetail.flag === "loginModal"
            ? "loginModal"
            : modalDetail.flag === "SignupModal"
              ? "loginModal"
              : modalDetail.flag === "verifyOtpModal"
                ? "verifyOtpModal"
                : modalDetail.flag === "forgetModal"
                  ? "forgetModal"
                  : modalDetail.flag === "createNewPassword"
                    ? "createNewPassword"
                    : modalDetail.flag === "logoutModal"
                      ? "logoutModal"
                      : ""
        }
        child={
          modalDetail.flag === "loginModal" ? (
            <LoginModal
              prevData={prevData}
              setPrevData={setPrevData}
              onOpenModal={(flag) => handleOpenModal(flag)}
              close={() => handleOnCloseModal()}
              clearPrevData={clearPrevData}
            />
          ) : modalDetail.flag === "SignupModal" ? (
            <SignUpModal
              prevData={prevData}
              setPrevData={setPrevData}
              onOpenModal={(flag) => handleOpenModal(flag)}
              close={() => handleOnCloseModal()}
              handleModal={handleOpenModal}
              clearPrevData={clearPrevData}
            />
          ) : modalDetail.flag === "verifyOtpModal" ? (
            <VerifyOtpModal
              prevData={prevData}
              setPrevData={setPrevData}
              onOpenModal={(flag) => handleOpenModal(flag)}
              close={() => handleOnCloseModal()}
              clearPrevData={clearPrevData}
            />
          ) : modalDetail.flag === "forgetModal" ? (
            <ForgetModal
              prevData={prevData}
              setPrevData={setPrevData}
              onOpenModal={(flag) => handleOpenModal(flag)}
              close={() => handleOnCloseModal()}
              clearPrevData={clearPrevData}
            />
          ) : modalDetail.flag === "createNewPassword" ? (
            <CreateNewPassword
              onOpenModal={(flag) => handleOpenModal(flag)}
              prevData={prevData}
              setPrevData={setPrevData}
              close={() => handleOnCloseModal()}
              clearPrevData={clearPrevData}
            />
          ) : modalDetail.flag === "purchaseModal" ? (
            <StripePayment
              onOpenModal={(flag) => handleOpenModal(flag)}
              tokenData={tokenDetail}
              purchaseToken={(intent) => purchaseToken(intent)}
              amount={tokenDetail?.standard_price_individual}
              close={() => handleOnCloseModal()}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "loginModal" ? (
            <>
              <div className="modal_Header">
                <Image src={images.mainLogo} alt="mainLogo" />
                <h1 className="modal_Head  fontSize24 white mb-0">
                  Login to your account
                </h1>
              </div>
              <Image
                onClick={handleOnCloseModal}
                src={images.cross}
                width={24}
                height={24}
                className="modal_Cancle"
              />
            </>
          ) : modalDetail.flag === "SignupModal" ? (
            <>
              <div className="modal_Header">
                <Image src={images.mainLogo} alt="mainLogo" />
                <h1 className="modal_Head  fontSize24 white mb-0">
                  Sign up for your new account
                </h1>
              </div>
              <Image
                onClick={handleOnCloseModal}
                src={images.cross}
                width={24}
                height={24}
                className="modal_Cancle"
              />
            </>
          ) : modalDetail.flag === "verifyOtpModal" ? (
            <>
              <div className="modal_Header">
                <h1 className="modal_Head fontSize24 white mb-0">
                  Verify your OTP
                </h1>
              </div>
              <Image
                onClick={handleOnCloseModal}
                src={images.cross}
                width={24}
                height={24}
                className="modal_Cancle"
              />
            </>
          ) : modalDetail.flag === "purchaseModal" ? (
            <>
              <div className="modal_Header">
                <Image src={images.mainLogo} alt="mainLogo" />
                <h1 className="modal_Head  fontSize24 white mb-2">
                  Payment Amount
                </h1>
                <p className="areYouSureText mb-0">
                  {"$" + tokenDetail?.standard_price_individual}
                </p>
              </div>
              <p onClick={handleOnCloseModal} className="modal_Cancle">
                <i className="fa-solid fa-xmark cancleLogo"></i>
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
      />
    </>
  );
};

export default CollectionModal;
