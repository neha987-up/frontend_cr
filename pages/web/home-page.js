import React, { useEffect, useReducer } from 'react';
import Image from "next/image";
import * as images from "./../../utilities/images";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
const HomePage = () => {
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
    return (
        <>
               <section className="banner">
        <div className="container ">
          <div className="banner_Container">
            <div className="row">
              <div className="col-md-7">
                <div className="banner_LeftChild">
                  <h2 className="banner_Head fontSize58 white mb-0">
                    Discover Collect and Win Exclusive Digital Giveaways.
                  </h2>
                  <p className="banner_SubHead fontSize20 grey mb-0">
                    Explore the captivating world of giveaways, where each token
                    represents a unique digital asset, and trust in verified
                    ownership as you collect these one-of-a-kind treasures.
                  </p>
                  <button className="common_Btn getStart_Btn">
                    Get Started <i className="fa-solid fa-arrow-right ms-1"></i>
                  </button>

                  <div className="count_Parent">
                    <div>
                      <h3 className="fontSize28 white d-flex align-items-center mb-0">
                        $1M{" "}
                        <span className="fontSize20 fw700 blue ms-1">
                          +
                        </span>
                      </h3>
                      <h3 className="fontSize14 lightGrey pt-2">
                        TRANSACTIONS
                      </h3>
                    </div>
                    <div>
                      <h3 className="fontSize28 white d-flex align-items-center mb-0">
                        20K{" "}
                        <span className="fontSize20 fw700 blue ms-1">
                          +
                        </span>
                      </h3>
                      <h3 className="fontSize14 lightGrey pt-2">GIVEAWAYS</h3>
                    </div>
                    <div>
                      <h3 className="fontSize28 white d-flex align-items-center mb-0">
                        10K{" "}
                        <span className="fontSize20 fw700 blue ms-1">
                          +
                        </span>
                      </h3>
                      <h3 className="fontSize14 lightGrey pt-2">USERS</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5 d-flex justify-content-center position-relative">
                <div className="bannerImg_Parent">
                  <Image
                    src={images.bannerImg}
                    alt="bannerImg"
                    className="bannerSection_Img img-fluid"
                  />
                </div>
                <div className="bannerRight_ImgInfo">
                  <p className="fontSize20 white mb-0 skeletonTxt fw600">
                    Skeleton Hands Model
                  </p>
                  <p className="fontSize14  lightGrey mb-0 fw500">
                    7 Days Left
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why_Collection">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="pricingHead_Container text-center">
                <h1 className="section_Heading fontSize16 fw600 blue mb-0">
                  Why Collection Rewards?
                </h1>
                <p className="pricing_Para fontSize43 white mb-0">
                  Unlock The True Essence Of Giveaways
                </p>
                <p className="work_Subpara fontSize18 grey mb-0">
                  seamlessly collect rare digital masterpieces and effortlessly
                  elevate your art portfolio.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-7">
                <div className="collect_GiveAways">
                  <h3 className="collect_Head fontSize22 fw700 white mb-0">
                    Collect and participate in ongoing giveaways
                  </h3>
                  <p className="collect_Para fontSize16 grey mb-0">
                    Collect rare, exclusive digital art, breathing life into the
                    extraordinary realm.
                  </p>
                  <div className="slick_Parent">
                    <div className="slick_Container">
                      <Slider {...settings}>
                        <div className="slickBox">
                          <a href="#" className="marquee_Links" target="_blank">
                            <div className="client_Logoes">
                              <Image
                                src={images.sliderImg}
                                alt="slider_img"
                                className="img-fluid"
                              />
                            </div>
                          </a>
                          <div className="slickChild_Box">
                            <h3 className="fontSize18 fw800 white">
                              Crystalline Model
                            </h3>
                            <p className="fontSize14 fw500 grey mb-0">
                              7 Days Left
                            </p>
                          </div>
                        </div>

                        <div className="slickBox">
                          <a href="#" className="marquee_Links" target="_blank">
                            <div className="client_Logoes">
                              <Image
                                src={images.sliderImg}
                                alt="slider_img"
                                className="img-fluid"
                              />
                            </div>
                          </a>
                          <div className="slickChild_Box">
                            <h3 className="fontSize18 fw800 white">
                              Crystalline Model
                            </h3>
                            <p className="fontSize14 fw500 grey mb-0">
                              7 Days Left
                            </p>
                          </div>
                        </div>
                        <div className="slickBox">
                          <a href="#" className="marquee_Links" target="_blank">
                            <div className="client_Logoes">
                              <Image
                                src={images.sliderImg}
                                alt="slider_img"
                                className="img-fluid"
                              />
                            </div>
                          </a>
                          <div className="slickChild_Box">
                            <h3 className="fontSize18 fw800 white">
                              Crystalline Model
                            </h3>
                            <p className="fontSize14 fw500 grey mb-0">
                              7 Days Left
                            </p>
                          </div>
                        </div>
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-5">
                <div className="row">
                  <div className="col-md-12 ">
                    <div className="join_Box">
                      <div className="join_Txt">
                        <h3 className="collect_Head fontSize22 fw700 white mb-0">
                          Join your giveaways securely
                        </h3>
                        <p className="collect_Para fontSize16 grey mb-0">
                          Turn creativity into currency with confidence in
                          Collection Reward's secure marketplace.
                        </p>
                      </div>
                      <Image
                        src={images.joinBoxImg}
                        alt="joinBoxImg"
                        className="img-fluid"
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="join_Box mt-3">
                      <div className="join_Txt">
                        <h3 className="collect_Head fontSize22 fw700 white mb-0">
                          Embrace benefits for the marketplace
                        </h3>
                        <p className="collect_Para fontSize16 grey mb-0">
                          Unlock digital ownership's future with transparency,
                          security, and decentralized beauty.
                        </p>
                      </div>
                      <Image
                        src={images.benefitImg}
                        alt="benefitImg"
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                    <div className="slickBox ">
                      <a href="#" className="marquee_Links" target="_blank">
                        <div className="client_Logoes d-flex justify-content-center">
                          <Image
                            src={images.selectionSliderImg1}
                            alt="slider_img"
                            className="img-fluid"
                          />
                        </div>
                      </a>
                      <div className="slickChild_Box">
                        <h3 className="fontSize16 fw800 white">Cube #12</h3>
                        <p className="fontSize14 fw500 grey mb-0">
                          7 Days Left
                        </p>
                      </div>
                    </div>
                    <div className="slickBox">
                      <a href="#" className="marquee_Links" target="_blank">
                        <div className="client_Logoes d-flex justify-content-center">
                          <Image
                            src={images.selectionSliderImg2}
                            alt="slider_img"
                            className="img-fluid"
                          />
                        </div>
                      </a>
                      <div className="slickChild_Box">
                        <h3 className="fontSize16 fw800 white">Cube #12</h3>
                        <p className="fontSize14 fw500 grey mb-0">
                          7 Days Left
                        </p>
                      </div>
                    </div>
                    <div className="slickBox">
                      <a href="#" className="marquee_Links" target="_blank">
                        <div className="client_Logoes d-flex justify-content-center">
                          <Image
                            src={images.selectionSliderImg3}
                            alt="slider_img"
                            className="img-fluid"
                          />
                        </div>
                      </a>
                      <div className="slickChild_Box">
                        <h3 className="fontSize16 fw800 white">Cube #12</h3>
                        <p className="fontSize14 fw500 grey mb-0">
                          7 Days Left
                        </p>
                      </div>
                    </div>
                    <div className="slickBox">
                      <a href="#" className="marquee_Links" target="_blank">
                        <div className="client_Logoes d-flex justify-content-center">
                          <Image
                            src={images.selectionSliderImg1}
                            alt="slider_img"
                            className="img-fluid"
                          />
                        </div>
                      </a>
                      <div className="slickChild_Box">
                        <h3 className="fontSize16 fw800 white">Cube #12</h3>
                        <p className="fontSize14 fw500 grey mb-0">
                          7 Days Left
                        </p>
                      </div>
                    </div>
                    <div className="slickBox">
                      <a href="#" className="marquee_Links" target="_blank">
                        <div className="client_Logoes d-flex justify-content-center">
                          <Image
                            src={images.selectionSliderImg3}
                            alt="slider_img"
                            className="img-fluid"
                          />
                        </div>
                      </a>
                      <div className="slickChild_Box">
                        <h3 className="fontSize16 fw800 white">Cube #12</h3>
                        <p className="fontSize14 fw500 grey mb-0">
                          7 Days Left
                        </p>
                      </div>
                    </div>
                    <div className="slickBox">
                      <a href="#" className="marquee_Links" target="_blank">
                        <div className="client_Logoes d-flex justify-content-center">
                          <Image
                            src={images.selectionSliderImg2}
                            alt="slider_img"
                            className="img-fluid"
                          />
                        </div>
                      </a>
                      <div className="slickChild_Box">
                        <h3 className="fontSize16 fw800 white">Cube #12</h3>
                        <p className="fontSize14 fw500 grey mb-0">
                          7 Days Left
                        </p>
                      </div>
                    </div>
                    <div className="slickBox">
                      <a href="#" className="marquee_Links" target="_blank">
                        <div className="client_Logoes d-flex justify-content-center">
                          <Image
                            src={images.selectionSliderImg3}
                            alt="slider_img"
                            className="img-fluid"
                          />
                        </div>
                      </a>
                      <div className="slickChild_Box">
                        <h3 className="fontSize16 fw800 white">Cube #12</h3>
                        <p className="fontSize14 fw500 grey mb-0">
                          7 Days Left
                        </p>
                      </div>
                    </div>
                    <div className="slickBox">
                      <a href="#" className="marquee_Links" target="_blank">
                        <div className="client_Logoes d-flex justify-content-center">
                          <Image
                            src={images.selectionSliderImg1}
                            alt="slider_img"
                            className="img-fluid"
                          />
                        </div>
                      </a>
                      <div className="slickChild_Box">
                        <h3 className="fontSize16 fw800 white">Cube #12</h3>
                        <p className="fontSize14 fw500 grey mb-0">
                          7 Days Left
                        </p>
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how_Work">
        <div className="container work_Container">
          <div className="row">
            <div className="col-md-12">
              <div className="text-center">
                <h1 className="section_Heading fontSize16 fw600 blue mb-0">
                  How It Works
                </h1>
                <p className="pricing_Para fontSize43 white mb-0">
                  Super convenient marketplace
                </p>
                <p className="work_Subpara fontSize18 grey mb-0">
                  Discover, collect, and win giveaways easily by discovering
                  treasures and showcasing with confidence.{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="workDescription_Parent">
            <div className="row">
              <div className="col-md-12">
                <div className="workDescription">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="howWork_Box">
                        <h1 className="workDesc_Head fontSize36 white mb-0">
                          Discover
                        </h1>
                        <p className="fontSize18 grey">
                          Begin your journey by exploring Collection Reward's
                          curated collections, revealing a diverse tapestry of
                          exclusive digital art.
                        </p>
                        <p className="fontSize18 grey ">
                          Seamlessly navigate through a world of creative
                          wonders, discovering unique pieces at every turn.
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 text-end">
                      <Image src={images.Overlay} alt="Overlay" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                    <div className="howWork_Box">
                    <h1 className="workDesc_Head fontSize36 white mb-0">
                      Enter
                    </h1>
                    <p className="fontSize18 grey">
                      Assemble your personal digital sanctuary by securely
                      collecting rare and unique giveaways.
                    </p>
                    <p className="fontSize18 grey ">
                      Collection Reward safeguards your treasures, cultivating a
                      bespoke gallery that reflects your passion for the
                      extraordinary.
                    </p>
                  </div>
                    </div>
                    <div className="col-md-6 text-end">
                      <Image src={images.enterImg} alt="Overlay" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                    <div className="howWork_Box">
                    <h1 className="workDesc_Head fontSize36 white mb-0">Win</h1>
                    <p className="fontSize18 grey">
                      Elevate your digital artistry by showcasing and selling
                      your creations securely on Collection Reward's platform.
                    </p>
                    <p className="fontSize18 grey ">
                      Seamlessly list your masterpieces, confident in the
                      platform's robust security measures for transactions.
                    </p>
                  </div>
                    </div>
                    <div className="col-md-6 text-end">
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
          <div className="row">
            <div className="col-md-12">
              <div className="pricingHead_Container text-center">
                <h1 className="section_Heading fontSize16 fw600 blue mb-0">
                  Testimonials
                </h1>
                <p className="pricing_Para fontSize43 white mb-0">
                  Hear what our creators and <br /> collectors say about us
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="testimonials_Box">
                <div>
                  <Image src={images.quotesLogo} alt="quotesLogo" />
                  <p className="testBox_Para fontSize18 white mb-0">
                    Collection Reward has revolutionized my art journey; as an
                    NFT creator, I've found a vibrant community and seamless
                    selling experience.
                  </p>
                </div>
                <div className="testImg_Parent">
                  <Image src={images.testimonialsImg} alt="testimonialsImg" />
                  <div>
                    <h3 className="fontSize16 grey fw500 mb-0">
                      PixelPioneer{" "}
                    </h3>
                    <h3 className="fontSize16 grey mb-0 pt-1">Creator</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="testimonials_Box">
                <div>
                  <Image src={images.quotesLogo} alt="quotesLogo" />
                  <p className="testBox_Para fontSize18 white mb-0">
                    As a digital art enthusiast and collector, Collection
                    Reward's curated selections make every discovery a treasure.
                  </p>
                </div>
                <div className="testImg_Parent">
                  <Image src={images.testimonialsImg2} alt="testimonialsImg" />
                  <div>
                    <h3 className="fontSize16 grey fw500 mb-0">
                      CryptoCollector
                    </h3>
                    <h3 className="fontSize16 grey mb-0 pt-1">Collector</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-3">
              <div className="testimonials_Box">
                <div>
                  <Image src={images.quotesLogo} alt="quotesLogo" />
                  <p className="testBox_Para fontSize18 white mb-0">
                    Collection Reward's secure platform has given my digital
                    creations a global stage, providing a trustworthy space for
                    NFT’s selling and connecting. Great platform!
                  </p>
                </div>
                <div className="testImg_Parent">
                  <Image src={images.testimonialsImg3} alt="testimonialsImg" />
                  <div>
                    <h3 className="fontSize16 grey fw500 mb-0">NFTArtisan</h3>
                    <h3 className="fontSize16 grey mb-0 pt-1">Creator</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-3">
              <div className="testimonials_Box">
                <div>
                  <Image src={images.quotesLogo} alt="quotesLogo" />
                  <p className="testBox_Para fontSize18 white mb-0">
                    Collection Reward has become my haven for unique Giveaways
                    as a collector, the experience of discovering and owning
                    digital art has never been more rewarding.
                  </p>
                </div>
                <div className="testImg_Parent">
                  <Image src={images.testimonialsImg4} alt="testimonialsImg" />
                  <div>
                    <h3 className="fontSize16 grey fw500 mb-0">
                      PCryptoConnoisseur
                    </h3>
                    <h3 className="fontSize16 grey mb-0 pt-1">Collector</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-3">
              <div className="testimonials_Box">
                <div>
                  <Image src={images.quotesLogo} alt="quotesLogo" />
                  <p className="testBox_Para fontSize18 white mb-0">
                    The community spirit on Collection Reward is electric; as a
                    creator, it's not just a platform to sell but a space to
                    connect, share, and thrive in the NFT space.
                  </p>
                </div>
                <div className="testImg_Parent">
                  <Image src={images.testimonialsImg5} alt="testimonialsImg" />
                  <div>
                    <h3 className="fontSize16 grey fw500 mb-0">EtherMaestro</h3>
                    <h3 className="fontSize16 grey mb-0 pt-1">Creator</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="pricingHead_Container text-center">
                <h1 className="section_Heading fontSize16 fw600 blue mb-0">
                  pricing
                </h1>
                <p className="pricing_Para fontSize43 white mb-0">
                  We got a plan that’s perfect for you!
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="subscription_Box ">
                <h3 className="fontSize32 white mb-0 pt-3">Standard</h3>
                <p className="subs_Price fontSize24 blue mb-0">
                  $14.99<span className="fontSize16 white fw700">/month</span>
                </p>
                <button className="subs_Btn">Buy plan</button>
                <ul className="subs_Offer mb-0">
                  <li>
                    <i class="fa-solid fa-check checkLogo"></i> 10 entries into
                    every giveaway
                  </li>
                  <li>
                    <i class="fa-solid fa-check checkLogo"></i> Free Standard
                    edition PPT for each new collection
                  </li>
                  <li>
                    <i class="fa-solid fa-check checkLogo"></i> Access to
                    members only giveaways
                  </li>
                  <li>
                    <i class="fa-solid fa-check checkLogo"></i> 10% Discount on
                    collectables
                  </li>
                  <li>
                    <i class="fa-solid fa-check checkLogo"></i> Access to VIP
                    Exclusive collectables
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <div className="subscription_Box premium_Box">
                <h3 className="fontSize32 white mb-0 pt-3">Premium</h3>
                <p className="subs_Price fontSize24 blue mb-0">
                  $29.99<span className="fontSize16 white fw700">/month</span>
                </p>
                <button className="subs_Btn active">Buy plan</button>
                <ul className="subs_Offer mb-0">
                  <li>
                    <i class="fa-solid fa-check checkLogo"></i> 25 entries into
                    every giveaway
                  </li>
                  <li>
                    <i class="fa-solid fa-check checkLogo"></i> Free Standard
                    edition PPT for each new collection
                  </li>
                  <li>
                    <i class="fa-solid fa-check checkLogo"></i> Access to
                    members only giveaways
                  </li>
                  <li>
                    <i class="fa-solid fa-check checkLogo"></i> 20% Discount on
                    collectables
                  </li>
                  <li>
                    <i class="fa-solid fa-check checkLogo"></i> Access to VIP
                    Exclusive collectables
                  </li>
                </ul>

                <div className="mostPopular_Txt fontSize16 white">
                  Most Popular
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="subscription_Box deluxe">
                <h3 className="fontSize32 white mb-0 pt-3">Deluxe</h3>
                <p className="subs_Price fontSize24 blue mb-0">
                  $49.99<span className="fontSize16 white fw700">/month</span>
                </p>
                <button className="subs_Btn">Buy plan</button>
                <ul className="subs_Offer mb-0">
                  <li>
                    <i class="fa-solid fa-check checkLogo"></i> 50 entries into
                    every giveaway
                  </li>
                  <li>
                    <i class="fa-solid fa-check checkLogo"></i> Free Standard
                    edition PPT for each new collection
                  </li>
                  <li>
                    <i class="fa-solid fa-check checkLogo"></i> Access to
                    members only giveaways
                  </li>
                  <li>
                    <i class="fa-solid fa-check checkLogo"></i> 10% Discount on
                    collectables
                  </li>
                  <li>
                    <i class="fa-solid fa-check checkLogo"></i> Access to VIP
                    Exclusive collectables
                  </li>
                  <li>
                    <i class="fa-solid fa-check checkLogo"></i> 1 Free
                    Collectable per month
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h3 className="section_Heading fontSize16 fw600 mb-0">
                Frequently asked questions
              </h3>
              <p className=" faq_Para fontSize43 white mb-0">
                Some of the things you <br /> may want to know
              </p>
              <p className="fontSize18 grey mb-0">
                Have more questions? Don’t hesitate to reach us
              </p>
            </div>
            <div className="col-md-6">
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
                        Why should I consider owning an NFT, and how does
                        Collection Reward enhance this experience?
                      </button>
                    </h2>
                    <div
                      id="flush-collapseOne"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body">
                        Placeholder content for this accordion, which is
                        intended to demonstrate the{" "}
                        <code>.accordion-flush</code> class. This is the first
                        item's accordion body.
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
                        Is Collection Reward secure for transactions and
                        ownership?
                      </button>
                    </h2>
                    <div
                      id="flush-collapseTwo"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body">
                        Placeholder content for this accordion, which is
                        intended to demonstrate the{" "}
                        <code>.accordion-flush</code> class. This is the second
                        item's accordion body. Let's imagine this being filled
                        with some actual content.
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
                        How do I start collecting and selling on Collection
                        Reward?
                      </button>
                    </h2>
                    <div
                      id="flush-collapseThree"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body">
                        Placeholder content for this accordion, which is
                        intended to demonstrate the{" "}
                        <code>.accordion-flush</code> class. This is the third
                        item's accordion body. Nothing more exciting happening
                        here in terms of content, but just filling up the space
                        to make it look, at least at first glance, a bit more
                        representative of how this would look in a real-world
                        application.
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
                        What sets Collection Reward apart from other NFT
                        platforms?
                      </button>
                    </h2>
                    <div
                      id="flush-collapseFour"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body">
                        Placeholder content for this accordion, which is
                        intended to demonstrate the{" "}
                        <code>.accordion-flush</code> class. This is the third
                        item's accordion body. Nothing more exciting happening
                        here in terms of content, but just filling up the space
                        to make it look, at least at first glance, a bit more
                        representative of how this would look in a real-world
                        application.
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item ">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed accordion_LastItem"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseFive"
                        aria-expanded="false"
                        aria-controls="flush-collapseFive"
                      >
                        How can I connect with other creators and collectors on
                        Collection Reward?
                      </button>
                    </h2>
                    <div
                      id="flush-collapseFive"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body">
                        Placeholder content for this accordion, which is
                        intended to demonstrate the{" "}
                        <code>.accordion-flush</code> class. This is the third
                        item's accordion body. Nothing more exciting happening
                        here in terms of content, but just filling up the space
                        to make it look, at least at first glance, a bit more
                        representative of how this would look in a real-world
                        application.
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
                  Start your giveaway journey
                </h1>
                <p className="journey_Para fontSize18 grey mb-0">
                  Join collection rewards and dive into the world of exclusive
                  digital art.
                </p>
                <button className="common_Btn getStart_Btn">
                  Get Started <i className="fa-solid fa-arrow-right ms-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
    );

};

export default HomePage;