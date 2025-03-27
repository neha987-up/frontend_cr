import React from "react";
import Image from "next/image";
import { selectLoginAuth } from "../redux/slices/auth";
import { useSelector } from "react-redux";

const InventoryModal = ({ collectionData }) => {
  const authData = useSelector(selectLoginAuth);
  const filteredItems = collectionData?.collection_data?.filter(
    (item) => item?.token_info?.type === 1
  );

  const CollectibleItems = collectionData?.collection_data?.filter(
    (item) => item?.token_info?.type === 2
  );

  const myPromPurchase = filteredItems[0]?.brought_token?.filter(
    (x) => x.user_id == authData?.usersInfo?.id
  );

  const maxPurchaseType = myPromPurchase?.reduce((max, item) => {
    return Math.max(max, item?.order_info?.purchase_type);
  }, 0);

  // console.log(maxPurchaseType, '++')

  return (
    <div className="container-fluid">
      <div className="row">
        {filteredItems?.length > 0 && (
          <>
            <div className="col-md-6 mb-3 testing">
              <div
                className={`inventoryCollectionCar h-100 ${myPromPurchase?.length > 0 ? "" : "grayLayer"
                  }`}
                key={filteredItems[0]?.id}
              >
                <div className="deluxBorderOuter">
                  <div
                    className={
                      myPromPurchase?.length > 0
                        ? maxPurchaseType == 1
                          ? "standardBorder"
                          : maxPurchaseType == 2
                            ? "premiumBorder"
                            : maxPurchaseType == 3
                              ? "deluxBorder"
                              : ""
                        : ""
                    }
                  >
                    {" "}
                    {/*use three class for border color standardBorder,premiumBorder deluxBorder */}
                    {myPromPurchase?.length > 0 && (
                      <div
                        className="inventoryCardCount"
                        style={{ zIndex: "1" }}
                      >{`×${myPromPurchase?.length}`}</div>
                    )}
                    <Image
                      width={500}
                      height={100}
                      style={{
                        height: "100%",
                        borderRadius: "10px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      src={filteredItems[0]?.token_info?.token_image}
                      // src={image.collectionModal1}
                      className="img-fluid "
                      alt="token"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                {CollectibleItems?.slice(0, 4).map((item, index) => {
                  console.log(item?.brought_token, "-----");
                  return (
                    <>
                      {item?.token_info?.type == 2 && (
                        <div className="col-sm-6 mb-3">
                          <div
                            className={
                              item?.brought_token?.find(
                                (x) => x?.user_id == authData?.usersInfo?.id
                              )
                                ? "inventoryCollectionCardSmall "
                                : "inventoryCollectionCardSmall grayLayer"
                            }
                          >
                            {item?.brought_token?.filter(
                              (x) => x.user_id == authData?.usersInfo?.id
                            )?.length > 0 && (
                                <div
                                  className="inventoryCardCount"
                                  style={{ zIndex: "1" }}
                                >{`×${item?.brought_token?.filter(
                                  (x) => x.user_id == authData?.usersInfo?.id
                                )?.length
                                  }`}</div>
                              )}

                            <Image
                              height={300}
                              width={300}
                              style={{
                                height: "100%",
                                borderRadius: "10px",
                                objectFit: "cover",
                              }}
                              src={item?.token_info?.token_image}
                              className="img-fluid invetoryCardImg"
                              alt="token"
                            />
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {(filteredItems?.length > 0
          ? CollectibleItems?.slice(4)
          : CollectibleItems
        )?.map((item, index) => (
          <div className="col-md-3 col-sm-6 mb-3" key={index}>
            <div
              className={
                item?.brought_token?.find(
                  (x) => x?.user_id == authData?.usersInfo?.id
                )
                  ? "inventoryCollectionCardSmall "
                  : "inventoryCollectionCardSmall grayLayer"
              }
            >
              {item?.brought_token?.filter(
                (x) => x.user_id == authData?.usersInfo?.id
              )?.length > 0 && (
                  <div
                    className="inventoryCardCount"
                    style={{ zIndex: "1" }}
                  >{`×${item?.brought_token?.filter(
                    (x) => x.user_id == authData?.usersInfo?.id
                  )?.length
                    }`}</div>
                )}
              <Image
                height={500}
                width={300}
                style={{ height: "100%", borderRadius: "10px" }}
                src={item?.token_info?.token_image}
                className="img-fluid invetoryCardImg"
                alt="token"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryModal;
