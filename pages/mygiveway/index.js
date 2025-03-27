import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as images from "./../../utilities/images";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginAuth } from "../../redux/slices/auth";
import { getMyDraw, selectDraw } from "../../redux/slices/draw";
import { formatDateTime } from "../../utilities/globalMethods";
import { useClient } from "../../context/ClientContext";
import { PURCHASE_PLAN, PURCHASE_TYPE } from "../../constants/constants";
import { useRouter } from "next/router";
import CustomModal from "../../components/modals/CustomModal";
import Entries from "./Entries";

const MyGiveWay = () => {
  const isClient = useClient();
  const router = useRouter();
  const dispatch = useDispatch();
  const authData = useSelector(selectLoginAuth);
  const drawData = useSelector(selectDraw);
  const [loading, setIsLoading] = useState(false);
  const [key, setKey] = useState(Math.random());
  const [modalDetail, setModalDetail] = useState({
    show: false,
    flag: "",
    ent: [],
  });

  //closeModal
  const handleOnCloseModal = () => {
    setModalDetail({
      show: false,
      title: "",
      ent: [],
    });
    setKey(Math.random());
  };

  // open modal
  const handleOpenModal = (flag, ent) => {
    setModalDetail({
      show: true,
      flag: flag,
      ent,
    });
    setKey(Math.random());
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/");
      } else {
        getMyDrawList(token);
      }
    }
  }, [authData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (!token) router.push("/");
    }
  }, []);

  const getMyDrawList = (token) => {
    // if (token) {
    dispatch(
      getMyDraw({
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
  const getEntries = (buyId, purchase_type, item) => {
    if (buyId == PURCHASE_TYPE.INDIVIDUAL) {
      if (purchase_type == PURCHASE_PLAN.STANDARD) {
        return item?.no_of_enteries_standard_individual;
      } else if (purchase_type == PURCHASE_PLAN.PREMIUM) {
        return item?.no_of_enteries_premium_individual;
      } else if (purchase_type == PURCHASE_PLAN.DELUX) {
        return item?.no_of_enteries_delux_individual;
      }
    } else {
      if (purchase_type == PURCHASE_PLAN.STANDARD) {
        return item?.no_of_enteries_standard_membership;
      } else if (purchase_type == PURCHASE_PLAN.PREMIUM) {
        return item?.no_of_enteries_premium_membership;
      } else if (purchase_type == PURCHASE_PLAN.DELUX) {
        return item?.no_of_enteries_delux_membership;
      }
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {isClient && drawData?.myDrawList?.users?.length > 0 ? (
            <div className="col-md-12">
              <div className="commonTableOuter table-responsive">
                <h1 className="mygiveHeading">My Giveaways</h1>
                <table className="common_Table dashBoard_Table">
                  <thead>
                    <tr>
                      <th>DRAW NAME</th>
                      {/* <th>DESCRIPTION</th> */}
                      <th>NO. OF ENTRIES</th>
                      <th>Winning Entry</th>
                      <th className="text-start" style={{ width: "191px" }}>
                        GIVEAWAY ENDS IN
                      </th>
                      <th className="text-end" ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {drawData?.myDrawList?.users?.map((item) => (
                      <tr>
                        <td>
                          <Image
                            height={100}
                            width={100}
                            src={item?.draw_data?.images?.[0]?.images}
                            className="givewaytableIcon"
                          />
                          {item?.draw_data?.name}
                        </td>
                        {/* <td>
                          <div
                            style={{
                              color: "white",
                              marginTop: 16,
                            }}
                            className="w-25 pe-3"
                            dangerouslySetInnerHTML={{
                              __html: `${
                                item?.draw_data?.description?.substring(
                                  0,
                                  30
                                ) || ""
                              }`,
                            }}
                          />
                        </td> */}
                        <td>
                          {/* {getEntries(
                            item?.order_data?.buying_type,
                            item?.order_data?.purchase_type,
                            item?.token_data
                          )} */}
                          {item?.draw_data?.enteries?.length}
                        </td>
                        <td>
                          {item?.draw_data?.draws_winner
                            ? `#${item?.draw_data?.draws_winner?.token_enteries_data?.entry
                                ?.toString()
                                .padStart(4, "0")}`
                            : "Winner not assigned"}
                        </td>
                        <td>{formatDateTime(item?.draw_data?.end_date)}</td>
                        <td
                          onClick={() =>
                            handleOpenModal(
                              "entriesModal",
                              item?.draw_data?.enteries
                            )
                          }
                        >
                          <button class="viewEnteryBtn">
                            View Entries
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <h1 className="mygiveHeading">No Giveaway</h1>
          )}
        </div>
      </div>
      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={""}
        ids={modalDetail.flag === "entriesModal" ? "myEntriesModal" : ""}
        child={
          modalDetail.flag === "entriesModal" ? (
            <Entries
              close={() => handleOnCloseModal()}
              enteries={modalDetail.ent}
            />
          ) : (
            ""
          )
        }
        header={
          <>
            <div className="d-flex">
              <h1 className="  fontSize24 white mb-2">My Entries</h1>
              {/* <p onClick={handleOnCloseModal} className="modal_Cancle">
              <i class="fa-solid fa-xmark cancleLogo"></i>
            </p> */}
              <Image
                onClick={handleOnCloseModal}
                src={images.cross}
                width={24}
                height={24}
                className="modal_Cancle"
              />
            </div>
          </>
        }
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  );
};

export default MyGiveWay;
