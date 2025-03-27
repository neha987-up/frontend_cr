import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as images from "./../utilities/images";
import LoginModal from "./loginModal";
import CustomModal from "./modals/CustomModal";
import SignUpModal from "./signUpModal";
import VerifyOtpModal from "./verifyOtpModal";
import CreateNewPassword from "./createNewPassword";
import ForgetModal from "./forgetModal";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginAuth } from "../redux/slices/auth";
import { restAllData } from "../redux/slices/commonActions";
import { toast } from "react-toastify";
import LogoutModal from "./logoutModal";
import { useClient } from "../context/ClientContext";

const Navbar = ({ scrollToAbout, scrollToFaq }) => {
  const isClient = useClient();
  const dispatch = useDispatch();
  const authData = useSelector(selectLoginAuth);
  console.log("🐬 ~ file: navbar.js:22 ~ Navbar ~ authData:", authData);
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
    localStorage.removeItem("authToken");
    dispatch(restAllData());
    toast.success("Successfully logged out!");
  };
  return (
    <>
      <section className="navbar-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <nav className="navbar navbar-expand-lg">
                <div className="container-fluid px-0">
                  <Link className="navbar-brand" href="#">
                    <Image src={images.mainLogo} alt="logo" />
                  </Link>

                  <div
                    className="collapse navbar-collapse justify-content-center w-100"
                    id="navbarNav"
                  >
                    <ul className="navbar-nav">
                      <li className="nav-item" onClick={() => scrollToAbout()}>
                        <a
                          className="nav-link active fontSize17 fw500"
                          aria-current="page"
                          href="#"
                        >
                          About
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link fontSize17 fw500" href="/home">
                          Shop
                        </a>
                      </li>
                      <li className="nav-item" onClick={() => scrollToFaq()}>
                        <a className="nav-link fontSize17 fw500" href="#">
                          FAQ’s
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="ms-auto d-flex align-items-center">
                    {isClient && authData?.isLoggedIn ? (
                      <div className="profileLogOuter d-flex">
                        {/* <button className="header_LogoutBtn" type="button">
                          <Image
                            src={images.bellIcon}
                            alt="logoutLogo"
                            className="header_Logo"
                          />
                        </button> */}
                        <div className="dropdown">
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <Image
                              height={200}
                              width={200}
                              src={
                                authData?.usersInfo?.user?.image ??
                                images.sidebarIcon
                              }
                              // src={images.landingProfile}
                              className="landingProfile"
                            />
                          </button>
                          <ul
                            className="dropdown-menu headerCustomDropdown"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li className="mb-2">
                              <a href="/profile" className="dropdown-item">
                                <Image
                                  src={images.viewProfileIcon}
                                  className="me-2"
                                />{" "}
                                View Profile
                              </a>
                            </li>
                            <li>
                              <a
                                onClick={() => handleOpenModal("logoutModal")}
                                className="dropdown-item"
                                href="#"
                              >
                                <Image
                                  src={images.logoutIcon}
                                  className="me-2"
                                />{" "}
                                Logout
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="navBtn_Parent d-flex">
                        <button
                          className="nav_Btn fontSize17 fw500"
                          onClick={() => {
                            clearPrevData();
                            handleOpenModal("SignupModal");
                          }}
                        >
                          Signup
                        </button>
                        <button
                          className="nav_Btn navLogin_Btn fontSize17 fw500"
                          onClick={() => {
                            clearPrevData();
                            handleOpenModal("loginModal");
                          }}
                        >
                          Login
                        </button>
                      </div>
                    )}
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarNav"
                      aria-controls="navbarNav"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="navbar-toggler-icon">
                        <i className="fa-solid fa-bars navbar_ToggleIcon"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>

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
                <h1 className="modal_Head  fontSize24 white mb-12">
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

export default Navbar;
