import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as images from "./../../utilities/images";
import Link from "next/link";
import CustomModal from "../../components/modals/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllTokens, selectToken } from "../../redux/slices/token";
import { useClient } from "../../context/ClientContext";
import CollectionModal from "../../components/collectionModal";
import { selectLoginAuth } from "../../redux/slices/auth";
import {
  capitalizeFirstLetter,
  getTimeRemaining,
} from "../../utilities/globalMethods";
import GivewayModal from "../../components/givewayModal";
import VipModal from "../../components/vipModal";
import moment from "moment-timezone";
import RefferModal from "../../components/refferalModal";
import { getSettings, selectSetting } from "../../redux/slices/setting";

const Index = () => {
  const isClient = useClient();
  const authData = useSelector(selectLoginAuth);
  const settingData = useSelector(selectSetting);
  const tokendata = useSelector(selectToken);
  const TokenList = tokendata?.tokenList ?? [];
  console.log("🏋🏼‍♀️ ~ file: index.js:22 ~ Index ~ TokenList:", TokenList);
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);
  const [tokenDetail, setTokenDetail] = useState({});
  const [isImageOverlayOpen, setIsImageOverlayOpen] = useState(false);
  const [userData, setUserData] = useState(null);
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      getTokens(token);
      getAllSettings();
    }
  }, [authData]);

  const getTokens = (token) => {
    // if (token) {
    dispatch(
      getAllTokens({
        params: {},
        callback: (res, error) => {
          setIsLoading(false);
          if (res) {
          } else if (error) {
          }
        },
      })
    );
    // }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && authData) {
      setUserData(authData?.usersInfo?.user);
    }
  }, [authData]);

  const getAllSettings = () => {
    dispatch(
      getSettings({
        params: {},
        callback: (res, error) => { },
      })
    );
  };

  return (
    <>
      {/* <section className="noDataSection">
      <div className="row">
        <div className="col-md-4 mb-4">
            <div className="nodataSmallCard">
                <Image src={images.nodatSmall} className="img-fluid"/>
                <h1 className="fontSize20 mb2 fw-bold text-white">No Giveaways Available</h1>
                <p className="fontSize14">Come back later for some exciting giveaways</p>
              </div>
        </div>
        <div className="col-md-8 mb-4">
        <div className="nodataBigCard">
            <Image src={images.nodataBig} className="img-fluid"/>
            <h1 className="fontSize20 mb2 fw-bold text-white">No Tokens Available</h1>
                <p className="fontSize14">We are stocking up new token soon!</p>
          </div>
        </div>
      </div>
    </section> */}
      <section className="shopOuter pt-2">
        <div className="container-fluid">
          <div className="row">
            {isClient && (
              <div className="col-lg-3 col-md-12 mb-4">
                {TokenList?.promotioanlToken?.length > 0 ? (
                  <>
                    {TokenList?.promotioanlToken
                      ?.slice(0, 1)
                      ?.filter((item) => item?.type === 1)
                      .map((item, index) => (
                        <div
                          className="shopBigCard h-100"
                          onClick={() => {
                            setTokenDetail(item);
                            handleOpenModal("givewayModal");
                          }}
                        >
                          <Image
                            width={100}
                            height={100}
                            src={item?.token_image}
                            className="bigCardShape img-fluid"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsImageOverlayOpen(item?.token_image);
                            }}
                          />

                          <Image
                            width={400}
                            height={400}
                            style={{ borderRadius: "20px" }}
                            src={item?.draw_assigned?.images[0]?.images}
                            className="shopBigImg img-fluid"
                            alt="image"
                          />
                          <h1 className="fontSize20">
                            {item?.draw_assigned?.name}
                          </h1>
                          <p className="bigCardSub mb-0">
                            {getTimeRemaining(item?.draw_assigned?.end_date)}
                          </p>
                        </div>
                      ))}
                  </>
                ) : (
                  // <section className="noDataSection h-100">
                  //   <div className="row h-100">
                  //     <div className="col-md-12 mb-4">
                  <div className="nodataSmallCard">
                    <Image src={images.shopDummy1} className="img-fluid" />
                    <h1 className="fontSize20 mb2 fw-bold text-white">
                      No Giveaways Available
                    </h1>
                    <p className="fontSize14">
                      Come back later for some exciting giveaways
                    </p>
                  </div>
                  //     </div>
                  //   </div>
                  // </section>
                )}
              </div>
            )}
            <div className="col-lg-6 col-md-12 mb-md-4 mb-0">
              {isClient && (
                <div className="row h-100">
                  {TokenList?.otheToken?.length > 0 ? (
                    <>
                      {TokenList?.otheToken
                        ?.slice(0, 4)
                        .filter((item) => item?.type === 2)
                        .map((item, index) => (
                          <div
                            className="col-sm-6 col-md-6"
                            key={item?.id || index}
                            onClick={() => {
                              setTokenDetail(item);
                              handleOpenModal("collectionModal");
                            }}
                          >
                            <div className="shopSmallCard shop___  ">
                              <Image
                                width={704}
                                height={119}
                                src={item?.token_image || images.shopSmallImg} // Add fallback in case the image is not available
                                alt={item?.name || "default alt text"}
                                className="img-fluid"
                              // style={{ objectFit: "cover" }}
                              />

                              <div className="smallCardFoot">
                                <h1 className="fontSize20">
                                  {capitalizeFirstLetter(item?.name)}
                                </h1>
                                {/* <p className="bigCardSub mb-0">Standard</p> */}
                              </div>
                            </div>
                          </div>
                        ))}
                    </>
                  ) : (
                    <div className="col-md-12  h-100">
                      <div className="nodataBigCard h-100">
                        <Image src={images.shopDummy22} className="img-fluid" />
                        <h1 className="fontSize20 mb2 fw-bold text-white">
                          No Tokens Available
                        </h1>
                        <p className="fontSize14">
                          We are stocking up new token soon!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="col-lg-3 col-sm-12 position-relative mb-4">
              <div
                className={
                  userData?.membership_status == 1 ||
                    (userData?.membership_status == 3 &&
                      moment.utc(userData?.expiry_date).local().isAfter(moment()))
                    ? "h-100"
                    : "vipCardLayout h-100"
                }
              >
                {userData?.membership_status == 1 ||
                  (userData?.membership_status == 3 &&
                    moment
                      .utc(userData?.expiry_date)
                      .local()
                      .isAfter(moment())) ? (
                  <></>
                ) : (
                  <div className="vipCardText">
                    <p>
                      Only Available for
                      <br />
                      V.I.P Members
                    </p>
                    <Link href="" onClick={() => handleOpenModal("vipMember")}>
                      Become a member now
                    </Link>
                  </div>
                )}
                {isClient && (
                  <div className="row h-100">
                    {TokenList?.vipToken?.length > 0 ? (
                      TokenList?.vipToken
                        ?.slice(0, 2)
                        .filter((item) => item?.type === 2)
                        ?.map((item, index) => (
                          <div
                            className={`col-lg-12 col-md-6 col-sm-6 ${index === 1 ? "" : ""
                              }`}
                            key={item?.id || index}
                            onClick={() => {
                              setTokenDetail(item);
                              handleOpenModal("collectionModal");
                            }}
                          >
                            <div className="shopSmallCard">
                              <Image
                                width={704}
                                height={119}
                                src={item?.token_image || images.shopSmallImg} // Add fallback in case the image is not available
                                alt={item?.name || "default alt text"}
                                className="img-fluid"
                              // style={{ objectFit: "cover" }}
                              />

                              <div className="smallCardFoot">
                                <h1 className="fontSize20">
                                  {capitalizeFirstLetter(item?.name)}
                                </h1>
                                {/* <p className="bigCardSub mb-0">Standard</p> */}
                              </div>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="col-md-12  h-100 ">
                        <div className="nodataBigCard h-100">
                          <Image
                            src={images.shopDummy22}
                            className="img-fluid"
                          />
                          <h1 className="fontSize20 mb2 fw-bold text-white">
                            No Tokens Available
                          </h1>
                          <p className="fontSize14">
                            We are stocking up new token soon!
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          {userData?.membership_status == 1 ? (
            <div className="row mt-3" onClick={() => handleOpenModal("refer")}>
              <div className="col-md-12">
                <Image src={images.referImg} className="vipImg img-fluid" />
                <Image
                  src={images.referImgSmall}
                  className="vipImgSmall img-fluid"
                />
              </div>
            </div>
          ) : (
            <div
              className="row mt-3"
              onClick={() => handleOpenModal("vipMember")}
            >
              <div className="col-md-12">
                <Image
                  src={images.vipImg}
                  className="vipImg img-fluid cursorPointer"
                />
                <Image src={images.small} className="vipImgSmall img-fluid" />
              </div>
            </div>
          )}
        </div>
      </section>
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
              e.stopPropagation(); // Prevent overlay click from closing
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
        className="commonWidth"
        ids={
          modalDetail.flag === "collectionModal"
            ? "collectionModal"
            : modalDetail.flag === "vipMember"
              ? "vipMemberModal"
              : modalDetail.flag === "givewayModal"
                ? "givewayModal"
                : modalDetail.flag === "refer"
                  ? "referModal"
                  : "givewayModal"
        }
        child={
          modalDetail.flag === "collectionModal" ? (
            <CollectionModal
              tokenDetail={tokenDetail}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "givewayModal" ? (
            <GivewayModal
              tokenDetail={tokenDetail}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "vipMember" ? (
            <VipModal close={() => handleOnCloseModal()} />
          ) : modalDetail.flag === "refer" ? (
            <RefferModal close={() => handleOnCloseModal()} show="top" />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "collectionModal" ? (
            <>
              {/* <div className="modal_Header">
                <Image src={images.mainLogo} alt="mainLogo" />
                <h1 className="modal_Head  fontSize24 white mb-2">
                  Verify your email address
                </h1>
                <p className="verifySubHeading">
                  Enter the 4-digit code sent to you at +{email}
                </p>
              </div> */}
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
          ) : modalDetail.flag === "givewayModal" ? (
            <>
              {/* <div className="modal_Header">
                <Image src={images.mainLogo} alt="mainLogo" />
                <h1 className="modal_Head  fontSize24 white mb-2">
                  Verify your email address
                </h1>
                <p className="verifySubHeading">
                  Enter the 4-digit code sent to you at +{email}
                </p>
              </div> */}
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
          ) : modalDetail.flag === "vipMember" ? (
            <>
              <h1 className="modal_Head  fontSize24 white mb-2">
                Become a VIP member Now!
              </h1>

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
          ) : modalDetail.flag === "refer" ? (
            <>
              <div className="modal_Header">
                <h1 className="modal_Head  fontSize24 white mb-2">
                  Refer & Earn
                </h1>
                <p className="verifySubHeading">
                  Refer a friend and & get{" "}
                  {
                    settingData?.settings?.find(
                      (x) => x?.setting_name == "referral_reward_to_owner"
                    )?.setting_value
                  }{" "}free bonus entries to a giveaway of your choice<br />Your friend will also receive {
                    settingData?.settings?.find(
                      (x) => x?.setting_name == "referral_reward_to_other"
                    )?.setting_value
                  } free entries
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

export default Index;
