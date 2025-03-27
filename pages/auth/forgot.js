import React, { useState } from 'react'
import Image from "next/image";
import * as Images from "../../utilities/images";
import Link from 'next/link';
import PhoneInput from 'react-phone-input-2'
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../redux/slices/auth';
import { useSelector } from 'react-redux';
const Forgot = () => {
  const [key, setKey] = useState(Math.random());
  const [phoneNo, setPhoneNo] = useState("")
  const [phoneCode, SetPhoneCode] = useState("");
  const router = useRouter();
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const toastId = React.useRef(null)
  const generateRandomName = () => {
    return Math.random().toString(36).substr(2, 10);
  };
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: ""
  });
  const handleOnCloseModal = () => {
    setModalDetail({
      show: false,
      title: "",
      flag: ""
    });
    setKey(Math.random());
  }

  const onChangePhoneNumber = (value, data) => {
    let phoneCode = data.dialCode;
    let phoneNumber = value.slice(data.dialCode.length);
    setPhoneNo(phoneNumber);
    SetPhoneCode(phoneCode);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!phoneCode) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Please select your phone code");
      }
      return false
    }
    if (!phoneNo) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Please enter your phone number");
      }
      return false
    }
    let data = {
      "type": "phone",
      "phone_code": `+${phoneCode}`,
      "phone_no": phoneNo
    }

    dispatch(
      forgotPassword({
        ...data,
        cb(res) {
          if (res.status) {
            router.push(`/auth/resetPassword?id=${res?.data?.payload?.user_id}`)
          } else {
          }
        },
      })
    );
  }

  return (
    <>
      <div className="commonLogin forgetcommon">
        <div className="container-fluid">
          <div className="row horizontalLogin">
            <div className="col-lg-6">
              <div className="loginForm">
                <div className="loginhead">
                  <h4 className="heading">Have you forgot password?</h4>
                  <p className="smallText">To reset your password, enter your phone number</p>
                </div>
                <form autoComplete="nope" className="form_horizontal" onSubmit={(e) => { handleSubmit(e) }}>
                  <div className="mb-4 form-group">
                    {/* <label className="form-label">Phone Number</label> */}
                    {/* <input
                      type="text"
                      className="customform-control"
                      name="email"
                      placeholder="Phone Number"
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                    /> */}
                    <div className="phone-numbpart">
                      <div className="country-plugin">
                        <label className="form-label">Phone Number</label>
                        <div id="result">
                          <PhoneInput
                            country="us"
                            // value={phoneNo}
                            name={generateRandomName}
                            autoComplete='new-password'
                            enableSearch={true}
                            placeholder="Phone no."
                            onChange={(value, data, event, formattedValue) => { onChangePhoneNumber(value, data, event, formattedValue) }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-grid gap-2 col-12 mx-auto">
                    <button className="loginBtnAuth mt-1" type="submit"
                      disabled={loading}
                    >
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      &nbsp;&nbsp;
                      <span>Send Otp</span>
                    </button>
                    <p className="mt-4 gobacklink justify-content-center d-flex align-items-center"><i className="fa-solid fa-arrow-left-long" style={{ cursor: "pointer" }} onClick={() => router.push('/auth/login')}></i> Go back to <Link href="/auth/login" to="#"> Login </Link> </p>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6 p-0">
              <div className="loginhorrizontal-form ">
                <div className="login_left">
                  <Image
                    src={Images.forgotBanner}
                    className="d-none d-md-block img-fluid"
                    alt="img"
                  />
                </div>
              </div>
            </div>
            <div className="copyRight">
              <p>All Rights Reserved by JOBR LLC | 2022</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Forgot