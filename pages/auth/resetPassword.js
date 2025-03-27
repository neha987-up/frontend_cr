import React, { useState } from 'react'
import Image from "next/image";
import * as Images from "../../utilities/images";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { resetPassword } from '../../redux/slices/auth';
const ResetPassword = () => {
  const router = useRouter();
  const { id } = router.query;
  const [password, setPassword] = useState("")
  const toastId = React.useRef(null)
  const { loading } = useSelector((state) => state.auth);
  const [confirmPassword, setConfirmPassword] = useState("")
  const [verificaionCode, setVerificationCode] = useState("")
  const dispatch = useDispatch()
  const generateRandomName = () => {
    return Math.random().toString(36).substr(2, 10);
  };
  const handleSubmit = async(e) => {
    e.preventDefault()
    if (!verificaionCode) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Please enter verification code which you got on your phone");
      }
      return false
    }
    if (!password) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Please enter your pin");
      }
      return false
    }
    if (password.length < 4) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Pin length should be of 4 digit");
      }
      return false
    }
    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Pin and confirm pin should be same");
      }
      return false
    }
    let data = {
      "type": "phone",
      "user_id": id,
      "reset_password_otp": verificaionCode,
      "new_pin": password,
    }

    dispatch(
      resetPassword({
        ...data,
        cb(res) {
          if (res.status) {
            router.push(`/auth/login`)
          } else {
          }
        },
      })
    );

  }

  return (
    <>
    <div className="commonLogin resetcommon">
        <div className="container-fluid">
          <div className="row horizontalLogin">
            <div className="col-lg-6">
              <div className="loginForm">
                <div className="loginhead">
                  <h4 className="heading">Create a New Pin</h4>
                  <p className="smallText">Your new pin must be different from previous used pins.</p>
                </div>
                <form  autoComplete="nope" className="form_horizontal" onSubmit={(e) => { handleSubmit(e) }}>
                  <div className="mb-1 form-group">
                    <label className="form-label">New Pin </label>
                    <input
                      className="form-control id_password"
                      placeholder="Password here"
                      name={generateRandomName}
                      autoComplete="new-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      maxLength={4}
                    />
                    <p className="textLine">Must be at least 4 digits</p>
                    <span className="toggle_password_ info_icon"><span className="hide-icon togglePassword" id=""></span></span>
                  </div>
                  <div className="mb-1 form-group">
                    <label className="form-label">Confirm New Pin </label>
                    <input
                      className="form-control id_password"
                      placeholder="Password here"
                      name={generateRandomName}
                      autoComplete="new-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      maxLength={4}
                    />
                    <span className="toggle_password_ info_icon"><span className="hide-icon togglePassword" id=""></span></span>
                  </div>
                  <div className="mb-1 form-group">
                    <label className="form-label">Verification Code </label>
                    <input
                      className="form-control id_password"
                      placeholder="verification code"
                      name={generateRandomName}
                      autoComplete="new-password"
                      type="password"
                      value={verificaionCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      maxLength={5}
                    />
                    <span className="toggle_password_ info_icon"><span className="hide-icon togglePassword" id=""></span></span>
                  </div>
                  <div className="d-grid gap-2 col-12 mx-auto">
                    <button className="loginBtnAuth mt-4" type="submit" disabled={loading}> 
                    {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      &nbsp;&nbsp;
                      <span>Set New Pin</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6 p-0">
              <div className="loginhorrizontal-form ">
                <div className="login_left">
                  <Image
                    src={Images.resetBanner}
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

export default ResetPassword