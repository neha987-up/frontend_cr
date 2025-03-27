import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as images from "./../../utilities/images";
import CustomModal from "../../components/modals/CustomModal";
import InventoryModal from "../../components/inventoryModal";
import { useDispatch, useSelector } from "react-redux";
import { getCollection, getMyTokens } from "../../redux/slices/token";
import { useClient } from "../../context/ClientContext";
import { capitalizeFirstLetter } from "../../utilities/globalMethods";
import { useRouter } from "next/router";
import { selectLoginAuth } from "../../redux/slices/auth";

const Inventory = () => {
  const dispatch = useDispatch();
  const authData = useSelector(selectLoginAuth);
  const router = useRouter();
  const isClient = useClient();
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(Math.random());
  const [myTokens, setMyTokens] = useState({});
  const [myCollecction, setMyCollection] = useState({});
  const [selectedCollection, setSelectedCollection] = useState();

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
      if (!token) router.push("/");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      getToken(token);
      getMyCollection(token);
    }
  }, []);

  const getToken = (token) => {
    if (token) {
      setLoading(true);
      dispatch(
        getMyTokens({
          params: {},
          callback: (res, error) => {
            setLoading(false);
            if (res) {
              setMyTokens(res?.data?.payload);
            } else if (error) {
              setMyTokens({});
            }
          },
        })
      );
    }
  };

  const getMyCollection = (token) => {
    if (token) {
      setLoading(true);
      dispatch(
        getCollection({
          params: {},
          callback: (res, error) => {
            setMyCollection(res?.data?.payload);
            setLoading(false);
            // if (res) {
            //   setMyTokens(res?.data?.payload);
            //   console.log("🏋🏼‍♀️ ~ file: page.tsx:28 ~ getTokens ~ res:", res);
            // } else if (error) {
            //   setMyTokens({});
            //   console.log("🏋🏼‍♀️ ~ file: page.tsx:31 ~ getTokens ~ error:", error);
            // }
          },
        })
      );
    }
  };

  return (
    <>
      <section className="inventorySection">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h1 className="fontSize24 fw-bold mb-4">Collections</h1>
            </div>

            {/* <div
                className="shopSmallCard"
                onClick={() => {
                  handleOpenModal("inventoryModal");
                }}
              >
                <Image
                  src={images.shopSmallImg}
                  className="img-fluid"
                  style={{ width: "100%", height: "100%" }}
                />
                <div className="smallCardFoot">
                  <h1 className="fontSize20 mb-2">Collection 1</h1>
                  <p className="bigCardSub mb-0">
                    1 Collectible Token, 10 Primary Tokens
                  </p>
                </div>
              </div> */}

            {isClient && myCollecction?.data?.length > 0 ? (
              <div className="col-12">
                <div className="row">
                  {myCollecction?.data?.map((item, index) => (
                    <div className="col-lg-4 col-sm-6 mb-3">
                      <div
                        className={`shopSmallCard inventaryCard`}
                        onClick={() => {
                          if (item?.collection_data?.length > 0) {
                            setSelectedCollection(item);
                            handleOpenModal("inventoryModal");
                          }
                        }}
                      >
                        {item?.collection_data?.some(
                          (item) => item?.token_info?.type === 1
                        ) ? (
                          item.collection_data
                            .filter((item) => item?.token_info?.type === 1)
                            .map((filteredItem, index) => (
                              <div className={filteredItem?.brought_token?.find(x => x.user_id == authData?.usersInfo?.id) ? "inventaryCard" : 'grayLayer'}>
                                <Image
                                  key={index}
                                  width={500}
                                  height={355}
                                  src={filteredItem?.token_info?.token_image}
                                  className="img-fluid inventoryCardImg"
                                  style={{
                                    width: "100%",
                                    // height: 355,
                                    // minHeight: 355,
                                    borderRadius: 20,
                                  }}
                                />
                              </div>
                            ))
                        ) : (
                          <Image
                            width={500}
                            height={300}
                            src={images.shopDummy22}
                            className="img-fluid"
                            style={{
                              width: "100%",
                              // minHeight: 355,
                              marginBottom: "15px",
                              borderRadius: 20,
                            }}
                          />
                        )}

                        <div className="smallCardFoot">
                          <h1 className="fontSize20 mb-2">
                            {capitalizeFirstLetter(item?.name ?? "")}
                          </h1>

                          <p className="bigCardSub mb-0">
                            {` ${item?.promo ?? "0"} Promotional Token,
                          ${item?.collectable ?? "0"} Collectible
                          Tokens`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="row h-100">
                <div className="col-md-12 mb-4">
                  <div className="nodataSmallCard">
                    <Image src={images.collectionDummy} className="img-fluid" />
                    <h1 className="fontSize20 mb2 fw-bold text-white">
                      No Collection Available
                    </h1>
                    <p className="fontSize14">
                      We are stocking up new collections soon!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {isClient && (
              <div className="col-md-12 mt-5">
                <h1 className="fontSize24 fw-bold mb-4">Recently Purchased</h1>
              </div>
            )}

            {isClient && myTokens?.data?.length > 0 ? (
              <div className="col-12">
                <div className="row">
                  {myTokens?.data?.map((item, index) => (
                    <div className="col-md-6 mb-3">
                      <div className="recentlyCard">
                        <div className="recentlyCardImg">
                          <Image
                            height={200}
                            width={200}
                            src={item?.token_info?.token_image}
                            className="img-fluid"
                          />
                        </div>
                        <div className="recentlyCardText">
                          <h3>
                            {capitalizeFirstLetter(item?.token_info?.name)}
                          </h3>
                          {/* <p className="bigCardSub mb-0">Standard</p> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <h3 className="fontSize24  mb-4 text-center pt-4">No Token</h3>
            )}
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
          modalDetail.flag === "inventoryModal" ? "commonWidth" : "commonWidth"
        }
        ids={modalDetail.flag === "inventoryModal" ? "inventoryModal" : ""}
        child={
          modalDetail.flag === "inventoryModal" ? (
            <InventoryModal
              collectionData={selectedCollection}
              close={() => handleOnCloseModal()}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "inventoryModal" ? (
            <>
              <div className="modal_Header">
                <h1 className="modal_Head  fontSize24 white mb-2">
                  {selectedCollection?.name}
                </h1>
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

export default Inventory;
