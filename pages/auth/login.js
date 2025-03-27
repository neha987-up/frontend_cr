import React, { useEffect, useState } from 'react'
import Image from "next/image";
import * as Images from "../../utilities/images";
import PhoneInput from 'react-phone-input-2'
import { toast } from 'react-toastify';
import { customerLogin, onErrorStopLoad, userLogin } from '../../redux/slices/auth';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Cookies from "universal-cookie";
const Login = () => {
    const router = useRouter();
    const { flag } = router.query;

    console.log(flag, "login flag")
    const cookies = new Cookies();
    const [passwordShown, setPasswordShown] = useState(false);
    const { loading } = useSelector((state) => state.auth);
    console.log(loading, "loading state")
    const [phoneCode, SetPhoneCode] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [password, setPassword] = useState("")
    const toastId = React.useRef(null)
    const dispatch = useDispatch()
    const generateRandomName = () => {
        return Math.random().toString(36).substr(2, 10);
    };
    const handleSendOtp = (e) => {
        e.preventDefault()
        if (!phoneNo) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Please enter phone number");
            }
            return;
        }
        else if (phoneNo && phoneNo.length <= 9) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Phone number length should be of 10 digits");
            }
            return;
        }
        else if (phoneNo && !phoneCode) {
            toastId.current = toast.error("Please select your phone code");
            return;
        }
        if (!password) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Please enter your pin");
            }
            return false
        }
        else if (password.length > 4) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Pin length should be of 4 digits");
            }
            return;
        }
        let params = {
            "type": "phone",
            "phone_code": `+${phoneCode}`,
            "phone_number": phoneNo,
            "security_pin": password
        }

        let customerParams = {
            "phone_code": `+${phoneCode}`,
            "phone_number": phoneNo,
            "password": password
        }

        if (flag == "customer") {
            console.log("customer called")
            dispatch(
                customerLogin({
                    ...customerParams,
                    cb(res) {
                        if (res.status) {
                            router.push('/')
                        } else {
                        }
                    },
                })
            );
        }
        else {
            dispatch(
                userLogin({
                    ...params,
                    cb(res) {
                        if (res.status) {
                            console.log(res, "auth response")
                            cookies.set(
                                'userLogin', res.data.payload.token, { path: '/' }
                            );
                            cookies.set(
                                'userLogin', res.data.payload.token, { domain: 'jobr.com', path: '/' }
                            );
                            window.location.href = 'https://merchant-admin.jobr.com/verify';
                            //   window.location.href = 'https://merchant-admin.jobr.com/verify';
                        } else {
                        }
                    },
                })
            );
        }
    }

    const onChangePhoneNumber = (value, data) => {
        let phoneCode = data.dialCode;
        let phoneNumber = value.slice(data.dialCode.length);
        setPhoneNo(phoneNumber);
        SetPhoneCode(phoneCode);
    }
    useEffect(() => {
        if (cookies.get('userLogin')) {
            cookies.remove('userLogin', { path: '/' })
            cookies.remove('userLogin', { domain: 'jobr.com', path: '/' })
        }
    }, [])

    useEffect(() => {
        dispatch(onErrorStopLoad())
    }, [dispatch])
    return (
        <>
            <div className='commonLogin'>
                <div className='container-fluid'>
                    <div className='row horizontalLogin'>
                        <div className='col-lg-6'>
                            <div className=' loginForm'>
                                <form autoComplete="nope" className="form_horizontal row" onSubmit={(e) => handleSendOtp(e)}>
                                    <div className="logo-part">
                                        <Link href='/'>
                                            <Image className='mb-4' src={Images.authLogo} alt="img" />
                                        </Link>
                                        <h2>Enter your <strong>Phone number</strong></h2  >

                                    </div>
                                    <div className="phone-numbpart">
                                        <div className="country-plugin">
                                            <label className="form-label">Phone Number</label>
                                            <div id="result">
                                                <PhoneInput
                                                    country="us"
                                                    value={phoneCode + phoneNo}
                                                    enableSearch={true}
                                                    name={generateRandomName}
                                                    placeholder="Phone no."
                                                    onChange={(value, data, event, formattedValue) => onChangePhoneNumber(value, data, event, formattedValue)}
                                                />
                                                <span className="toggle_password_ info_icon"><span className="hide-icon togglePassword" id=""></span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="phone-numbpart mt-2">
                                        <label className="form-label">Pin</label>
                                        <input
                                            className="customform-control id_password"
                                            placeholder="Pin here"
                                            name={generateRandomName}
                                            type={passwordShown ? "text" : "password"}
                                            maxLength={4}
                                            value={password}
                                            autoComplete="new-password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span className="toggle_password_ info_icon" onClick={() => { setPasswordShown(prev => !prev) }}>
                                            <span className={passwordShown ? "show-icon togglePassword" : "hide-icon togglePassword"}></span>
                                        </span>
                                    </div>
                                    <div className="remeberForgot form-group mt-1 mb-5">
                                        <p className="forgot mb-0" onClick={() => { router.push("/auth/forgot") }}>Forgot Password?</p>
                                    </div>
                                    <div className="d-grid gap-2 col-12 mx-auto">
                                        <button className="loginBtnAuth" type="submit">
                                            {loading && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                            )}
                                            &nbsp;&nbsp;
                                            <span>Login</span>
                                        </button>
                                        <p className="mt-4 gobacklink justify-content-center d-flex align-items-center"> Don't have an account <Link href='/auth/verifyPhone'  > Sign-up </Link> </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className="loginhorrizontal-form ">
                                <div className="login_left">
                                    <Image
                                        src={Images.loginBanner}
                                        className="d-none d-md-block img-fluid"
                                        alt="img"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login