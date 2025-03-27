import React, { useEffect, useState } from "react";
import CustomModal from "./../components/modals/CustomModal";
// import LogoutModal from "../../pages/Modals/LogoutModal";
import Image from "next/image";
import * as images from "./../utilities/images";
import { useRouter } from "next/router";

import { restAllData } from "../redux/slices/commonActions";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useRouter as useNaviagtionRouter } from "next/navigation";
import ForgetModal from "./forgetModal";
import CreateNewPassword from "./createNewPassword";
import VerifyOtpModal from "./verifyOtpModal";
import SignUpModal from "./signUpModal";
import LoginModal from "./loginModal";
import { selectLoginAuth } from "../redux/slices/auth";
import LogoutModal from "./logoutModal";
import { useClient } from "../context/ClientContext";

const Header = ({ setToggleSidebar, handleToggleSidebar }) => {
  const isClient = useClient();
  const authData = useSelector(selectLoginAuth);
  const navigate = useNaviagtionRouter();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const location = useRouter();
  let pathname = location?.pathname.split("/")[1];
  pathname = pathname.split("-").join(" ");
  const [prevData, setPrevData] = useState({
    name: "",
    email: "",
    password: "",
    from: "",
  });
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
  const clearPrevData = () => {
    setPrevData({
      name: "",
      email: "",
      password: "",
      from: "",
    });
  };
  const onLogout = () => {
    setToggleSidebar(false);
    localStorage.removeItem("authToken");
    dispatch(restAllData());
    toast.success("Successfully logged out!");
    location.push("/home");
  };
  return (
    <>
      <nav className="navbar dashNavbar">
        <div className="container-fluid">
          <div className="header_LeftContainer">
            <button
              className="navbarToggle_Btn "
              type="button"
              onClick={() => {
                handleToggleSidebar();
              }}
            >
              <span className="navbar-toggler-icon d-flex align-items-center justify-content-center">
                <i className="fa-solid fa-bars navbar_ToggleIcon"></i>
              </span>
            </button>
            <h3
              className="fontSize30 navItem_Txt mb-0"
              aria-current="page"
              href="#"
            >
              {pathname == "dashboard" ? (
                <h3 className="mb-0 navItem_Txt fw400 fontSize30 header_Head">
                  {" "}
                  Good Morning, <span className="fw700">John Doe</span>
                </h3>
              ) : (
                ""
                // <h3 className="mb-0 fontSize30 header_Head">{pathname}</h3>
              )}
            </h3>
          </div>

          {isClient && authData?.isLoggedIn ? (
            <div className="headerForm_Parent">
              <form className="d-flex" role="search">
                <div className="position-relative">
                  {/* <button className="header_LogoutBtn" type="button">
                    <Image
                      src={images.bellIcon}
                      alt="logoutLogo"
                      className="header_Logo"
                    />
                  </button> */}
                  {/* <span className="notification_Count">+6</span> */}
                </div>
                {/* <button className="header_LogoutBtn" type="button">
                  <Image
                    src={images.settingIcon}
                    alt="logoutLogo"
                    className="header_Logo"
                  />
                </button> */}
                <button
                  className="header_LogoutBtn"
                  type="button"
                  onClick={() => {
                    handleOpenModal("logoutModal");
                  }}
                >
                  <Image
                    src={images.logoutIcon}
                    alt="logoutLogo"
                    className="header_Logo"
                  />
                </button>
              </form>
            </div>
          ) : (
            <div className="navBtn_Parent">
              <button
                className="signup_btn fontSize17 fw500"
                onClick={() => {
                  clearPrevData();
                  handleOpenModal("SignupModal");
                }}
              >
                Signup
              </button>
              <button
                className="logout_btn navLogin_Btn fontSize17 fw500"
                onClick={() => {
                  clearPrevData();
                  handleOpenModal("loginModal");
                }}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </nav>

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
              onOpenModal={(flag) => handleOpenModal(flag)}
              close={() => handleOnCloseModal()}
              clearPrevData={clearPrevData}
              setPrevData={setPrevData}
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
          ) : modalDetail.flag === "logoutModal" ? (
            <LogoutModal close={() => handleOnCloseModal()} logout={onLogout} />
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
              {/* <p onClick={handleOnCloseModal} className="modal_Cancle">
                <i className="fa-solid fa-xmark cancleLogo"></i>
              </p> */}
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
              {/* <p onClick={handleOnCloseModal} className="modal_Cancle">
                <i className="fa-solid fa-xmark cancleLogo"></i>
              </p> */}
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
                <Image src={images.mainLogo} alt="mainLogo" />
                <h1 className="modal_Head  fontSize24 white mb-2">
                  {prevData?.from == "Forgot"
                    ? "Forgot Password?"
                    : "Verify your email address"}
                </h1>
                <p className="verifySubHeading">
                  Enter the 4-digit code sent to you at {prevData?.email}
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
          ) : modalDetail.flag === "forgetModal" ? (
            <>
              <div className="modal_Header">
                <Image src={images.mainLogo} alt="mainLogo" />
                <h1 className="modal_Head  fontSize24 white mb-0">
                  Forgot Password?
                </h1>
                <p className="verifySubHeading">
                  Please enter your email address and we'll send you
                  instructions to reset your password.
                </p>
              </div>
              {/* <p onClick={handleOnCloseModal} className="modal_Cancle">
                <i className="fa-solid fa-xmark cancleLogo"></i>
              </p> */}
              <Image
                onClick={handleOnCloseModal}
                src={images.cross}
                width={24}
                height={24}
                className="modal_Cancle"
              />
            </>
          ) : modalDetail.flag === "createNewPassword" ? (
            <>
              <div className="modal_Header">
                <Image src={images.mainLogo} alt="mainLogo" />
                <h1 className="modal_Head  fontSize24 white mb-2">
                  Create New Password
                </h1>
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
          ) : modalDetail.flag === "logoutModal" ? (
            <>
              <div className="modal_Header">
                <Image src={images.mainLogo} alt="mainLogo" />
                <h1 className="modal_Head  fontSize24 white mb-2">
                  Confirm Logout
                </h1>
                <p className="areYouSureText mb-0">
                  Are you sure you want to logout?
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
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  );
};

export default Header;
