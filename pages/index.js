import React, { useEffect, useReducer, useRef, useState } from "react";
import Image from "next/image";
import * as images from "./../utilities/images";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSettings } from "../redux/slices/setting";
import { useDispatch, useSelector } from "react-redux";
import { getAllTokens, selectToken } from "../redux/slices/token";
import { useClient } from "../context/ClientContext";
import { capitalizeFirstLetter } from "../utilities/globalMethods";
import { ApiClient } from "../utilities/api";
import { AUTH_API_URL } from "../utilities/config";
import CustomModal from "../components/modals/CustomModal";
import LoginModal from "../components/loginModal";
import SignUpModal from "../components/signUpModal";
import VerifyOtpModal from "../components/verifyOtpModal";
import ForgetModal from "../components/forgetModal";
import CreateNewPassword from "../components/createNewPassword";
import StripeSubscribe from "./stripeSubscribe/StripeSubscribe";
import { selectLoginAuth } from "../redux/slices/auth";

const HomePage = () => {
  const isClient = useClient();
  const dispatch = useDispatch();
  const router = useRouter();
  const authData = useSelector(selectLoginAuth);
  const tokendata = useSelector(selectToken);
  const TokenList = tokendata?.tokenList ?? [];

  const aboutSectionRef = useRef(null);
  const faqSectionRef = useRef(null);

  const [settingData, setsettingData] = useState();
  const [userData, setUserData] = useState(null);
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

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <Image src={images.prevLogo} alt="prevLogo" className="sliderBtnImg" />
      </div>
    );
  }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <Image src={images.nextLogo} alt="nextLogo" className="sliderBtnImg" />
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  function SelectionSliderArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "none",
        }}
        onClick={onClick}
      ></div>
    );
  }

  const selectionSlider = {
    infinite: false, // Disable infinite scroll to handle last image properly
    speed: 500,
    slidesToShow: 3, // Number of full slides visible
    slidesToScroll: 1,
    nextArrow: <SelectionSliderArrow />,
    prevArrow: <SelectionSliderArrow />,
    responsive: [
      {
        breakpoint: 2200,
        settings: {
          slidesToShow: 3.5, // Show 3 full slides and part of the last one
          slidesToScroll: 1,
          infinite: false,
        },
      },
      // {
      //   breakpoint: 1200,
      //   settings: {
      //     slidesToShow: 2.5, // Show 2 full slides and part of the last one
      //     slidesToScroll: 1,
      //     infinite: false,
      //   },
      // },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
        },
      },
    ],
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      getAllSettings();
    }
  }, []);

  const getAllSettings = () => {
    dispatch(
      getSettings({
        params: {},
        callback: (res, error) => {
          if (res) {
            setsettingData(res?.data?.payload);
          } else if (error) {
            console.log("🏋🏼‍♀️ ~ file: page.tsx:31 ~ getTokens ~ error:", error);
          }
        },
      })
    );
  };

  useEffect(() => {
    getTokens();
  }, []);

  const getTokens = () => {
    dispatch(
      getAllTokens({
        params: {},
        callback: (res, error) => { },
      })
    );
  };

  const getAllStripeProductList = async () => {
    try {
      const res = await ApiClient.get(`${AUTH_API_URL}/api/v1/payment_plans`);
      setProducts(res?.data?.payload?.sort((a, b) => a?.id - b?.id));
    } catch (error) {
      console.log(error, "+++");
    }
  };

  useEffect(() => {
    getAllStripeProductList();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && authData) {
      setUserData(authData?.usersInfo?.user);
    }
  }, [authData]);

  return (
    <>
      <Navbar
        scrollToFaq={() => setTimeout(() => {
          faqSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100)}
        scrollToAbout={() => setTimeout(() => {
          aboutSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100)}
      />
      <div className="landingOuter__">

        <section className="banner">
          <div className="container ">
            <div className="banner_Container">
              <div className="row">
                <div className="col-lg-7">
                  <div className="banner_LeftChild">
                    <h2 className="banner_Head fontSize58 white mb-0">
                      Discover collect and Win with Collection Rewards Exciting
                      Giveaways. Unlimited Possibilities.
                    </h2>
                    <p className="banner_SubHead fontSize20 grey mb-0">
                      Whether you're a casual collector or a dedicated enthusiast, turn your passions into fun, shareable experiences with Australia’s #1 online collectables platform.
                    </p>
                    <button
                      onClick={() => router.push("/home")}
                      className="common_Btn getStart_Btn"
                    >
                      Get Started <i className="fa-solid fa-arrow-right ms-1"></i>
                    </button>

                    {/* <div className="count_Parent">
                    <div>
                      <h3 className="fontSize28 white d-flex align-items-center mb-0">
                        $1M{" "}
                        <span className="fontSize20 fw700 blue ms-1">+</span>
                      </h3>
                      <h3 className="fontSize14 lightGrey pt-2">
                        TRANSACTIONS
                      </h3>
                    </div>
                    <div>
                      <h3 className="fontSize28 white d-flex align-items-center mb-0">
                        20K{" "}
                        <span className="fontSize20 fw700 blue ms-1">+</span>
                      </h3>
                      <h3 className="fontSize14 lightGrey pt-2">GIVEAWAYS</h3>
                    </div>
                    <div>
                      <h3 className="fontSize28 white d-flex align-items-center mb-0">
                        10K{" "}
                        <span className="fontSize20 fw700 blue ms-1">+</span>
                      </h3>
                      <h3 className="fontSize14 lightGrey pt-2">USERS</h3>
                    </div>
                  </div> */}
                  </div>
                </div>
                <div className="col-lg-5 d-flex justify-content-center position-relative mt-lg-0 mt-4">
                  <div className="bannerImg_Parent">
                    <Image
                      width={400}
                      height={400}
                      src={
                        settingData?.find(
                          (x) => x?.setting_name == "landing_page_image"
                        )?.setting_value ? settingData?.find(
                          (x) => x?.setting_name == "landing_page_image"
                        )?.setting_value : images.bannerImg
                      }
                      alt="bannerImg"
                      className="bannerSection_Img img-fluid"
                      style={{ width: "100%", borderRadius: 14 }}
                      quality={100}
                    />
                  </div>
                  <div className="bannerRight_ImgInfo">
                    <p className="fontSize20 white mb-0 skeletonTxt fw600">
                      {settingData?.find(
                        (x) => x?.setting_name == "landing_image_text"
                      )?.setting_value ?? "- - -"}
                    </p>
                    {/* <p className="fontSize14  lightGrey mb-0 fw500">
                    7 Days Left
                  </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="why_Collection">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-md-12">
                <div className="row">
                  <div className="pricingHead_Container text-center">
                    <h1 className="section_Heading fontSize16 fw600 blue mb-0">
                      Why Collection Rewards?
                    </h1>
                    <p className="pricing_Para fontSize43 white mb-0">
                      Unlock the joy of collecting with our purpose-built platform
                    </p>
                    {/* <p className="work_Subpara fontSize18 grey mb-0">
                    Collection Rewards is a fun platform for creating digital
                    collections to share with friends, and winning huge prizes
                    in the process
                  </p> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-6 col-lg-7">
                    <div className="collect_GiveAways">
                      <h3 className="collect_Head fontSize22 fw700 white mb-0">
                        Explore our ever growing collection of tokens to share
                        with friends
                      </h3>
                      <p className="collect_Para fontSize16 grey mb-0">
                        With a new set of tokens refreshed every day and brand new
                        collections added regularly, we ensure there’s always
                        something new to explore for everyone
                      </p>

                      {isClient && <>
                        {TokenList?.otheToken?.length > 0 ? TokenList?.otheToken?.length > 2 ? (
                          <div className="slick_Parent">
                            <div className="slick_Container">
                              <Slider {...settings}>
                                {TokenList?.otheToken
                                  ?.filter((item) => item?.type === 2)
                                  .map((item, index) => (
                                    <div className="slickBox" key={index}>
                                      <a
                                        href="/home"
                                        className="marquee_Links"
                                      // target="_blank"
                                      >
                                        {console.log(item, "itemsssss")}
                                        <div className="client_Logoes">
                                          <Image
                                            width={300}
                                            height={300}
                                            src={
                                              item?.token_image ||
                                              images.selectionSliderImg1
                                            }
                                            alt="slider_img"
                                            // className="img-fluid"

                                            style={{
                                              borderRadius: "12px",
                                              height: "100%",
                                              width: "100%",
                                            }}
                                          />
                                        </div>
                                      </a>
                                      <div className="slickChild_Box">
                                        <h3 className="fontSize18 fw800 white">
                                          {capitalizeFirstLetter(item?.name)}
                                        </h3>
                                        {/* <p className="fontSize14 fw500 grey mb-0">
                                      7 Days Left
                                    </p> */}
                                      </div>
                                    </div>
                                  ))}
                              </Slider>
                            </div>
                          </div>
                        ) : (
                          TokenList?.otheToken
                            ?.filter((item) => item?.type === 2)
                            .map((item, index) => (
                              <div className="slickBox sliderImageParent" key={index}>
                                <a
                                  href="/home"
                                  className="marquee_Links"
                                // target="_blank"
                                >
                                  <div className="client_Logoes">
                                    <Image
                                      width={300}
                                      height={300}
                                      src={
                                        item?.token_image ||
                                        images.selectionSliderImg1
                                      }
                                      alt="slider_img"
                                      style={{
                                        borderRadius: "12px",
                                        height: "100%",
                                        width: "100%",
                                      }}
                                    />
                                  </div>
                                </a>
                                <div className="slickChild_Box">
                                  <h3 className="fontSize18 fw800 white">
                                    {capitalizeFirstLetter(item?.name)}
                                  </h3>
                                </div>
                              </div>
                            ))
                        ) :
                          <div className="nodataBigCard mt-5">
                            <Image src={images.shopDummy22} className="img-fluid" />
                            <h1 className="fontSize20 mb-2 fw-bold text-white">
                              No Tokens Available
                            </h1>
                            <p className="fontSize14">
                              We are stocking up new token soon!
                            </p>
                          </div>}
                      </>}
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-5">
                    <div className="row">
                      <div className="col-md-12 ">
                        <div className="join_Box">
                          <div className="join_Txt">
                            <h3 className="collect_Head fontSize22 fw700 white mb-0">
                              Collect Promotional tokens for your chance to Win
                            </h3>
                            <p className="collect_Para fontSize16 grey mb-0">
                              Keep on the lookout for the most exclusive
                              Promotional Tokens which reward you with FREE
                              entries to exciting giveaways as well as ultimate
                              bragging rights.
                            </p>
                          </div>

                          <Image
                            src={images.benefitImg}
                            alt="benefitImg"
                            className="img-fluid"
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="join_Box mt-3">
                          <div className="join_Txt">
                            <h3 className="collect_Head fontSize22 fw700 white mb-0">
                              Refer your friends for BONUS entries
                            </h3>
                            <p className="collect_Para fontSize16 grey mb-0">
                              Feel like sharing the fun? Members who refer others
                              unlock great perks including free giveaway entries
                              for both you and your friends!
                            </p>
                          </div>
                          <Image
                            src={images.joinBoxImg}
                            alt="joinBoxImg"
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* {isClient && TokenList?.otheToken?.length > 0 && (
        <section className="our_Selection">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="pricingHead_Container text-center">
                  <h1 className="section_Heading fontSize16 fw600 blue mb-0">
                    our shop
                  </h1>
                  <p className="pricing_Para fontSize43 white mb-0">
                    Our Selection Of Exclusive Tokens
                  </p>
                  <p className="work_Subpara fontSize18 grey mb-0">
                    Explore exclusive giveaways with super convenience in
                    collection discovery and <br /> curation.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="selectionSlider_Container">
                    <Slider {...selectionSlider}>
                      {TokenList?.otheToken
                        ?.filter((item) => item?.type === 2)
                        .map((item, index) => (
                          <div
                            onClick={() => router.push("/home")}
                            className="slickBox"
                          >
                            <a className="marquee_Links" target="_blank">
                              <div className="client_Logoes d-flex justify-content-center">
                                <Image
                                  width={300}
                                  height={700}
                                  src={
                                    item?.token_image ||
                                    images.selectionSliderImg1
                                  }
                                  alt="slider_img"
                                  className="img-fluid"
                                />
                              </div>
                            </a>
                            <div className="slickChild_Box">
                              <h3 className="fontSize16 fw800 white">
                                {capitalizeFirstLetter(item?.name)}
                              </h3>
                            </div>
                          </div>
                        ))}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )} */}

        <section className="pricing">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="pricingHead_Container text-center">
                  <h1 className="section_Heading fontSize16 fw600 blue mb-0">
                    Memberships
                  </h1>
                  <p className="pricing_Para fontSize43 white mb-0">
                    Select a package to become a VIP member today!
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              {products?.length > 0 ? (
                products?.map((item, inx) => (
                  <div className="col-lg-4 col-md-12 mb-4" key={inx}>
                    <div
                      className={`subscription_Box ${item?.id == 1
                        ? "subscription_BoxFirst"
                        : item?.id == 2
                          ? "premium_Box"
                          : "deluxe"
                        } `}
                    >
                      <div className="mainVipMember">
                        <h3 className="fontSize32 white mb-1 pt-3">
                          {item?.name}
                        </h3>
                        {/* <p className="fontSize14 white mb-0">{item?.description}</p> */}
                        <p className="subs_Price fontSize24 blue mb-0">
                          ${item?.cost}
                          <span className="fontSize16 white fw700">/month</span>
                        </p>
                        {userData?.membership_status !== 1 && (
                          <button
                            className="subs_Btn"
                            type="button"
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
                                <i class="fa-solid fa-check checkLogo"></i>{" "}
                                {x?.info}
                              </li>
                            ))
                          ) : (
                            <></>
                          )}
                        </ul>
                      </div>
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
            </div>
          </div>
        </section>

        <section className="how_Work" ref={aboutSectionRef}>
          <div className="container work_Container">
            <div className="row">
              <div className="col-md-12">
                <div className="text-center">
                  <h1 className="section_Heading fontSize16 fw600 blue mb-0">
                    How It Works
                  </h1>
                  <p className="pricing_Para fontSize43 white mb-0">
                    It’s easy to get started
                  </p>
                  <p className="work_Subpara fontSize18 grey mb-0">
                    Collection Rewards is a fun platform for completing digital collections to share with friends, and winning huge prizes in the process.
                  </p>
                </div>
              </div>
            </div>
            <div className="workDescription_Parent">
              <div className="row">
                <div className="col-md-12">
                  <div className="workDescription">
                    <div className="row">
                      <div className="col-md-12 col-lg-6">
                        <div className="howWork_Box">
                          <h1 className="workDesc_Head fontSize36 white mb-0">
                            Discover
                          </h1>
                          {/* <p className="fontSize18 grey">
                          Collection Rewards is a fun platform for creating
                          digital collections to share with friends, and winning
                          huge prizes in the process.
                        </p> */}
                          <p className="fontSize18 grey ">
                            Create a free account to check out our storefront and
                            ever-changing offering of collectable tokens. These
                            are updated every day so you’ll never run out of
                            things to explore.
                          </p>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 text-end">
                        <Image src={images.Overlay} alt="Overlay" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 col-lg-6">
                        <div className="howWork_Box">
                          <h1 className="workDesc_Head fontSize36 white mb-0">
                            Collect
                          </h1>
                          <p className="fontSize18 grey">
                            Once you have activated your account, you can explore
                            hundreds of collectable tokens on our storefront and
                            instantly start adding to your collections.
                          </p>
                          <p className="fontSize18 grey ">
                            Keep an eye out for the featured Promotional Token,
                            there’s always an exciting giveaway going on and
                            holders of these will receive FREE entries into the
                            current draw!
                          </p>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 text-end">
                        <Image src={images.collectImg} alt="Overlay" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 col-lg-6">
                        <div className="howWork_Box">
                          <h1 className="workDesc_Head fontSize36 white mb-0">
                            Win
                          </h1>
                          <p className="fontSize18 grey">
                            Once the deadline ends one lucky winner is chosen to
                            win a host of incredible prizes completely tax free!
                            Make sure to sign up for a VIP membership to ensure
                            you never miss out on an opportunity to WIN!
                          </p>
                          {/* <p className="fontSize18 grey ">
                          Seamlessly list your masterpieces, confident in the
                          platform's robust security measures for transactions.
                        </p> */}
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-6 text-end">
                        <Image src={images.winImg} alt="Overlay" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="pricingHead_Container text-center">
                  <h1 className="section_Heading fontSize16 fw600 blue mb-0">
                    Testimonials
                  </h1>
                  {/* <p className="pricing_Para fontSize43 white mb-0">
                  Hear what our creators and <br /> collectors say about us
                </p> */}
                </div>
              </div>
              <div className="col-md-6">
                <div className="testimonials_Box">
                  <div>
                    <Image src={images.quotesLogo} alt="quotesLogo" />
                    <p className="testBox_Para fontSize18 white mb-0">
                      I absolutely love Collection Rewards! The excitement of discovering new tokens every day keeps me coming back, and winning a cash prize last month was an amazing surprise. Highly recommend!
                    </p>
                  </div>
                  <div className="testImg_Parent">
                    {/* <Image src={images.testimonialsImg} alt="testimonialsImg" /> */}
                    <div>
                      <h3 className="fontSize16 blue fw600 mb-0">
                        Alex R
                      </h3>
                      <h3 className="fontSize16 blue mb-0 pt-1" style={{ color: '#D3D3D3' }}>Premium Token Holder</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mtCustom mt-md-0 mt-3">
                <div className="testimonials_Box">
                  <div>
                    <Image src={images.quotesLogo} alt="quotesLogo" />
                    <p className="testBox_Para fontSize18 white mb-0">
                      Joining the Deluxe membership was the best decision I made this year. The free entries, amazing discounts, and VIP exclusives have made my experience incredible.
                    </p>
                  </div>
                  <div className="testImg_Parent">
                    {/* <Image src={images.testimonialsImg2} alt="testimonialsImg" /> */}
                    <div>
                      <h3 className="fontSize16 blue fw600 mb-0">
                        Jamie T
                      </h3>
                      <h3 className="fontSize16 blue mb-0 pt-1" style={{ color: '#D3D3D3' }}>Deluxe Member</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mt-3">
                <div className="testimonials_Box">
                  <div>
                    <Image src={images.quotesLogo} alt="quotesLogo" />
                    <p className="testBox_Para fontSize18 white mb-0">
                      I referred my friends to Collection Rewards, and not only did they love it, but I also earned bonus giveaway entries. The referral program is fantastic
                    </p>
                  </div>
                  <div className="testImg_Parent">
                    {/* <Image src={images.testimonialsImg3} alt="testimonialsImg" /> */}
                    <div>
                      <h3 className="fontSize16 blue fw600 mb-0">Taylor M</h3>
                      <h3 className="fontSize16 blue mb-0 pt-1" style={{ color: '#D3D3D3' }}>Premium Member</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mt-3">
                <div className="testimonials_Box">
                  <div>
                    <Image src={images.quotesLogo} alt="quotesLogo" />
                    <p className="testBox_Para fontSize18 white mb-0">
                      I was skeptical at first, but the promotional tokens are such a cool concept. I snagged one last week, and it gave me free entries into a dream car giveaway!
                    </p>
                  </div>
                  <div className="testImg_Parent">
                    {/* <Image src={images.testimonialsImg4} alt="testimonialsImg" /> */}
                    <div>
                      <h3 className="fontSize16 blue fw600 mb-0">
                        Chris D
                      </h3>
                      <h3 className="fontSize16 blue mb-0 pt-1" style={{ color: '#D3D3D3' }}>Premium Member</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mt-3">
                <div className="testimonials_Box">
                  <div>
                    <Image src={images.quotesLogo} alt="quotesLogo" />
                    <p className="testBox_Para fontSize18 white mb-0">
                      Collection Rewards is such a creative way to blend collecting with giveaways. It's so easy to use, and there's always something exciting happening.
                    </p>
                  </div>
                  <div className="testImg_Parent">
                    {/* <Image src={images.testimonialsImg5} alt="testimonialsImg" /> */}
                    <div>
                      <h3 className="fontSize16 blue fw600 mb-0">Morgan L</h3>
                      <h3 className="fontSize16 blue mb-0 pt-1" style={{ color: '#D3D3D3' }}>Standard Member</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="faq" ref={faqSectionRef}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <h3 className="section_Heading fontSize16 fw600 mb-0">
                  Frequently asked questions
                </h3>
                <p className=" faq_Para fontSize43 white mb-0">
                  Some of the things you <br /> may want to know
                </p>
                <p className="fontSize18 grey mb-0">
                  Have more questions? Don’t hesitate to reach us
                </p>
                <Link
                  href="mailto:admin@collectionrewards.com"
                  className="emailLink"
                >
                  admin@collectionrewards.com
                </Link>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="accordionParent">
                  <div
                    class="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div class="accordion-item ">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button collapsed accordion_FirstItem"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseOne"
                          aria-expanded="false"
                          aria-controls="flush-collapseOne"
                        >
                          How do I enter a giveaway?
                        </button>
                      </h2>
                      <div
                        id="flush-collapseOne"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div class="accordion-body">
                          Anyone who holds a promotional token is automatically
                          entered into the giveaway it is linked to. You can get
                          yourself a promotional token either through a one off
                          purchase, or you can claim one for free if you are a VIP
                          member.
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseTwo"
                          aria-expanded="false"
                          aria-controls="flush-collapseTwo"
                        >
                          What is a VIP membership?
                        </button>
                      </h2>
                      <div
                        id="flush-collapseTwo"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div class="accordion-body">
                          A VIP membership is a monthly subscription which allows
                          you to enter all giveaways for free as well as a number
                          of other great perks such as early access to VIP
                          exclusive tokens, members only giveaways, and a referral
                          code so that you and your friends can enjoy better odds
                          of winning.
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseThree"
                          aria-expanded="false"
                          aria-controls="flush-collapseThree"
                        >
                          How do I use my free tokens?
                        </button>
                      </h2>
                      <div
                        id="flush-collapseThree"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div class="accordion-body">
                          Once you become a VIP member, you will be able to claim
                          your free tokens/entries from the storefront. Upon the
                          release of new Promotional tokens and giveaways, you
                          will be able to add the token to your collection for
                          free by simply clicking “Claim Free Entries”.
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseFour"
                          aria-expanded="false"
                          aria-controls="flush-collapseFour"
                        >
                          How do I know I’m in a draw ?
                        </button>
                      </h2>
                      <div
                        id="flush-collapseFour"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div class="accordion-body">
                          Once you have your promotional token, you will automatically be assigned a number of entries consistent with the tier of token that you hold. You will receive an email confirming these and can view these entries as well as any previous entries at any time in the ‘My Giveaways’ tab.
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item ">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseFive"
                          aria-expanded="false"
                          aria-controls="flush-collapseFive"
                        >
                          Can I Buy more than one token ?
                        </button>
                      </h2>
                      <div
                        id="flush-collapseFive"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div class="accordion-body">
                          Yes it is possible to buy more than one of any token. If you buy additional Promotional tokens, you will gain additional entries into its linked giveaway.
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item ">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseSix"
                          aria-expanded="false"
                          aria-controls="flush-collapseSix"
                        >
                          Are all tokens eligible for giveaways ?
                        </button>
                      </h2>
                      <div
                        id="flush-collapseSix"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div class="accordion-body">
                          Only the Promotional token on offer is linked to a giveaway, other collectable tokens will be visible in your inventory once purchased and are required to complete a full collection.
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item ">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseSeven"
                          aria-expanded="false"
                          aria-controls="flush-collapseSeven"
                        >
                          Do I have to buy tokens if I’m a VIP ?
                        </button>
                      </h2>
                      <div
                        id="flush-collapseSeven"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div class="accordion-body">
                          VIPs are entitled to every Promotional token upon its release (and entered into every giveaway), however collectable tokens are still required to be purchased if you wish to fully complete a collection. You can also buy multiple promotional tokens to add additional entries.
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item ">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseEight"
                          aria-expanded="false"
                          aria-controls="flush-collapseEight"
                        >
                          Where are the winning entries drawn ?
                        </button>
                      </h2>
                      <div
                        id="flush-collapseEight"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div class="accordion-body">
                          Winning entries will be posted on our Facebook and Instagram pages shortly after the end date of the giveaway. You can also check the winning entry on the “My Giveaways” page at any time.
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item ">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseNine"
                          aria-expanded="false"
                          aria-controls="flush-collapseNine"
                        >
                          How do I claim referral bonus entries ?
                        </button>
                      </h2>
                      <div
                        id="flush-collapseNine"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div class="accordion-body">
                          As a VIP member you will be assigned a unique referral code for you to share with friends. If the friend subsequently purchases a VIP membership for themselves, they will have the option to add in a referral code before claiming their entries into a giveaway.
                          Once your friend adds your referral code and claims their VIP entries, you will both receive extra free entries into a draw of your choice
                          You can view all bonus entries that you have accumulated in your profile section.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="start_Journey">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="journey_Parent">
                  <h1 className="fontSize43 white mb-0">
                    Start your journey today
                  </h1>
                  <p className="journey_Para fontSize18 grey mb-0">
                    Join collection rewards and dive into the world of exclusive digital collections
                  </p>
                  <button
                    onClick={() => router.push("/home")}
                    className="common_Btn getStart_Btn"
                  >
                    Get Started <i className="fa-solid fa-arrow-right ms-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />

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
            ) : modalDetail.flag === "purchaseModal" ? (
              <>
                <div className="modal_Header">
                  <Image src={images.mainLogo} alt="mainLogo" />
                  <h1 className="modal_Head  fontSize24 white mb-2">
                    Payment Amounts
                  </h1>
                  <p className="areYouSureText mb-0">
                    {"$ " + modalDetail.data.cost}
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
    </>
  );
};

export default HomePage;
