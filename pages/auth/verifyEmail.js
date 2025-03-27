import React, { useEffect, useState } from 'react'
import Image from "next/image";
import * as Images from "../../utilities/images";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { sendEmailOtp } from '../../redux/slices/auth';
const VerifyEmail = () => {
    const router = useRouter()
    const [phoneData, setPhoneData] = useState("")
    const [email, setEmail] = useState(phoneData?.user_email ? phoneData?.user_email : "")
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const toastId = React.useRef(null)
    const generateRandomName = () => {
        return Math.random().toString(36).substr(2, 10);
    };
    const handleSendOtp = (e) => {
        e.preventDefault();
        let checkEmail = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        if (!checkEmail.test(email)) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Invalid email given.");
            }
            return false;
        }

        let params
        if (phoneData?.user_id) {
            params = {
                "type": "email",
                "email": email,
                "user_id": `${phoneData?.user_id}`
            }
        }
        else {
            params = {
                "type": "email",
                "email": email
            }
        }

        dispatch(
            sendEmailOtp({
                ...params,
                cb(res) {
                    console.log(res,"response")
                    if (res.status) {
                        localStorage.setItem("email_details", JSON.stringify(res?.data?.payload));
                        localStorage.setItem("email_info", email);
                        router.push('/auth/verifyEmailOtp')
                    } else {
                    }
                },
            })
        );
    }

    useEffect(() => {
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
                                    <form autoComplete="nope" className="form_horizontal row" onSubmit={(e) => handleSendOtp(e)}>
                                        <div className="logo-part">
                                            <Link href="#">
                                                <Image className='mb-4' src={Images.authLogo} alt="img" />
                                            </Link>
                                            <h2>Verify your <strong>Email</strong></h2>
                                            <p>We’ll send you OTP to your email</p>
                                        </div>
                                        <div className="phone-numbpart">
                                            <div className="country-plugin">
                                                <input type="text" autoComplete="new-password" className="customform-control" value={email} name={generateRandomName} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-12 mt-4">
                                            <button className="loginBtnAuth w-100" type="submit">
                                            {loading && (
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

export default VerifyEmail