import React, { useEffect, useState } from 'react'
import Image from "next/image";
import * as Images from "../../utilities/images";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from 'react-phone-input-2';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import LoginProfileModal from './LoginProfileModal';
import CustomModal from '../../components/modals/CustomModal';
import SuccessfulModal from './SuccessfulModal';
import { signUp } from '../../redux/slices/auth';

const Signup = () => {
    const router = useRouter()
    const toastId = React.useRef(null)
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const [onBoadingData, setOnBoardingData] = useState("")
    const [signUpResponse, setSignUpResponse] = useState("")
    const [phoneData, setPhoneData] = useState("")
    const [existingUser, setExistingUser] = useState("")
    const [emailInfo, setEmailInfo] = useState("")
    const [phoneInfo, setPhoneInfo] = useState("")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [phoneCode, SetPhoneCode] = useState("");
    const [password, setPassword] = useState("")
    const [securityPin, setSecurityPin] = useState(existingUser?.user_profiles?.security_pin.length == 4 ? existingUser?.user_profiles?.security_pin : "");
    const [confirmSecurityPin, setConfirmSecurityPin] = useState(existingUser?.user_profiles?.security_pin.length == 4 ? existingUser?.user_profiles?.security_pin : "");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [countryValue, setCountryValue] = useState("");
    const [cityValue, setCityValue] = useState("");
    const [stateValue, setStateValue] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [businessWebsite, setBusinessWebsite] = useState("");
    const [defaultAddress, setDefaultAddress] = useState(false);
    const [key, setKey] = useState(Math.random());
    const generateRandomName = () => {
        return Math.random().toString(36).substr(2, 10);
    };
    const [modalDetail, setModalDetail] = useState({
        show: false,
        title: "",
        flag: ""
    });
    // let location = useLocation()

    const handleOnCloseModal = () => {
        setModalDetail({
            show: false,
            title: "",
            flag: ""
        });
        setKey(Math.random());
    }
    const handleModalDetails = (data) => {
        if (data === "Successful" || data === "LoginProfile") {
            setModalDetail({ show: true, flag: data })
            setKey(Math.random())
        }
    }

    const onChangePhoneNumber = (value, data, event, formattedValue) => {
        let phoneCode = data.dialCode;
        let phoneNumber = value.slice(data.dialCode.length);
        setPhoneNo(phoneNumber);
        SetPhoneCode(phoneCode);
    }

    const autoCompleteHandleChange = (address) => {
        console.log(address, 'addressssss');
        setAddress(address);
        geocodeByAddress(address)
            .then((results) => {
                // fillAddressDetails(results);
                setLatitude(results[0].geometry.location.lat())
                setLongitude(results[0].geometry.location.lng())
            })
            .catch((error) => { });
        setZipCode("");
        setCityValue("");
        setStateValue("");
        setCountryValue("");
    };

    const autoCompleteHandleSelect = (address) => {
        geocodeByAddress(address)
            .then((results) => {
                fillAddressDetails(results);
                setLatitude(results[0].geometry.location.lat())
                setLongitude(results[0].geometry.location.lng())
            })
            .catch((error) => { });
    };

    const fillAddressDetails = (results) => {
        console.log(results, 'results');
        setAddress(results[0].formatted_address);
        for (let j = 0; j < results[0].address_components.length; j++) {
            if (results[0].address_components[j].types[0] == "postal_code") {
                setZipCode(results[0].address_components[j].short_name);
            } else if (results[0].address_components[j].types[0] == "locality") {
                setCityValue(results[0].address_components[j].long_name);
            } else if (
                results[0].address_components[j].types[0] ==
                "administrative_area_level_1" ||
                results[0].address_components[j].types[0] === 'administrative_area_level_3' ||
                results[0].address_components[j].types[0] === 'locality'
            ) {
                setStateValue(results[0].address_components[j].long_name);
            } else if (results[0].address_components[j].types[0] == "country") {
                setCountryValue(results[0].address_components[j].long_name);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!firstName) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Please enter your firstname")
            }
            return
        }
        if (!lastName) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Please enter your lastname")
            }
            return
        }
        if (!phoneCode) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Please enter your phonecode")
            }
            return
        }
        if (!phoneNo) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Please enter your phone number")
            }
            return
        }
        if (phoneNo.length < 10) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Phone no must be of 10 digits")
            }
            return
        }
        if (!email) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Please enter your email")
            }
            return
        }
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        var resultemail = pattern.test(email);
        if (resultemail === false) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Please enter valid email");
            }
            return;
        }
        if (!address) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Please enter your address")
            }
            return
        }
        if (!(/^\d{4}$/.test(securityPin)) && phoneData?.is_security_pin_exist === false) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Security pin must be number and of 4 digit")
            }
            return
        }
        if (!phoneData?.is_security_pin_exist && (securityPin !== confirmSecurityPin)) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Pin and confirm pin should be same");
            }
            return
        }
        if (!countryValue) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Please enter your country")
            }
            return
        }
        if (!stateValue) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Please enter your state")
            }
            return
        }
        if (!cityValue) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Please enter your city")
            }
            return
        }
        if (!zipCode) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Please enter your zipcode")
            }
            return
        }
        if (!latitude && !longitude) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Incorrect Address")
            }
            return
        }
        let data = {
            "seller_type": onBoadingData?.seller_type,
            "organization_name": onBoadingData?.organization_name,
            "is_business_registered": onBoadingData?.is_business_registered,
            "service_id": onBoadingData?.service_id,
            "firstname": firstName,
            "lastname": lastName,
            "phone_code": phoneCode,
            "phone_no": phoneNo,
            "email": phoneData?.user_email ? phoneData?.user_email : emailInfo,
            "current_address": {
                "street_address": address,
                "country": countryValue,
                "state": stateValue,
                "city": cityValue,
                "zipcode": zipCode,
                "address_type": "current",
                "longitude": longitude,
                "latitude": latitude
            },
            "is_default_address": defaultAddress,
        }

        if (businessWebsite && businessWebsite != '') {
            data = {
                ...data,
                "business_website": businessWebsite
            }
        }

        if (phoneData?.user_id) {
            data = {
                ...data,
                "user_id": phoneData?.user_id
            }
        }
        if (!phoneData?.is_security_pin_exist) {
            data = {
                ...data,
                "security_pin": securityPin
            }
        }
        dispatch(
            signUp({
                ...data,
                cb(res) {
                    console.log(res, "response")
                    if (res.status) {
                        console.log(res, "signup res")
                        setSignUpResponse(res?.data?.payload)
                        setTimeout(() => {
                            setModalDetail({ show: true, flag: "Successful" });
                            setKey(Math.random());
                        }, 1000);
                        localStorage.removeItem("phone_details")
                        localStorage.removeItem("email_details")
                        localStorage.removeItem("email_info")
                        localStorage.removeItem("existingUser")
                        localStorage.removeItem("onboarding")
                    } else {
                    }
                },
            })
        );

    }

    console.log(emailInfo, "email info")
    console.log(phoneData, "phone info")
    useEffect(() => {
        let emailData = localStorage.getItem("email_info") ? localStorage.getItem("email_info") : ""
        let phoneData = localStorage.getItem("phone_details") ? JSON.parse(localStorage.getItem("phone_details")) : ""
        let existingUser = localStorage.getItem("existing_user") ? JSON.parse(localStorage.getItem("existing_user")) : ""
        let phoneInfo = localStorage.getItem("phone_info") ? JSON.parse(localStorage.getItem("phone_info")) : ""
        console.log(phoneInfo, existingUser,"data of existing")
        console.log(`${existingUser?.user_profiles?.phone_no ? existingUser?.user_profiles?.phone_no : phoneInfo?.phone_no}${existingUser?.user_profiles?.phone_no ? existingUser?.user_profiles?.phone_no : phoneInfo?.phone_no}`,"phone no")
        setEmail(phoneData?.user_email ? phoneData?.user_email : emailData);
        setFirstName(phoneData?.user_profiles?.firstname ? phoneData?.user_profiles?.firstname : "");
        setLastName(phoneData?.user_profiles?.lastname ? phoneData?.user_profiles?.lastname : "");
        setPhoneNo(existingUser?.user_profiles?.phone_no ? existingUser?.user_profiles?.phone_no : phoneInfo?.phone_no);
        SetPhoneCode(existingUser?.user_profiles?.phone_code ? existingUser?.user_profiles?.phone_code : phoneInfo?.phone_code);
        setSecurityPin(existingUser?.user_profiles?.security_pin.length == 4 ? existingUser?.user_profiles?.security_pin : "");
        setConfirmSecurityPin(existingUser?.user_profiles?.security_pin.length == 4 ? existingUser?.user_profiles?.security_pin : "");
        setPhoneData(phoneData)
        setExistingUser(existingUser)
        setEmailInfo(emailData)
        setPhoneInfo(phoneInfo)
        setOnBoardingData(localStorage.getItem("onboarding") ? JSON.parse(localStorage.getItem("onboarding")) : "")
    }, []);

    console.log(router.query, "query router")
    return (
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
                                    <Image src={Images.stepFull} className='img-fluid mb-4' alt="img" />
                                    <h4 className='mb-2 innerSubtext'>Tell us about your Business</h4>
                                    <span className=''>Please let us know what you need help with and We will  <br />do our best to assist you.</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className='loginhorrizontal-form'>
                                <form autoComplete="nope" className="form_horizontal row" onSubmit={(e) => handleSubmit(e)}>
                                    <div className="mb-4 form-group col-md-6">
                                        <label className="deatilsHead mb-3">First name</label>
                                        <input
                                            type="text"
                                            className="customform-control"
                                            name={generateRandomName}
                                            autoComplete="new-password"
                                            placeholder="First name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4 form-group col-md-6">
                                        <label className="deatilsHead mb-3">Last Name</label>
                                        <input
                                            type="text"
                                            className="customform-control"
                                            name={generateRandomName()}
                                            autoComplete="new-password"
                                            placeholder="Last Name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4 form-group col-md-12">
                                        <label className="deatilsHead mb-3">Phone Number</label>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            {
                                                console.log(`${phoneCode}${phoneNo}`,"phone response")
                                            }
                                            <PhoneInput
                                                country="us"
                                                // value={phoneNo}
                                                name={generateRandomName}
                                                autoComplete='new-password'
                                                enableSearch={true}
                                                // defaulltValue={`${phoneCode}${phoneNo}`}
                                                value={phoneCode + phoneNo}
                                                disabled
                                                placeholder="Phone no."
                                            onChange={(value, data, event, formattedValue) => { onChangePhoneNumber(value, data, event, formattedValue) }}
                                            />
                                            {phoneInfo?.phone_no ? <Image style={{ width: "20px" }} src={Images.check1} alt="img" /> : <></>}
                                        </div>
                                    </div>
                                    <div className="mb-4 form-group col-md-12">
                                        <label className="deatilsHead mb-3">Email Address</label>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <input
                                                type="email"
                                                className="customform-control"
                                                name={generateRandomName}
                                                autoComplete="new-password"
                                                placeholder="Email"
                                                value={email}
                                                disabled
                                            // onChange={(e) => setEmail(e.target.value)}
                                            />
                                            {emailInfo || phoneData?.user_email ? <Image style={{ width: "20px" }} src={Images.check1} alt="img" /> : <></>}
                                        </div>
                                    </div>

                                    {/* <div className="mb-4 form-group col-md-12">
                                        <label className="deatilsHead mb-3">Password </label>
                                        <input
                                            className="customform-control id_password"
                                            placeholder="Password here"
                                            name={generateRandomName()}
                                            type="password"
                                            autoComplete="new-password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />

                                    </div> */}

                                    {phoneData?.is_security_pin_exist == true ?
                                        <></>
                                        :
                                        <>
                                            <div className="mb-4 form-group col-md-12">
                                                <label className="deatilsHead mb-3">Security Pin </label>
                                                <input
                                                    className="customform-control id_password"
                                                    placeholder="Security Pin here"
                                                    name="securityPin"
                                                    type="password"
                                                    autoComplete="new-password"
                                                    value={securityPin}
                                                    maxLength={4}
                                                    disabled={existingUser?.user_profiles?.security_pin.length == 4}
                                                    onChange={(e) => setSecurityPin(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-4 form-group col-md-12">
                                                <label className="deatilsHead mb-3">Confirm Security Pin </label>
                                                <input
                                                    className="customform-control id_password"
                                                    placeholder="Confirm Security Pin here"
                                                    name="confirmSecurityPin"
                                                    type="password"
                                                    autoComplete="new-password"
                                                    value={confirmSecurityPin}
                                                    maxLength={4}
                                                    disabled={existingUser?.user_profiles?.security_pin.length == 4}
                                                    onChange={(e) => setConfirmSecurityPin(e.target.value)}
                                                />
                                            </div>
                                        </>
                                    }

                                    <div className="mb-4 form-group col-md-12">
                                        <label className="deatilsHead mb-3">Address Line 1</label>
                                        <div className='inputGroup'>
                                            <PlacesAutocomplete
                                                className=""
                                                autoComplete="off"
                                                value={address}
                                                onChange={autoCompleteHandleChange}
                                                onSelect={autoCompleteHandleSelect}
                                                searchOptions={{
                                                    componentRestrictions: {
                                                        country: ['us'],
                                                    }
                                                }}
                                            >
                                                {({
                                                    getInputProps,
                                                    suggestions,
                                                    getSuggestionItemProps,
                                                    loading,
                                                }) => (
                                                    <div>
                                                        <input
                                                            {...getInputProps({
                                                                placeholder: 'Street Address',
                                                                className: 'location-search-input customform-control',
                                                            })}
                                                        />
                                                        <div className="autocomplete-dropdown-container">
                                                            {loading && <div>Loading...</div>}
                                                            {suggestions.map((suggestion, index) => {
                                                                const className = suggestion.active
                                                                    ? "suggestion-item--active"
                                                                    : "suggestion-item";
                                                                // inline style for demonstration purpose
                                                                const style = suggestion.active
                                                                    ? {
                                                                        backgroundColor: "#41b6e6",
                                                                        cursor: "pointer",
                                                                    }
                                                                    : {
                                                                        backgroundColor: "#ffffff",
                                                                        cursor: "pointer",
                                                                    };
                                                                return (
                                                                    <div
                                                                        {...getSuggestionItemProps(suggestion, {
                                                                            className,
                                                                            style,
                                                                        })}
                                                                        key={index}
                                                                    >
                                                                        <span>{suggestion.description}</span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )}
                                            </PlacesAutocomplete>
                                        </div>
                                    </div>
                                    <div className="mb-4 form-group col-md-6">
                                        <label className="deatilsHead mb-3">Country</label>
                                        <input
                                            className="customform-control id_password"
                                            placeholder="Country"
                                            name={generateRandomName}
                                            autoComplete="new-password"
                                            type="text"
                                            value={countryValue}
                                            onChange={(e) => setCountryValue(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4 form-group col-md-6">
                                        <label className="deatilsHead mb-3">State</label>
                                        <input
                                            className="customform-control id_password"
                                            placeholder="State"
                                            name={generateRandomName}
                                            autoComplete="new-password"
                                            type="text"
                                            value={stateValue}
                                            onChange={(e) => setStateValue(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4 form-group col-md-6">
                                        <label className="deatilsHead mb-3">City</label>
                                        <input
                                            className="customform-control id_password"
                                            placeholder="City"
                                            name={generateRandomName}
                                            autoComplete="new-password"
                                            type="text"
                                            value={cityValue}
                                            onChange={(e) => setCityValue(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4 form-group col-md-6">
                                        <label className="deatilsHead mb-3">Zip code</label>
                                        <input
                                            type="number"
                                            className="customform-control"
                                            name={generateRandomName}
                                            autoComplete="new-password"
                                            placeholder="Zip code"
                                            value={zipCode}
                                            onChange={(e) => setZipCode(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4 form-group col-md-12">
                                        <label className="deatilsHead mb-3">Business website (Optional)</label>
                                        <input
                                            type="text"
                                            className="customform-control"
                                            placeholder="Organization website"
                                            value={businessWebsite}
                                            name={generateRandomName}
                                            autoComplete="new-password"
                                            onChange={(e) => setBusinessWebsite(e.target.value)}
                                        />
                                    </div>
                                    <div className='mb-4 form-group col-md-12'>
                                        <input type="checkbox" id="register" autoComplete="new-password" name="defaultAddress" checked={defaultAddress} onChange={(e) => setDefaultAddress(!defaultAddress)} />
                                        <label htmlFor="register" className='ms-2'>Set as default address</label><br />
                                    </div>
                                    <div className="col-md-12 mt-5">
                                        <button className="loginBtnDisable w-100" type="submit" disabled={loading}
                                        >
                                            {loading && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                            )}
                                            <span>Next</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CustomModal
                key={key}
                show={modalDetail.show}
                backdrop="static"
                showCloseBtn={false}
                isRightSideModal={false}
                mediumWidth={false}
                ids={
                    modalDetail.flag === "VerifyModal" ? "verifyModal"
                        : modalDetail.flag === "Successful" ? "successful"
                            : modalDetail.flag === "LoginProfile" ? "loginProfileModal"
                                : ""
                }
                size={modalDetail.flag === "VerifyModal" ? "md" : modalDetail.flag === "Successful" ? "md" : ""}
                child={modalDetail.flag === 'Successful' ? <SuccessfulModal close={() => handleOnCloseModal()}
                    details={(e) => handleModalDetails(e)} />
                    : modalDetail.flag === 'LoginProfile' ? <LoginProfileModal close={() => handleOnCloseModal()} data={signUpResponse} />
                        : <></>}
                onCloseModal={() => handleOnCloseModal()}
            />

        </div>
    )
}

export default Signup