import React, { useEffect, useState } from "react";
// import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
// import { useLocation } from "react-router-dom";
// import { screenPath } from "../../constants/screenPath";
import Image from "next/image.js";
import * as images from "./../utilities/images.js";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { useRouter } from "next/router.js";
import { useClient } from "../context/ClientContext.js";
import { selectLoginAuth } from "../redux/slices/auth/index.js";
import { useSelector } from "react-redux";
import Link from "next/link.js";
import { capitalizeFirstLetter } from "../utilities/globalMethods.js";
import moment from "moment-timezone";

const SideBar = ({ toggleSidebar, handleToggleSidebar }) => {
  const router = useRouter();

  const [activTab, setActiveTab] = useState("/home");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setActiveTab(router.pathname);
  }, [router.pathname]);
  const isClient = useClient();
  const authData = useSelector(selectLoginAuth);
  // const pathname = location.pathname.split("/")[1];

  useEffect(() => {
    if (typeof window !== "undefined" && authData) {
      setUserData(authData?.usersInfo?.user);
    }
  }, [authData]);

  return (
    <Sidebar className={`${toggleSidebar ? "full" : "hide"} sidebar`}>
      <div className="d-flex justify-content-between align-items-center">
        <Image
          onClick={() => router.push("/")}
          src={images.mainLogo}
          alt="mainLogo"
          className="sidebar_Mainlogo"
          style={{
            cursor: "pointer",
          }}
        />
        <i
          className="fa-solid fa-x closeSidebar_Btn"
          onClick={() => {
            handleToggleSidebar();
          }}
        ></i>
      </div>
      <div className="sideBar_MenuParent">
        <Menu>
          <MenuItem
            onClick={() => { router.push("/") }}
            className={`menu_Item ${activTab == "/" && "activeSidebar" && "activeSidebar"
              }`}
          >
            {" "}
            <Image
              src={images.homeLogo}
              alt="dashboardLogo"
              className="sideBar_Logo me-2 "
            />{" "}
            Home{" "}
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push("/home");
              handleToggleSidebar();
            }}
            className={`menu_Item ${activTab == "/home" && "activeSidebar" && "activeSidebar"
              }`}
          >
            {" "}
            <Image
              src={images.shop}
              alt="dashboardLogo"
              className="sideBar_Logo me-2 "
            />{" "}
            Shop{" "}
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push("/giveway");
              handleToggleSidebar();
            }}
            className={`menu_Item ${activTab == "/giveway" && "activeSidebar"}`}
          >
            {" "}
            <Image
              src={images.activeGive}
              alt="dashboardLogo"
              className="sideBar_Logo me-2"
            />{" "}
            Active Giveaways{" "}
          </MenuItem>
          <MenuItem
            onClick={() => {
              router.push("/howitwork");
              handleToggleSidebar();
            }}
            className={`menu_Item ${activTab == "/howitwork" && "activeSidebar"
              }`}
          >
            {" "}
            <Image
              src={images.howitworks}
              alt="dashboardLogo"
              className="sideBar_Logo me-2"
            />{" "}
            How it Works{" "}
          </MenuItem>
        </Menu>
        {isClient && authData?.isLoggedIn && (
          <>
            <p className="myProfileText">my profile</p>
            <Menu className="pt-0">
              <MenuItem
                onClick={() => {
                  router.push("/inventory");
                  handleToggleSidebar();
                }}
                className={`menu_Item ${activTab == "/inventory" && "activeSidebar"
                  }`}
              >
                {" "}
                <Image
                  src={images.inventary}
                  alt="dashboardLogo"
                  className="sideBar_Logo me-2 "
                />{" "}
                Inventory{" "}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push("/mygiveway");
                  handleToggleSidebar();
                }}
                className={`menu_Item ${activTab == "/mygiveway" && "activeSidebar"
                  }`}
              >
                {" "}
                <Image
                  src={images.myGiveway}
                  alt="dashboardLogo"
                  className="sideBar_Logo me-2"
                />{" "}
                My Giveaways{" "}
              </MenuItem>
            </Menu>

            <div className="sidebarProfile_Container mt-auto text-center">
              <div className="sidebarProfile_Parent">
                {isClient && userData?.image ? (
                  <Image
                    height={100}
                    width={200}
                    src={userData?.image}
                    alt="profileImage"
                    className="sidebarProfileImg"
                  />
                ) : (
                  <Image
                    src={images.sidebarIcon}
                    alt="profileImage"
                    className="sidebarProfileImg"
                  />
                )}
                <h3 className="fontSize30 white oneLine px-2 text-center">
                  {capitalizeFirstLetter(userData?.name)}
                  {(userData?.membership_status == 1 ||
                    (userData?.membership_status == 3 &&
                      moment
                        .utc(userData?.expiry_date)
                        .local()
                        .isAfter(moment()))) && (
                      <Image src={images.daimond_icon} className="ms-2" />
                    )}
                </h3>
                <h6 className="fontSize14 white fw500">
                  <Link
                    onClick={() => handleToggleSidebar()}
                    className="text-white"
                    href={"/profile"}
                  >
                    View Profile
                  </Link>
                </h6>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="termAndConditionParent">
        <Link href="/giveawaytnc" className="termAndCondition">
          Giveaway Terms & Conditions
        </Link>
        <Link href="/termAndCondition" className="termAndCondition mt-2">
          Terms of service
        </Link>
      </div>
    </Sidebar>
  );
};

export default SideBar;
