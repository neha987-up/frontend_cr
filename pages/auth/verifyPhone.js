import React, { useState } from "react";
import Image from "next/image";
import * as Images from "../../utilities/images";
import PhoneInput from "react-phone-input-2";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { verifyPhoneApi } from "../../redux/slices/auth";
import { toast } from "react-toastify";

const VerifyPhone = () => {
  const router = useRouter();
  const { loading } = useSelector((state) => state.auth);
  const [phoneCode, SetPhoneCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const toastId = React.useRef(null);
  const dispatch = useDispatch();
  const generateRandomName = () => {
    return Math.random().toString(36).substr(2, 10);
  };
  const onChangePhoneNumber = (value, data) => {
    let phoneCode = data.dialCode;
    let phoneNumber = value.slice(data.dialCode.length);
    setPhoneNo(phoneNumber);
    SetPhoneCode(phoneCode);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phoneNo) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Please enter phone number");
      }
      return;
    } else if (phoneNo && phoneNo.length <= 9) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(
          "Phone number length should be of 10 digits"
        );
      }

      return;
    } else if (phoneNo && !phoneCode) {
      toastId.current = toast.error("Please select your phone code");
      return;
    }
    let params = {
      phone_code: `+${phoneCode}`,
      phone_no: phoneNo,
      type: "phone",
    };

    dispatch(
      verifyPhoneApi({
        ...params,
        cb(res) {
          if (res.status) {
            console.log(res, "response of phone");
            localStorage.setItem(
              "phone_details",
              JSON.stringify(res?.data?.payload)
            );
            localStorage.setItem("phone_info", JSON.stringify(params));
            if (!res?.payload?.user_id) {
              router.push("/auth/verifyOtp");
            } else if (
              res?.data?.payload?.is_email_verified === false ||
              !res?.data?.payload?.user_email
            ) {
              router.push("/auth/verifyEmail");
            } else {
              router.push("/auth/onboarding");
            }
          } else {
          }
        },
      })
    );
    // dispatch(sendPhoneOtpApiAsync(params))
    //     .then(unwrapResult)
    //     .then((obj) => {
    //         console.log(obj,'phone data response');
    // if (!toast.isActive(toastId.current)) {
    //     toastId.current = toast.success(obj?.msg)
    // }
    // localStorage.setItem("phone_details", JSON.stringify(obj?.payload))
    // localStorage.setItem("phone_info", JSON.stringify(params))
    // if (!obj?.payload?.user_id) {
    //     history.push('/verifyOtp')
    // }
    // else if (obj?.payload?.is_email_verified === false || !obj?.payload?.user_email) {
    //     history.push('/verifyEmail')
    // } else {
    //     history.push('/onboarding')
    // }
    //         setLoading(false)
    //     }
    //     )
    //     .catch((obj) => {
    //         setLoading(false)
    //     })
  };

  return (
    <>
      <div className="chooseRoles">
        <div className="commonLogin">
          <div className="container-fluid">
            <div className="row ">
              <div className="col-lg-6 p-0 text-center">
                <div className="leftSect">
                  <div className="login_left">
                    <Image
                      src={Images.shop}
                      className="d-none d-md-block img-fluid mx-auto mb-3"
                      alt="img"
                    />
                    <span className="heading_">
                      <b>
                        Create Your <br />
                        Organization
                      </b>
                    </span>
                  </div>
                  <div className="aboutBusiness">
                    {/* <img src={stepHalf} className='img-fluid mb-4' /> */}
                    <h4 className="mb-2 innerSubtext">
                      Tell us about your Business
                    </h4>
                    <span className="">
                      Please let us know what you need help with and We will{" "}
                      <br />
                      do our best to assist you.
                    </span>
                    <p className="mt-4 gobacklink justify-content-center d-flex align-items-center">
                      <i
                        className="fa-solid fa-arrow-left-long"
                        style={{ cursor: "pointer" }}
                        onClick={() => router.push("/auth/login")}
                      ></i>{" "}
                      Go back to <Link href="/auth/login"> Login </Link>{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 signupForm_">
                <div className="loginhorrizontal-form verifyFrom">
                  <form
                    autoComplete="nope"
                    className="form_horizontal row"
                    onSubmit={(e) => handleSendOtp(e)}
                  >
                    <div className="logo-part">
                      <Link href="#">
                        <Image
                          className="mb-4"
                          src={Images.authLogo}
                          alt="img"
                        />
                      </Link>
                      <h2>
                        Enter your <strong>Phone number</strong>
                      </h2>
                      <p>We’ll send you OTP to set your new PIN</p>
                    </div>
                    <div className="phone-numbpart">
                      <div className="country-plugin">
                        <div id="result">
                          <PhoneInput
                            country="us"
                            value={phoneCode + phoneNo}
                            enableSearch={true}
                            name={generateRandomName}
                            placeholder="Phone no."
                            onChange={(value, data, event, formattedValue) =>
                              onChangePhoneNumber(
                                value,
                                data,
                                event,
                                formattedValue
                              )
                            }
                          />
                          {/* <span id="valid-msg" className="hide">✓ Valid</span> */}
                          <span id="error-msg" className="hide"></span>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12 mt-4">
                      <button
                        className="loginBtnAuth w-100"
                        disabled={loading}
                        type="submit"
                      >
                        {loading === true && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                        &nbsp;&nbsp;
                        <span>Next</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyPhone;
