import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as images from "./../../utilities/images";
import CustomModal from "../../components/modals/CustomModal";
import NewPassword from "../../components/newPassword";
import EditProfile from "../../components/editProfile";
import {
  getImageUrl,
  getUserProfile,
  selectLoginAuth,
  updateUserProfile,
} from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../../utilities/globalMethods";
import { useClient } from "../../context/ClientContext";
import { useRouter } from "next/router";
import { ApiClient } from "../../utilities/api";
import { AUTH_API_URL } from "../../utilities/config";
import { toast } from "react-toastify";
import UnsubscribeModal from "../../components/UnsubscribeModal";
import moment from "moment-timezone";
import RefferModal from "../../components/refferalModal";
import { selectSetting } from "../../redux/slices/setting";
import ManageSubModal from "../../components/ManageSubModal";
import { restAllData } from "../../redux/slices/commonActions";

const Profile = () => {
  const dispatch = useDispatch();
  const isClient = useClient();
  const router = useRouter();
  const authData = useSelector(selectLoginAuth);
  const settingData = useSelector(selectSetting);
  const [profileImage, setProfileImage] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userData, setUserData] = useState(null);

  const [loading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      // setProfileImage(imageUrl);
      updateProfilePicture(file);
    }
  };
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (!token) router.push("/");
    }
  }, []);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && authData) {
      setUserData(authData?.usersInfo?.user);
    }
  }, [authData]);

  const getProfile = () => {
    dispatch(
      getUserProfile({
        params: {},
        callback: (res, error) => {
          if (res) {
            setUserName(res?.data?.payload?.name);
            setProfileImage(res?.data?.payload?.image);
            setUserData(res?.data?.payload);
          }
        },
      })
    );
  };
  const handleOpenModal = (flag) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
  };
  const updateProfilePicture = (file) => {
    let formData = new FormData();
    if (file) {
      formData.append("file", file);
    }

    dispatch(
      getImageUrl({
        params: formData,
        callback: (res, error) => {
          if (res?.data?.payload?.url) {
            const param = {
              image: res?.data?.payload?.url,
            };
            const Image_Url = res?.data?.payload?.url;
            dispatch(
              updateUserProfile({
                params: param,
                callback: (res, error) => {
                  // setIsLoading(false);
                  if (res) {
                    setProfileImage(Image_Url);
                    getProfile();
                  }
                },
              })
            );
          }
        },
      })
    );
  };

  const updateSettings = (value) => {
    const param = {
      notification: value == true ? 1 : 2,
    };
    dispatch(
      updateUserProfile({
        params: param,
        callback: (res, error) => {
          if (res) {
            const param = {};
            dispatch(getUserProfile({ param }));
          }
        },
      })
    );
  };

  const handleDeleteAc = async () => {
    try {
      const res = await ApiClient.delete(
        `${AUTH_API_URL}/api/v1/users/delete`
      );
      localStorage.removeItem("authToken");
      dispatch(restAllData());
      toast.success('Account Deleted Successfully');
      router.replace("/home");
    } catch (error) {
      console.log(error, "+++");
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h1 className="mygiveHeading">Your Profile</h1>
          </div>
        </div>
        <div className="row justify-content-center align-itmes-center">
          <div className="col-md-8 col-lg-6">
            <div className="profileCard text-center">
              <div className="profileContainer">
                {isClient ? (
                  <div className="imageContainer">
                    {profileImage ? (
                      <img
                        // src={authData?.usersInfo?.user?.image}
                        src={profileImage}
                        alt="Profile"
                        className="profileImage"
                      />
                    ) : (
                      <div className="placeholder">
                        <Image src={images.profile} />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="imageContainer">
                    <div className="placeholder">
                      <Image src={images.profile} />
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="uploadInput"
                  id="upload-button"
                />
                <label htmlFor="upload-button" className="uploadButton">
                  <Image src={images.cameraIcon} className="cameraIcon" />
                </label>
              </div>
              {isClient && (
                <>
                  <h1 className="fontSize28">
                    {capitalizeFirstLetter(userName ?? userData?.name)}
                    {(userData?.membership_status == 1 ||
                      (userData?.membership_status == 3 &&
                        moment
                          .utc(userData?.expiry_date)
                          .local()
                          .isAfter(moment()))) && (
                        <Image src={images.silverDaimond} className="ms-2" />
                      )}
                  </h1>
                  <p className="fontSize14 mb-3">{userData?.email}</p>

                  <button
                    className="editBtn"
                    onClick={() => {
                      handleOpenModal("editProfileModal");
                    }}
                  >
                    <Image src={images.editIcon} className="me-1" /> Edit
                    Profile
                  </button>
                  {/* {(userData?.membership_status == 1 ||
                    (userData?.membership_status == 3 &&
                      moment
                        .utc(userData?.expiry_date)
                        .local()
                        .isAfter(moment()))) && (
                    <div className="subscription_box">
                      <div className="primium_text">
                        <h3 className="premium_heading mb-0">
                          {userData?.membership_type == 1
                            ? "Standard"
                            : userData?.membership_type == 2
                            ? "Premium"
                            : "Deluxe"}
                        </h3>
                        <p className="text_prices mb-0">
                          <span className="price_primum">
                            $
                            {
                              userData?.user_subscription?.find(
                                (x) => x?.plan_id == userData?.membership_type
                              )?.amount
                            }
                          </span>
                          /month
                        </p>
                      </div>

                      <button
                        className={`unsubscribe_button`}
                        onClick={() => {
                          handleOpenModal("manageSubModal");
                        }}
                      >
                        Manage Membership
                      </button>
                    </div>
                  )} */}
                </>
              )}
            </div>
            {(userData?.membership_status == 1 ||
              (userData?.membership_status == 3 &&
                moment
                  .utc(userData?.expiry_date)
                  .local()
                  .isAfter(moment()))) && (<div
                    className="profileCardSecond cursor"
                    onClick={() => {
                      handleOpenModal("manageSubModal");
                    }}
                  >
                    <div className="profileInner">
                      <div className="profileLeft mb-0 ">
                        <div className="">
                          <Image src={images.manageMemberShipImg} />
                          <span className="fontSize16"> Manage Membership</span>
                        </div>
                      </div>
                    </div>
                  </div>)}
            <div
              className="profileCardSecond cursor mt-4"
              onClick={() => {
                handleOpenModal("newPasswordModal");
              }}
            >
              <div className="profileInner">
                <div className="profileLeft mb-0 ">
                  <div className="">
                    <Image src={images.key} />{" "}
                    <span className="fontSize16">Change Password</span>
                  </div>
                </div>
              </div>
            </div>
            {userData?.membership_status == 1 && (
              <div
                className="profileCardSecond cursor mt-4 mb-3"
                onClick={() => {
                  handleOpenModal("refer");
                }}
              >
                <div className="profileInner">
                  <div className="profileLeft mb-0 ">
                    <div className="">
                      <Image src={images.refer} />{" "}
                      <span className="fontSize16">Refer & Earn</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div
              className="profileCardSecond cursor mt-4"
              onClick={() => {
                handleOpenModal("unsubModal");
              }}
            >
              <div className="profileInner">
                <div className="profileLeft mb-0 ">
                  <div className="">
                    {/* <Image src={images.tr} />{" "} */}
                    <i className="fas fa-trash mx-2 white"></i>
                    <span className="fontSize16">Delete Account</span>
                  </div>
                </div>
              </div>
            </div>
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
          modalDetail.flag === "newPasswordModal"
            ? "commonWidth"
            : "commonWidth"
        }
        ids={
          modalDetail.flag === "newPasswordModal"
            ? "newPasswordModal"
            : modalDetail.flag === "editProfileModal"
              ? "editProfileModal"
              : modalDetail.flag === "refer"
                ? "referModal"
                : modalDetail.flag === "manageSubModal"
                  ? "manageSubModal"
                  : ""
        }
        child={
          modalDetail.flag === "newPasswordModal" ? (
            <NewPassword close={() => handleOnCloseModal()} />
          ) : modalDetail.flag === "editProfileModal" ? (
            <EditProfile
              getProfile={() => getProfile()}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "unsubModal" ? (
            <UnsubscribeModal
              close={() => handleOnCloseModal()}
              unsub={handleDeleteAc}
              del={true}
            />
          ) : modalDetail.flag === "refer" ? (
            <RefferModal close={() => handleOnCloseModal()} show="full" />
          ) : modalDetail.flag === "manageSubModal" ? (
            <ManageSubModal close={() => handleOnCloseModal()} />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "newPasswordModal" ? (
            <>
              <div className="modal_Header">
                <Image src={images.mainLogo} alt="mainLogo" />
                <h1 className="modal_Head  fontSize24 white mb-2">
                  Create New Password
                </h1>
                {/* <p className="verifySubHeading">
                  Enter the 4-digit code sent to you at +{email}
                </p> */}
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
          ) : modalDetail.flag === "editProfileModal" ? (
            <>
              <div className="modal_Header">
                {/* <Image src={images.mainLogo} alt="mainLogo" /> */}
                <h1 className="modal_Head  fontSize24 white mb-2">
                  Edit Profile
                </h1>
                {/* <p className="verifySubHeading">
                  Enter the 4-digit code sent to you at +{email}
                </p> */}
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
          ) : modalDetail.flag === "unsubModal" ? (
            <>
              <div className="modal_Header">
                <Image src={images.mainLogo} alt="mainLogo" />
                <h1 className="modal_Head  fontSize24 white mb-2">
                  Confirm Delete
                </h1>
                <p className="areYouSureText mb-0">
                  Are you sure you want to delete your account? This action is permanent and cannot be undone.
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
          ) : modalDetail.flag === "manageSubModal" ? (
            <>
              <div className="modal_Header">
                <h1 className="modal_Head  fontSize24 white mb-2">
                  Manage Membership
                </h1>
                <p className="verifySubHeading">
                  Manage and update your membership
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

export default Profile;
