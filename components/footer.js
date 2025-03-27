import React from "react";
import Link from "next/link";
import Image from "next/image";
import * as images from "./../utilities/images";

const Footer = () => {
  return (
    
    <section className="footer">
      <div className="container">
        <div className="footerRow">
          <div className="row justify-content-between">
            <div className="col-6">
              <div>
                <Image src={images.mainLogo} alt="mainLogo" />
                <p className=" footerRight_Txt fontSize16 lightGrey">
                  Discover Collect and <br />
                  Win Exclusive Digital <br />
                  Giveaways.
                </p>
                <p className="fontSize16 lightGrey">
                  ABN: 45 210 255 398
                </p>
              </div>
            </div>
            <div className="col-md-3 d-md-flex justify-content-end">
              <div className="footer_List">
                {/* <h3 className="fontSize16 fw500 white">Company</h3> */}
                <ul>
                  <li>
                    <Link href="/howitwork" className="fontSize16 grey">About</Link>
                  </li>
                  {/* <li className="position-relative ">
                    <Link href="" className="fontSize16 grey pb-3">
                      Careers
                      <button className="hiring_Btn fontSize14 ms-3">
                        Hiring
                      </button>
                    </Link>
                  </li> */}
                  <li>
                    <Link href="/termAndCondition" className="fontSize16 grey">Terms of Service</Link>
                  </li>
                  <li>
                    <Link href="/giveawaytnc" className="fontSize16 grey">Giveaway Terms and Conditions</Link>
                  </li>
                  <li>
                    <Link href="/privacyAndPolicy" className="fontSize16 grey">Privacy Policy</Link>
                  </li>
                  {/* <li>
                    <Link href="" className="fontSize16 grey pb-5">Contact</Link>
                  </li> */}
                </ul>
              </div>
            </div>
            {/* <div className="col-md-3 d-flex justify-content-end">
              <div className="footer_List">
                <h3 className="fontSize16 fw500 white">Resources</h3>
                <ul>
                  <li>
                    <Link href="" className="fontSize16 grey">Blog</Link>
                  </li>
                  <li>
                    <Link href="" className="fontSize16 grey pb-5">Contact</Link>
                  </li>
                  <li>
                    <Link href="" className="fontSize16 grey">Community</Link>
                  </li>
                  <li>
                    <Link href="" className="fontSize16 grey">Become a partner</Link>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="copyRight_Section">
              <p className="fontSize14 lightGrey mb-0">
                © Copyright Collection Reward 2025. All Rights Reserved
              </p>
              <div className="footerIconOuter">
                <a href="https://www.instagram.com/collectionrewards" target="_blank" rel="noopener noreferrer" className="footerSocialIcon"><Image src={images.instaLogo} alt="siteLogo" className="footerLogo" /></a>
                <a href="https://www.facebook.com/profile.php?id=61568632929230" target="_blank" rel="noopener noreferrer" className="footerSocialIcon"><i className="fa-brands fa-facebook footerLogo"></i></a>
                {/* <div className="footerSocialIcon"><Image src={images.twitterLogo} alt="siteLogo" className="footerLogo" /></div> */}
                {/* <div className="footerSocialIcon"><Image src={images.playgamesLogo} alt="siteLogo" className="footerLogo" /></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
   
  );
};

export default Footer;
