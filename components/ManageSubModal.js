import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as images from "./../utilities/images";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, selectLoginAuth } from "../redux/slices/auth";
import moment from "moment-timezone";
import CustomModal from "./modals/CustomModal";
import UnsubscribeModal from "./UnsubscribeModal";
import { ApiClient } from "../utilities/api";
import { AUTH_API_URL } from "../utilities/config";
import { toast } from "react-toastify";

const ManageSubModal = () => {
  const authData = useSelector(selectLoginAuth);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState(null);
  const [key, setKey] = useState(Math.random());
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });

  const handleOnCloseModal = () => {
    setModalDetail({
      show: false,
      title: "",
      flag: "",
    });
    setKey(Math.random());
  };

  const handleOpenModal = (flag) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
  };

  const getProfile = () => {
    dispatch(
      getUserProfile({
        params: {},
        callback: (res, error) => {
          if (res) {
            setUserData(res?.data?.payload);
          }
        },
      })
    );
  };

  const handleUnsubscribe = async () => {
    try {
      const res = await ApiClient.patch(
        `${AUTH_API_URL}/api/v1/users/cancel/subscription`
      );
      toast.success(res?.data?.msg);
      getProfile();
    } catch (error) {
      console.log(error, "+++");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && authData) {
      setUserData(authData?.usersInfo?.user);
    }
  }, [authData]);

  console.log(userData?.user_subscription[0]?.payment_data, '+++')

  return (
    <div>
      {(userData?.membership_status == 1 ||
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
            {/* <button
              className={`unsubscribe_button ${userData?.membership_status == 3 ? 'strike-through-box' : ''}`}
              onClick={() => { handleOpenModal("unsubModal") }}
              disabled={userData?.membership_status == 3}
            >
              {userData?.membership_status == 3 ? 'Un-Subscribed' : 'Un-Subscribe'}
            </button> */}
          </div>
        )}

      <div className="joinDateParent">
        <Image src={images.calenderLogo} alt="img" />
        <span className="joinDateTxt fontSize14">Joined {moment(userData?.user_subscription[0]?.start_date).format('D MMMM YYYY')}</span>
      </div>
      {/* <div className="billingDetailsParent">
        <h2 className="fontSize20 fw700 white mb-0">Billing Details</h2>
        <div className="billingDetailsBox">
          <div>
            <h3 className="fontSize18 fw700 white">Mastercard</h3>
            <h5 className="joinDateTxt fontSize14 fw500 mb-0">**-6786</h5>
          </div>
          <h5 className="fontSize14 fw700 white mb-0">Update Details</h5>
        </div>
      </div> */}
      <button
        className={`cancelMemberShipBtn ${userData?.membership_status == 3 ? 'strike-through-box' : ''}`}
        onClick={() => { handleOpenModal("unsubModal") }}
        disabled={userData?.membership_status == 3}
      >
        {userData?.membership_status == 3 ? 'Cancelled' : 'Cancel Membership'}
      </button>

      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={"commonWidth"}
        ids={""}
        child={modalDetail.flag === "unsubModal" ? (
          <UnsubscribeModal
            close={() => handleOnCloseModal()}
            unsub={handleUnsubscribe}
          />
        ) : (
          ""
        )
        }
        header={modalDetail.flag === "unsubModal" ? (
          <>
            <div className="modal_Header">
              <Image src={images.mainLogo} alt="mainLogo" />
              <h1 className="modal_Head  fontSize24 white mb-2">
                Confirm Cancellation
              </h1>
              <p className="areYouSureText mb-0">
                Are you sure you want to cancel your {userData?.membership_type == 1
                  ? "Standard"
                  : userData?.membership_type == 2
                    ? "Premium"
                    : "Deluxe"} membership ?
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
    </div>
  );
};

export default ManageSubModal;
