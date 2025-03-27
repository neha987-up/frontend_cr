import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as images from "./../utilities/images";
import { Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useDispatch, useSelector } from "react-redux";
import {
  PURCHASE_PLAN,
  PURCHASE_TYPE,
  TOKEN_TYPES,
} from "../constants/constants";
import { buyToken } from "../redux/slices/token";
import CreateNewPassword from "./createNewPassword";
import ForgetModal from "./forgetModal";
import VerifyOtpModal from "./verifyOtpModal";
import LoginModal from "./loginModal";
import CustomModal from "./modals/CustomModal";
import { toast } from "react-toastify";
import { calculateTimeLeft, formatDateTime } from "../utilities/globalMethods";
import SignUpModal from "./signUpModal";
import { getAllDraw } from "../redux/slices/draw";
import StripePayment from "../pages/stripe/StripePayment";
import moment from "moment-timezone";
import { selectLoginAuth } from "../redux/slices/auth";
import VipModal from "./vipModal";
import { ApiClient } from "../utilities/api";
import { AUTH_API_URL } from "../utilities/config";
import StripeSubscribe from "../pages/stripeSubscribe/StripeSubscribe";
import RefferModal from "./refferalModal";
import { selectSetting } from "../redux/slices/setting";

const GivewayModal = ({ tokenDetail, close, sortOrder }) => {
  const TOKEN_DATA = tokenDetail?.token_data ?? tokenDetail;
  const DRAW_DATA = tokenDetail?.draw_assigned ?? tokenDetail;
  const authData = useSelector(selectLoginAuth);
  const settingData = useSelector(selectSetting);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [purchaseType, setPurchaseType] = useState(PURCHASE_PLAN.STANDARD);
  const [buyingType, setBuyingType] = useState(PURCHASE_TYPE.MEMBERSHIP);
  const [key, setKey] = useState(Math.random());
  const [isImageOverlayOpen, setIsImageOverlayOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [refCode, setRefCode] = useState("");
  const [entries, setEntries] = useState(null);
  const [check, setCheck] = useState(false);
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

  const [isOver, setIsOver] = useState(true);

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
  const handleOpenModal = (flag, data) => {
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

  const purchaseToken = (intent) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setLoading(true);
      const param = {
        token_id: TOKEN_DATA?.id,
        price: getPrice(),
        token_type: TOKEN_TYPES.PROMOTIONAL,
        buying_type: buyingType,
        purchase_type: purchaseType,
        draw_id: DRAW_DATA?.id,
        intent_id: intent?.id || "",
      };

      if (refCode) {
        param.refer_code = refCode;
      }
      if (check) {
        param.points = entries;
      }

      dispatch(
        buyToken({
          params: param,
          callback: (res, error) => {
            setLoading(false);
            if (res) {
              getAllDrawList();
              toast.success(res?.data?.msg);
              close();
            } else if (error) {
            }
          },
        })
      );
    } else {
      handleOpenModal("loginModal");
      // toast.error("Please login to purchase the token");
    }
  };

  const handleGetMembership = async () => {
    if (localStorage.getItem("authToken")) {
      if (
        userData?.membership_status == 1 ||
        (userData?.membership_status == 3 &&
          moment.utc(userData?.expiry_date).local().isAfter(moment()))
      ) {
        purchaseToken({});
      } else {
        // handleOpenModal('vipMember')
        try {
          const res = await ApiClient.get(
            `${AUTH_API_URL}/api/v1/payment_plans`
          );
          const item = res.data.payload.find((x) => x.id == purchaseType);
          handleOpenModal("purchaseMembershipModal", item);
        } catch (error) {
          console.log(error, "+++");
        }
      }
    } else {
      handleOpenModal("loginModal");
    }
  };

  const getAllDrawList = () => {
    let params = {};
    if (sortOrder) {
      params.sort = sortOrder;
    }
    dispatch(
      getAllDraw({
        params: params,
        callback: (res, error) => { },
      })
    );
  };
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = calculateTimeLeft(DRAW_DATA?.end_date);
      setRemainingTime(timeLeft);
      if (moment.utc(DRAW_DATA?.end_date).local().isAfter(moment())) {
        setIsOver(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [DRAW_DATA]);

  const getPrice = () => {
    if (buyingType == PURCHASE_TYPE.INDIVIDUAL) {
      if (purchaseType == PURCHASE_PLAN.STANDARD) {
        return TOKEN_DATA?.standard_price_individual;
      } else if (purchaseType == PURCHASE_PLAN.PREMIUM) {
        return TOKEN_DATA?.premium_price_individual;
      } else if (purchaseType == PURCHASE_PLAN.DELUX) {
        return TOKEN_DATA?.delux_price_individual;
      }
    } else {
      if (purchaseType == PURCHASE_PLAN.STANDARD) {
        return TOKEN_DATA?.standard_price_membership;
      } else if (purchaseType == PURCHASE_PLAN.PREMIUM) {
        return TOKEN_DATA?.premium_price_membership;
      } else if (purchaseType == PURCHASE_PLAN.DELUX) {
        return TOKEN_DATA?.delux_price_membership;
      }
    }
  };

  const getAllMyRewards = async () => {
    try {
      const res = await ApiClient.get(`${AUTH_API_URL}/api/v1/users/my/points`);
      const data = res.data.payload.points.users;
      setEntries(
        data.reduce(
          (sum, item) => (item.is_used === 0 ? sum + item.points : sum),
          0
        )
      );
    } catch (error) {
      console.log(error, "+++");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && authData) {
      setUserData(authData?.usersInfo?.user);
    }
    if (authData?.usersInfo?.user?.membership_status == 1) {
      getAllMyRewards();
    }
    setPurchaseType(
      authData?.usersInfo?.user?.membership_type ?? PURCHASE_PLAN.STANDARD
    );
  }, [authData]);

  return (
    <>
      <div className="container-fluid">
        <div className="row mb-3">
          <div className="col-md-5">
            <div className="collectionCard position-relative">
              <div
                className={
                  purchaseType == PURCHASE_PLAN.DELUX
                    ? "border_color_gridents"
                    : purchaseType == PURCHASE_PLAN.STANDARD
                      ? "border_color border_purse_deff1"
                      : purchaseType == PURCHASE_PLAN.PREMIUM
                        ? "border_color border_purse_deff"
                        : ""
                }
              >
                <Image
                  width={100}
                  height={100}
                  src={TOKEN_DATA?.token_image}
                  className={`bigCardShapes img-fluid`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsImageOverlayOpen(TOKEN_DATA?.token_image);
                  }}
                  style={{ height: "100px" }}
                />
              </div>

              <Image
                width={700}
                height={300}
                src={DRAW_DATA?.images?.[0]?.images ?? images.giveWayImg}
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: "444px",
                  maxHeight: "444px",
                  borderRadius: "20px",
                  objectFit: "cover",
                }}
              />
            </div>
            <ul className="giveWaySmallImgList">
              {DRAW_DATA?.images?.slice(1).map((item, index) => (
                <li key={index}>
                  <Image
                    className="giveWayMultiImgs"
                    width={93}
                    height={94}
                    src={item?.images}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsImageOverlayOpen(item?.images);
                    }}
                  />
                </li>
              ))}

              {/* <li>
                <Image src={images.giveWaySmallImg} />
              </li>
              <li>
                <Image src={images.giveWaySmallImg} />
              </li>
              <li>
                <Image src={images.giveWaySmallImg} />
              </li> */}
            </ul>
          </div>
          <div className="col-md-7">
            <h1 className="fontSize18 mb-2 white">{TOKEN_DATA?.name}</h1>
            <h1 className="fontSize30 mb-4">{DRAW_DATA?.name}</h1>
            <div className="collectionInnerCard collectionInnerCard_Parent">
              <h2 className="fontSize16 mb-3">
                <Image src={images.clockIcon} className="pe-2" /> Giveaway{" "}
                {isOver ? "ended " : "ends "}
                on {formatDateTime(DRAW_DATA?.end_date)}
              </h2>
              {remainingTime?.days == 0 &&
                remainingTime?.hours == 0 &&
                remainingTime?.minutes == 0 &&
                remainingTime?.seconds == 0 ? (
                isOver ? (
                  <></>
                ) : (
                  <div className="spinnerContainer">
                    <div className="spinner"></div>
                  </div>
                )
              ) : (
                <ul className="collectionCardList">
                  {remainingTime.days > 0 && (
                    <li>
                      <h2>{remainingTime.days}</h2>
                      <span>Days</span>
                    </li>
                  )}
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
                </ul>
              )}

              <Tabs className="giveWayTab">
                <div className="customTabs__ mb-3">
                  <div className="tabs">
                    <input
                      type="radio"
                      id="radio-1"
                      name="tabs"
                      onClick={() => setBuyingType(PURCHASE_TYPE.INDIVIDUAL)}
                      checked={buyingType == PURCHASE_TYPE.INDIVIDUAL}
                    />
                    <label className="tab" for="radio-1">
                      {" "}
                      Purchase Individually
                    </label>
                    <input
                      type="radio"
                      id="radio-2"
                      name="tabs"
                      onClick={() => {
                        setBuyingType(PURCHASE_TYPE.MEMBERSHIP);
                        setPurchaseType(
                          authData?.usersInfo?.user?.membership_type ??
                          PURCHASE_PLAN.STANDARD
                        );
                      }}
                      checked={buyingType == PURCHASE_TYPE.MEMBERSHIP}
                    />
                    <label
                      className={`tab ${buyingType == PURCHASE_TYPE.MEMBERSHIP
                        ? "activeTab__"
                        : ""
                        }`}
                      for="radio-2"
                    >
                      Membership Options
                    </label>
                    <span
                      className={`glider ${buyingType == PURCHASE_TYPE.MEMBERSHIP
                        ? "activeglider"
                        : ""
                        }`}
                    ></span>
                  </div>
                </div>

                {buyingType == PURCHASE_TYPE.INDIVIDUAL && (
                  <div>
                    <div className="row">
                      <div className="col-md-4">
                        <div
                          onClick={() =>
                            setPurchaseType(PURCHASE_PLAN.STANDARD)
                          }
                          className={
                            purchaseType == PURCHASE_PLAN.STANDARD
                              ? "border_purse_deff1 purchaseCard purchaseActive"
                              : "border_purse_deff1 purchaseCard"
                          }
                          style={
                            purchaseType == PURCHASE_PLAN.STANDARD
                              ? { borderWidth: "4px" }
                              : {}
                          }
                        >
                          <p className="fontSize14 mb-0">Standard</p>
                          <h3 className="fontSize30 mb-0">
                            ${TOKEN_DATA?.standard_price_individual ?? 0}
                          </h3>
                          <span className="fontSize12">
                            {buyingType == PURCHASE_TYPE.MEMBERSHIP
                              ? TOKEN_DATA?.no_of_enteries_standard_membership
                              : TOKEN_DATA?.no_of_enteries_standard_individual}{" "}
                            entries
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="">
                          <div
                            onClick={() =>
                              setPurchaseType(PURCHASE_PLAN.PREMIUM)
                            }
                            className={
                              purchaseType == PURCHASE_PLAN.PREMIUM
                                ? "border_purse_deff purchaseCard purchaseActive"
                                : "border_purse_deff purchaseCard"
                            }
                          >
                            <p className="fontSize14 mb-0">premium</p>
                            <h3 className="fontSize30 mb-0">
                              ${TOKEN_DATA?.premium_price_individual ?? 0}
                            </h3>
                            <span className="fontSize12">
                              {buyingType == PURCHASE_TYPE.MEMBERSHIP
                                ? TOKEN_DATA?.no_of_enteries_premium_membership
                                : TOKEN_DATA?.no_of_enteries_premium_individual}{" "}
                              {/* {TOKEN_DATA?.no_of_enteries_premium_membership}{" "} */}
                              entries
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="border_color_grident">
                          {/* style={purchaseType == PURCHASE_PLAN.DELUX ? {  } : {}} */}
                          <div
                            onClick={() => setPurchaseType(PURCHASE_PLAN.DELUX)}
                            className={
                              purchaseType == PURCHASE_PLAN.DELUX
                                ? "border_purse_deff2 purchaseCard purchaseActive"
                                : "purchaseCard"
                            }
                          >
                            <p className="fontSize14 mb-0">deluxe</p>
                            <h3 className="fontSize30 mb-0">
                              ${TOKEN_DATA?.delux_price_individual ?? 0}
                            </h3>
                            <span className="fontSize12">
                              {buyingType == PURCHASE_TYPE.MEMBERSHIP
                                ? TOKEN_DATA?.no_of_enteries_delux_membership
                                : TOKEN_DATA?.no_of_enteries_delux_individual}{" "}
                              {/* {TOKEN_DATA?.no_of_enteries_delux_membership} */}
                              entries
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="giveWayButtonOuter">
                      <p className="freeVipMem mb-0">
                        Free with the VIP Membership
                      </p>
                      <button
                        onClick={() =>
                          handleOpenModal(
                            localStorage.getItem("authToken")
                              ? "purchaseModal"
                              : "loginModal"
                          )
                        }
                        className="common_Btn w-100 mt-3"
                        disabled={isOver || tokenDetail?.is_expired == 1}
                      >
                        {loading ? (
                          <div className="spinner"></div>
                        ) : tokenDetail?.is_expired == 1 ? (
                          "Winner Assigned"
                        ) : (
                          "Buy Now"
                        )}
                      </button>
                    </div>

                    {/* <p className="fontSize16">{DRAW_DATA?.description}</p> */}
                  </div>
                )}

                {buyingType == PURCHASE_TYPE.MEMBERSHIP && (
                  <div>
                    <div className="row">
                      <div
                        className={`col-md-4 ${userData?.membership_status == 1 ||
                          (userData?.membership_status == 3 &&
                            moment
                              .utc(userData?.expiry_date)
                              .local()
                              .isAfter(moment()))
                          ? userData?.membership_type ==
                            PURCHASE_PLAN.STANDARD
                            ? ""
                            : "blur-container"
                          : ""
                          }`}
                      >
                        <div
                          onClick={() =>
                            userData?.membership_status == 1 ||
                              (userData?.membership_status == 3 &&
                                moment
                                  .utc(userData?.expiry_date)
                                  .local()
                                  .isAfter(moment()))
                              ? false
                              : setPurchaseType(PURCHASE_PLAN.STANDARD)
                          }
                          className={
                            purchaseType == PURCHASE_PLAN.STANDARD
                              ? "border_purse_deff1 purchaseCard memberShipActive"
                              : "border_purse_deff1 purchaseCard"
                          }
                        >
                          <p className="fontSize14 mb-0">Standard</p>
                          <h3 className="fontSize30 mb-0">
                            {(userData?.membership_status == 1 ||
                              (userData?.membership_status == 3 &&
                                moment
                                  .utc(userData?.expiry_date)
                                  .local()
                                  .isAfter(moment()))) &&
                              userData?.membership_type ==
                              PURCHASE_PLAN.STANDARD ? (
                              "Free"
                            ) : (
                              <>
                                ${TOKEN_DATA?.standard_price_membership ?? 0}
                                <span className="fontSize12">/month</span>
                              </>
                            )}
                          </h3>
                          <span className="fontSize12">
                            {buyingType == PURCHASE_TYPE.MEMBERSHIP
                              ? TOKEN_DATA?.no_of_enteries_standard_membership
                              : TOKEN_DATA?.no_of_enteries_standard_individual}{" "}
                            entries into EVERY Giveway
                          </span>
                        </div>
                      </div>
                      <div
                        className={`col-md-4 ${userData?.membership_status == 1 ||
                          (userData?.membership_status == 3 &&
                            moment
                              .utc(userData?.expiry_date)
                              .local()
                              .isAfter(moment()))
                          ? userData?.membership_type == PURCHASE_PLAN.PREMIUM
                            ? ""
                            : "blur-container"
                          : ""
                          }`}
                      >
                        <div
                          onClick={() =>
                            userData?.membership_status == 1 ||
                              (userData?.membership_status == 3 &&
                                moment
                                  .utc(userData?.expiry_date)
                                  .local()
                                  .isAfter(moment()))
                              ? false
                              : setPurchaseType(PURCHASE_PLAN.PREMIUM)
                          }
                          className={
                            purchaseType == PURCHASE_PLAN.PREMIUM
                              ? "purchaseCard memberShipActive"
                              : "border_purse_deff purchaseCard"
                          }
                        >
                          <p className="fontSize14 mb-0">premium</p>
                          <h3 className="fontSize30 mb-0">
                            {(userData?.membership_status == 1 ||
                              (userData?.membership_status == 3 &&
                                moment
                                  .utc(userData?.expiry_date)
                                  .local()
                                  .isAfter(moment()))) &&
                              userData?.membership_type ==
                              PURCHASE_PLAN.PREMIUM ? (
                              "Free"
                            ) : (
                              <>
                                ${TOKEN_DATA?.premium_price_membership ?? 0}
                                <span className="fontSize12">/month</span>
                              </>
                            )}
                          </h3>
                          <span className="fontSize12">
                            {buyingType == PURCHASE_TYPE.MEMBERSHIP
                              ? TOKEN_DATA?.no_of_enteries_premium_membership
                              : TOKEN_DATA?.no_of_enteries_premium_individual}{" "}
                            entries into EVERY Giveway
                          </span>
                        </div>
                      </div>
                      <div
                        className={`col-md-4 ${userData?.membership_status == 1 ||
                          (userData?.membership_status == 3 &&
                            moment
                              .utc(userData?.expiry_date)
                              .local()
                              .isAfter(moment()))
                          ? userData?.membership_type == PURCHASE_PLAN.DELUX
                            ? ""
                            : "blur-container"
                          : ""
                          }`}
                      >
                        <div
                          className="border_color_grident"
                        // style={
                        //   purchaseType == PURCHASE_PLAN.DELUX
                        //     ? { padding: "2px" }
                        //     : {}
                        // }
                        >
                          <div
                            onClick={() =>
                              userData?.membership_status == 1 ||
                                (userData?.membership_status == 3 &&
                                  moment
                                    .utc(userData?.expiry_date)
                                    .local()
                                    .isAfter(moment()))
                                ? false
                                : setPurchaseType(PURCHASE_PLAN.DELUX)
                            }
                            className={
                              purchaseType == PURCHASE_PLAN.DELUX
                                ? "border_purse_deff2 purchaseCard memberShipActive"
                                : "purchaseCard"
                            }
                          >
                            <p className="fontSize14 mb-0">deluxe</p>
                            <h3 className="fontSize30 mb-0">
                              {(userData?.membership_status == 1 ||
                                (userData?.membership_status == 3 &&
                                  moment
                                    .utc(userData?.expiry_date)
                                    .local()
                                    .isAfter(moment()))) &&
                                userData?.membership_type ==
                                PURCHASE_PLAN.DELUX ? (
                                "Free"
                              ) : (
                                <>
                                  ${TOKEN_DATA?.delux_price_membership ?? 0}
                                  <span className="fontSize12">/month</span>
                                </>
                              )}
                            </h3>
                            <span className="fontSize12">
                              {buyingType == PURCHASE_TYPE.MEMBERSHIP
                                ? TOKEN_DATA?.no_of_enteries_delux_membership
                                : TOKEN_DATA?.no_of_enteries_delux_individual}{" "}
                              entries into EVERY Giveway
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="giveWayButtonOuter">
                      <p
                        className="freeVipMem mb-0"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleOpenModal("vipMember")}
                      >
                        More information about memberships
                      </p>
                      {userData?.membership_status == 1 &&
                        (tokenDetail?.is_expired == 1 ||
                          isOver ||
                          TOKEN_DATA?.token_order?.some(
                            (item) =>
                              item?.user_id === userData?.id &&
                              item?.buying_type === 2 &&
                              item.purchase_type === userData?.membership_type
                          )) ? <></> :
                        (
                          <div className="useReffralOuter">
                            <div className="customCheckBox_">
                              {!refCode && entries > 0 && (
                                <>
                                  <input
                                    type="checkbox"
                                    id="html"
                                    checked={check}
                                    onChange={(e) => setCheck(e.target.checked)}
                                  />
                                  <label for="html">
                                    Use referral entries ({entries} entries)
                                  </label>
                                </>
                              )}
                            </div>
                            {!check && <p
                              style={{
                                cursor: "pointer",
                                fontSize: "16",
                                fontWeight: "600",
                                marginBottom: "0",
                                color: refCode ? "green" : "#3465E5",
                              }}
                              onClick={() => !refCode && handleOpenModal("refer")}
                            >
                              {refCode ? '✔ Referral code applied' : 'Have a referral code?'}
                            </p>}
                          </div>
                        )}
                      <button
                        onClick={() => handleGetMembership()}
                        className="common_Btn w-100 mt-3"
                        disabled={
                          tokenDetail?.is_expired == 1 ||
                          isOver ||
                          TOKEN_DATA?.token_order?.some(
                            (item) =>
                              item?.user_id === userData?.id &&
                              item?.buying_type === 2 &&
                              item.purchase_type === userData?.membership_type
                          )
                        }
                      >
                        {loading ? (
                          <div className="spinner"></div>
                        ) : userData?.membership_status == 1 ||
                          (userData?.membership_status == 3 &&
                            moment
                              .utc(userData?.expiry_date)
                              .local()
                              .isAfter(moment())) ? (
                          TOKEN_DATA?.token_order?.some(
                            (item) =>
                              item?.user_id === userData?.id &&
                              item?.buying_type === 2 &&
                              item.purchase_type === userData?.membership_type
                          ) ? (
                            "VIP entries already claimed"
                          ) : (
                            "Claim your free entries"
                          )
                        ) : tokenDetail?.is_expired == 1 ? (
                          "Winner Assigned"
                        ) : (
                          "Buy Now"
                        )}
                      </button>
                    </div>
                    {/* <div
                    className="shopDescription"
                    dangerouslySetInnerHTML={{
                      __html: DRAW_DATA?.description,
                    }}
                  /> */}
                    {/* <p className="fontSize16">{DRAW_DATA?.description}</p> */}
                  </div>
                )}
              </Tabs>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div
              className="shopDescription"
              dangerouslySetInnerHTML={{
                __html: DRAW_DATA?.description,
              }}
            />
          </div>
        </div>
      </div>
      {isImageOverlayOpen && (
        <div
          className="imageOverlay"
          onClick={() => setIsImageOverlayOpen(false)}
        >
          <img
            src={isImageOverlayOpen}
            alt="Full view"
            className="overlayImage"
          />
          <button
            className="closeButton"
            onClick={(e) => {
              e.stopPropagation();
              setIsImageOverlayOpen(false);
            }}
          >
            ✖
          </button>
        </div>
      )}
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
                      : modalDetail.flag === "vipMember"
                        ? "vipMemberModal"
                        : modalDetail.flag === "refer"
                          ? "referModal"
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
              tokenData={TOKEN_DATA}
              purchaseToken={(intent) => purchaseToken(intent)}
              amount={getPrice()}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "vipMember" ? (
            <VipModal close={() => handleOnCloseModal()} />
          ) : modalDetail.flag === "purchaseMembershipModal" ? (
            <StripeSubscribe
              noClose={true}
              subData={modalDetail.data}
              close={() => {
                handleOnCloseModal();
              }}
            />
          ) : modalDetail.flag === "refer" ? (
            <RefferModal
              close={() => handleOnCloseModal()}
              show={"half"}
              refferdata={(val) => setRefCode(val)}
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
                <p className="areYouSureText mb-0">{"$" + getPrice()}</p>
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
          ) : modalDetail.flag === "vipMember" ? (
            <>
              <h1 className="modal_Head  fontSize24 white mb-2">
                Become a VIP member Now!
              </h1>

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
          ) : modalDetail.flag === "purchaseMembershipModal" ? (
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
          ) : modalDetail.flag === "refer" ? (
            <>
              <div className="modal_Header">
                <h1 className="modal_Head  fontSize24 white mb-2">
                  Refer & Earn
                </h1>
                <p className="verifySubHeading">
                  Enter your friends code for{" "}
                  {
                    settingData?.settings?.find(
                      (x) => x?.setting_name == "referral_reward_to_other"
                    )?.setting_value
                  }{" "}
                  free entries into your first giveaway
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
      />
    </>
  );
};

export default GivewayModal;
