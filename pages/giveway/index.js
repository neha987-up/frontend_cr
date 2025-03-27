import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as images from "./../../utilities/images";
import {
  getAllDraw,
  getAllDrawWithoutAuth,
  selectDraw,
} from "../../redux/slices/draw";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginAuth } from "../../redux/slices/auth";
import GivewayModal from "../../components/givewayModal";
import CustomModal from "../../components/modals/CustomModal";
import { useClient } from "../../context/ClientContext";
import GiveawayCard from "../../components/GiveawayCard";

const ActiveGiveWay = () => {
  const isClient = useClient();
  const dispatch = useDispatch();
  const authData = useSelector(selectLoginAuth);
  const drawData = useSelector(selectDraw);
  const [tokenDetail, setTokenDetail] = useState({});
  const [loading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token) {
        getAllDrawList(token, sortOrder);
      } else {
        getAllDrawListWithoutAuth(sortOrder);
      }
    }
  }, [authData, sortOrder]);

  const getAllDrawListWithoutAuth = (sort) => {
    dispatch(
      getAllDrawWithoutAuth({
        params: { sort },
        callback: (res, error) => {
          setIsLoading(false);
          if (res) {
          } else if (error) {
          }
        },
      })
    );
  };

  const getAllDrawList = (token, sort) => {
    dispatch(
      getAllDraw({
        params: { sort },
        callback: (res, error) => {
          setIsLoading(false);
          if (res) {
          } else if (error) {
          }
        },
      })
    );
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

  // open modal
  const handleOpenModal = (flag) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
  };
  const [remainingTime, setRemainingTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const handleSortChange = (event) => {
    const selectedSort = Number(event.target.value);
    setSortOrder(selectedSort);
  };

  return (
    <>
      {isClient && drawData?.allDraw?.data?.length > 0 ? (
        <>
          <div className="giveawayTopFilter">
            <h2 className="headingGivaway">Active Giveaways</h2>
            <div className="selectShortBy">
              <select
                onChange={handleSortChange}
                className="selectBoxGive"
              >
                <option value={1}>Sort By: New to Old</option>
                <option value={2}>Sort By: Old to New</option>
              </select>
            </div>
          </div>
          {drawData?.allDraw?.data?.map((item) => (
            <GiveawayCard
              item={item}
              handleOpenModal={handleOpenModal}
              setTokenDetail={setTokenDetail}
            />
          ))}
        </>
      ) : (
        <h1 className="mygiveHeading">No Active Giveaway</h1>
      )}
      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={
          modalDetail.flag === "collectionModal" ? "commonWidth" : "commonWidth"
        }
        ids={
          modalDetail.flag === "collectionModal"
            ? "collectionModal"
            : modalDetail.flag === "givewayModal"
              ? "givewayModal"
              : ""
        }
        child={
          modalDetail.flag === "givewayModal" ? (
            <GivewayModal
              tokenDetail={tokenDetail}
              close={() => handleOnCloseModal()}
              sortOrder={sortOrder}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "collectionModal" ? (
            <>
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

export default ActiveGiveWay;
