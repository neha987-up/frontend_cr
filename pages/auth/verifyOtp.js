import React, { useEffect, useState } from 'react'
import Image from "next/image";
import * as Images from "../../utilities/images";
import OtpInput from 'react-otp-input';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { resendPhoneOtp, verifyPhoneOtp } from '../../redux/slices/auth';
const VerifyOtp = () => {
    const router = useRouter()
    const { loading } = useSelector((state) => state.auth);
    const [phoneData, setPhoneData] = useState("")
    const [otp, setOtp] = useState("");
    const toastId = React.useRef(null)
    const dispatch = useDispatch()
    const generateRandomName = () => {
        return Math.random().toString(36).substr(2, 10);
    };
    const onComplete = (code) => {
        setOtp(code);
    }

    const handleVerifyOtp = (e) => {
        e.preventDefault()
        if (!otp || otp.length < 5) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Please enter your otp");
            }
            return false
        }
        let params
        if (phoneData?.user_id) {
            params = {
                "type": "phone",
                "verification_id": `${phoneData?.verification_id}`,
                "otp": otp,
                "user_id": `${phoneData?.user_id}`,

            }
        }
        else {
            params = {
                "type": "phone",
                "verification_id": `${phoneData?.verification_id}`,
                "otp": otp
            }
        }

        dispatch(
            verifyPhoneOtp({
                ...params,
                cb(res) {
                    if (res.status) {
                        router.push(`/auth/verifyEmail`)
                        localStorage.setItem("existing_user", JSON.stringify(res?.data?.payload))
                    } else {
                    }
                },
            })
        );
    }

    const resendOtp = () => {
        let params = {
            "type": "phone",
            "verification_id": Number(phoneData?.verification_id)
        }
        dispatch(
            resendPhoneOtp({
                ...params,
                cb(res) {
                    if (res.status) {
                    } else {
                    }
                },
            })
        );
    }

    console.log(phoneData,"phone data")

    useEffect(() => {
        console.log(localStorage.getItem("phone_details"),"user")
        setPhoneData(localStorage.getItem("phone_details") ? JSON.parse(localStorage.getItem("phone_details")) : "")
    }, []);

    return (
        <>
            <div className='chooseRoles'>
                <div className="commonLogin">
                    <div className="container-fluid">
                        <div className="row ">
                            <div className="col-lg-6 p-0 text-center">
                                <div className='leftSect'>
                                    <div className="login_left">
                                        <Image src={Images.shop} className="d-none d-md-block img-fluid mx-auto mb-3" alt="img" />
                                        <span className='heading_'><b>Create Your <br />Organization</b></span>
                                    </div>
                                    <div className='aboutBusiness'>
                                        {/* <img src={stepHalf} className='img-fluid mb-4' /> */}
                                        <h4 className='mb-2 innerSubtext'>Tell us about your Business</h4>
                                        <span className=''>Please let us know what you need help with and We will  <br />do our best to assist you.</span>
                                        <p className="mt-4 gobacklink justify-content-center d-flex align-items-center"><i className="fa-solid fa-arrow-left-long" style={{ cursor: "pointer" }} onClick={() => router.push('/auth/login')}></i> Go back to <Link href="/auth/login" > Login </Link> </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 signupForm_">
                                <div className='loginhorrizontal-form verifyFrom'>
                                    <form autoComplete="nope" className="form_horizontal row" onSubmit={(e) => handleVerifyOtp(e)}>
                                        <div className="logo-part">
                                            <Link href="#">
                                                <Image className='mb-4' src={Images.authLogo} alt="img" />
                                            </Link>
                                            <h2>Verify your <strong>phone number</strong></h2>
                                            <p>Enter OTP code here</p>
                                        </div>
                                        <div className="verify-part">

                                            <div className="verify-box text-center">
                                                <div className="pin-box d-flex justify-content-center" >
                                                    <OtpInput
                                                        numInputs={5}
                                                        value={otp}
                                                        data-cy="pin-field"
                                                        name={generateRandomName}
                                                        autoComplete="new-password"
                                                        isInputNum={true}
                                                        onChange={onComplete}
                                                        renderInput={(props) => <input {...props} />}
                                                    // onComplete={(code) => onComplete(code)}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-12 mt-5 text-center">
                                            <p className='mb-2'>Didn’t receive Code? <Link href='#' onClick={() => resendOtp()}>Resend</Link></p>
                                            <button className="loginBtnAuth w-100" disabled={loading} type="submit">
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
    )
}

export default VerifyOtp