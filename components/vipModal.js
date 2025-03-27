import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as images from "../utilities/images";
import "react-tabs/style/react-tabs.css";
import { useSelector } from "react-redux";
import CreateNewPassword from "./createNewPassword";
import ForgetModal from "./forgetModal";
import VerifyOtpModal from "./verifyOtpModal";
import LoginModal from "./loginModal";
import CustomModal from "./modals/CustomModal";
import SignUpModal from "./signUpModal";
import { ApiClient } from "../utilities/api";
import { AUTH_API_URL } from "../utilities/config";
import StripeSubscribe from "../pages/stripeSubscribe/StripeSubscribe";
import { selectLoginAuth } from "../redux/slices/auth";

const VipModal = ({ tokenDetail, close }) => {
  const authData = useSelector(selectLoginAuth);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
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
    data: {},
  });

  //closeModal
  const handleOnCloseModal = () => {
    setModalDetail({
      show: false,
      title: "",
      flag: "",
      data: {},
    });
    setKey(Math.random());
  };

  // open modal
  const handleOpenModal = (flag, data = {}) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
      data,
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

  useEffect(() => {
    if (typeof window !== "undefined" && authData) {
      setUserData(authData?.usersInfo?.user);
    }
  }, [authData]);

  const getAllStripeProductList = async () => {
    try {
      const res = await ApiClient.get(`${AUTH_API_URL}/api/v1/payment_plans`);
      setProducts(res.data.payload.sort((a, b) => a.id - b.id));
    } catch (error) {
      console.log(error, "+++");
    }
  };

  useEffect(() => {
    getAllStripeProductList();
  }, []);

  return (
    <>
      <div className="container-fluid plansModal">
        <div className="row">
          {products.length > 0 ? (
            products?.map((item, inx) => (
              <div className="col-lg-4 col-md-12 mb-4" key={inx}>
                <div
                  className={`planCardHeading subscription_Box ${item?.id == 1
                      ? "subscription_BoxFirst"
                      : item?.id == 2
                        ? "premium_Box"
                        : "deluxe"
                    } `}
                >
                  <h3 className="planCardHeading fontSize32 white mb-0 pt-3">
                    {item?.name}{" "}
                    {userData?.membership_status == 1 &&
                      userData?.membership_type == item?.id &&
                      "✔"}
                  </h3>
                  {/* <p className="fontSize14 white mb-0">{item?.description}</p> */}
                  <p className="subs_Price fontSize24 blue mb-0">
                    ${item?.cost}
                    <span className="fontSize16 white fw700">/month</span>
                  </p>
                  {userData?.membership_status !== 1 && (
                    <button
                      className="subs_Btn"
                      onClick={() =>
                        handleOpenModal(
                          localStorage.getItem("authToken")
                            ? "purchaseModal"
                            : "loginModal",
                          item
                        )
                      }
                    >
                      Buy plan
                    </button>
                  )}
                  <ul className="subs_Offer mb-0">
                    {item?.extra_data?.length > 0 ? (
                      item?.extra_data?.map((x, i) => (
                        <li key={i}>
                          <i className="fa-solid fa-check checkLogo"></i>{" "}
                          {x?.info}
                        </li>
                      ))
                    ) : (
                      <></>
                    )}
                  </ul>


                  {item?.id == 2 && (
                    <div className="mostPopular_Txt fontSize16 white">
                      Most Popular
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
          {/* <div className="col-lg-4 col-md-12 mb-4">
          //   <div className="subscription_Box subscription_BoxFirst">
          //     <h3 className="fontSize32 white mb-0 pt-3">Standard</h3>
          //     <p className="subs_Price fontSize24 blue mb-0">
          //       AU$ {products?.find(x => x?.product?.name == 'Standard')?.unit_amount}<span className="fontSize16 white fw700">/month</span>
          //     </p>
          //     <button className="subs_Btn" onClick={() => handleOpenModal('purchaseModal', products?.find(x => x?.product?.name == 'Standard'))}>Buy plan</button>
          //     <ul className="subs_Offer mb-0">
          //       <li>
          //         <i class="fa-solid fa-check checkLogo"></i> 10 entries into
          //         every giveaway
          //       </li>
          //       <li>
          //         <i class="fa-solid fa-check checkLogo"></i> Free Standard
          //         edition PPT for each new collection
          //       </li>
          //       <li>
          //         <i class="fa-solid fa-check checkLogo"></i> Access to
          //         members only giveaways
          //       </li>
          //       <li>
          //         <i class="fa-solid fa-check checkLogo"></i> 10% Discount on
          //         collectables
          //       </li>
          //       <li>
          //         <i class="fa-solid fa-check checkLogo"></i> Access to VIP
          //         Exclusive collectables
          //       </li>
          //     </ul>
          //   </div>
           </div>
           <div className="col-lg-4 col-md-12 mb-4">
          //   <div className="subscription_Box premium_Box">
          //     <h3 className="fontSize32 white mb-0 pt-3">Premium</h3>
          //     <p className="subs_Price fontSize24 blue mb-0">
          //       AU$ {products?.find(x => x?.product?.name == 'Premium')?.unit_amount}<span className="fontSize16 white fw700">/month</span>
          //     </p>
          //     <button className="subs_Btn" onClick={() => handleOpenModal('purchaseModal', products?.find(x => x?.product?.name == 'Premium'))}>Buy plan</button>
          //     <ul className="subs_Offer mb-0">
          //       <li>
          //         <i class="fa-solid fa-check checkLogo"></i> 25 entries into
          //         every giveaway
          //       </li>
          //       <li>
          //         <i class="fa-solid fa-check checkLogo"></i> Free Standard
          //         edition PPT for each new collection
          //       </li>
          //       <li>
          //         <i class="fa-solid fa-check checkLogo"></i> Access to
          //         members only giveaways
          //       </li>
          //       <li>
          //         <i class="fa-solid fa-check checkLogo"></i> 20% Discount on
          //         collectables
          //       </li>
          //       <li>
          //         <i class="fa-solid fa-check checkLogo"></i> Access to VIP
          //         Exclusive collectables
          //       </li>
          //     </ul>

          //     <div className="mostPopular_Txt fontSize16 white">
          //       Most Popular
          //     </div>
          //   </div>
           </div>
           <div className="col-lg-4 col-md-12 mb-4">
          //   <div className="subscription_Box deluxe">
          //     <h3 className="fontSize32 white mb-0 pt-3">Deluxe</h3>
          //     <p className="subs_Price fontSize24 blue mb-0">
          //       AU$ {products?.find(x => x?.product?.name == 'Deluxe')?.unit_amount}<span className="fontSize16 white fw700">/month</span>
          //     </p>
          //     <button className="subs_Btn" onClick={() => handleOpenModal('purchaseModal', products?.find(x => x?.product?.name == 'Deluxe'))}>Buy plan</button>
          //     <ul className="subs_Offer mb-0">
          //       <li>
          //         <i class="fa-solid fa-check checkLogo"></i> 50 entries into
          //         every giveaway
          //       </li>
          //       <li>
          //         <i class="fa-solid fa-check checkLogo"></i> Free Standard
          //         edition PPT for each new collection
          //       </li>
          //       <li>
          //         <i class="fa-solid fa-check checkLogo"></i> Access to
          //         members only giveaways
          //       </li>
          //       <li>
          //         <i class="fa-solid fa-check checkLogo"></i> 10% Discount on
          //         collectables
          //       </li>
          //       <li>
          //         <i class="fa-solid fa-check checkLogo"></i> Access to VIP
          //         Exclusive collectables
          //       </li>
          //       <li>
          //         <i class="fa-solid fa-check checkLogo"></i> 1 Free
          //         Collectable per month
          //       </li>
          //     </ul>
          //   </div>
           </div> */}
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
                      : modalDetail.flag === "purchaseModal"
                        ? "purchaseSubsModal"
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
            <StripeSubscribe
              subData={modalDetail.data}
              close={() => {
                handleOnCloseModal();
                close();
              }}
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
          ) : modalDetail.flag === "purchaseModal" ? (
            <>
              <div className="modal_Header">
                <Image src={images.mainLogo} alt="mainLogo" />
                <h1 className="modal_Head  fontSize24 white mb-2">
                  Payment Amount
                </h1>
                <p className="areYouSureText mb-0">
                  {"$ " + modalDetail.data.cost}
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

export default VipModal;
