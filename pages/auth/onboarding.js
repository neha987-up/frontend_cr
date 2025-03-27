import React, { useEffect, useState } from 'react'
import Image from "next/image";
import Link from 'next/link';
import * as Images from "../../utilities/images";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getServices } from '../../redux/slices/auth';
const ChooseRoles = () => {
    const router = useRouter()
    const [organisationName, setOrganisationName] = useState("")
    const toastId = React.useRef(null)
    const [businessType, setBusinesType] = useState("")
    const [registerBusiness, setRegisterBusiness] = useState(false);
    const [serviceList, setServiceList] = useState([])
    const [filteredList, setFilteredList] = useState([])
    const [operatingIndustry, setOperatingIndustry] = useState("")
    const [activeTab, setActiveTab] = useState("")

    const handleBusinessChange = (e) => {
        setBusinesType(e.target.value)
        let filteredData = serviceList?.filter((val) => val.type === e.target.value)
        setFilteredList(filteredData)
    }
    const handleOperatingIndustryChange = (e) => {
        setOperatingIndustry(e.target.value)
    }
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!activeTab) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Please select role in market")
            }
            return
        }
        if (!organisationName) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Please enter organisation name")
            }
            return
        }
        if (!businessType) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Please select business type")
            }
            return
        }
        if (!operatingIndustry) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Please select operating industry")
            }
            return
        }
        let data = {
            "seller_type": activeTab,
            "organization_name": organisationName,
            "is_business_registered": registerBusiness,
            "service_id": operatingIndustry
        }
        console.log(data,"data of onboarding")
        router.push('/auth/signUp')
        localStorage.setItem("onboarding", JSON.stringify(data))
    }

    useEffect(() => {
        dispatch(
            getServices({
                cb(res) {
                    if (res.status) {
                        setServiceList(res?.data?.payload?.data)
                    } else {
                    }
                },
            })
        );
    }, [])

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
                                    <Image src={Images.stepHalf} className='img-fluid mb-4' alt="img" />
                                    <h4 className='mb-2 innerSubtext'>Tell us about your Business</h4>
                                    <span className=''>Please let us know what you need help with and We will  <br />do our best to assist you.</span>
                                    <p className="mt-4 gobacklink justify-content-center d-flex align-items-center"><i className="fa-solid fa-arrow-left-long" style={{ cursor: "pointer" }} onClick={() => router.push('/auth/login')}></i> Go back to <Link href="/auth/login" > Login </Link> </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className='loginhorrizontal-form'>
                                <div className='row mb-5'>
                                    <h4 className="subheading_ col-md-12 mb-2">Your Role in Market</h4>
                                    <div className='col-lg-4 p-13'>
                                        <div className={`rolesContainer ${activeTab == 'manufacturer' ? 'active' : ''}`}
                                            onClick={() => setActiveTab("manufacturer")}
                                        >
                                            <Image src={Images.manufacture} className='rolesImg mb-2' alt='manufacture' />
                                            <Image src={Images.manufacture1} className='rolesImgHoverImg rolesHoverImg mb-2' alt='RetailerActive' />
                                            <h5 className='mainlightHead mt-2'>Manufacturer</h5>
                                        </div>
                                    </div>
                                    <div className='col-lg-4 p-13'>
                                        <div className={`rolesContainer ${activeTab == 'whole_seller' ? 'active' : ''}`}
                                            onClick={() => setActiveTab("whole_seller")}>
                                            <Image src={Images.distributor} className='rolesImg mb-2' alt='Distributor' />
                                            <Image src={Images.distributer1} className='rolesImgHoverImg rolesHoverImg mb-2' alt='RetailerActive' />
                                            <h5 className='mainlightHead mt-2'>Distributor</h5>
                                        </div>
                                    </div>
                                    <div className='col-lg-4 p-13'>
                                        <div className={`rolesContainer ${activeTab == 'retailer' ? 'active' : ''}`}
                                            onClick={() => setActiveTab("retailer")}>
                                            <Image src={Images.Retailer} className='rolesImg mb-2' alt='Retailer' />
                                            <Image src={Images.retailerActive} className='rolesImgHoverImg rolesHoverImg mb-2' alt='RetailerActive' />
                                            <h5 className='mainlightHead mt-2'>Retailer</h5>
                                        </div>
                                    </div>
                                </div>
                                <form autoComplete="nope" className="form_horizontal row" onSubmit={(e) => { handleSubmit(e) }}>
                                    <div className="mb-4 form-group col-md-12">
                                        <label className="deatilsHead mb-3">Your Organization name</label>
                                        <input
                                             type="text"
                                             className="customform-control"
                                             name="text"
                                             autoComplete="new-password"
                                             placeholder="Name of your Organization"
                                             value={organisationName}
                                             onChange={(e) => setOrganisationName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-5 form-group col-md-12">
                                        <label className="deatilsHead mb-3">Business type </label>
                                        <select autoComplete="new-password" className='customform-control select' defaultValue={"Business Type"} onChange={(e) => handleBusinessChange(e)}>
                                            <option value="Business Type" disabled>Business Type</option>
                                            <option value="product">Product</option>
                                            <option value="service">Services</option>
                                        </select>
                                        <span className="toggle_password_ info_icon"><span className="hide-icon togglePassword" id=""></span></span>
                                    </div>
                                    <div className="mb-4 form-group col-md-12">
                                        <label className="deatilsHead mb-3">Your Operating industry </label>
                                        <select autoComplete="new-password" className='customform-control select' disabled={businessType === ""} defaultValue={"Operating Industry"} onChange={(e) => handleOperatingIndustryChange(e)}>
                                            <option value="Operating Industry" disabled>Operating Industry</option>
                                            {
                                                filteredList.length > 0 ?
                                                    <>
                                                        {filteredList?.map((value, index) => {
                                                            return (
                                                                <option value={value?.id} key={index}>{value?.name}</option>
                                                            )
                                                        })}
                                                    </> : <></>
                                            }
                                        </select>
                                        <span className="toggle_password_ info_icon"><span className="hide-icon togglePassword" id=""></span></span>
                                    </div>
                                    <div className='mb-4 form-group col-md-12'>
                                    <input type="checkbox" id="register_business" name="register_business" value="register_business" checked={registerBusiness}
                                            onChange={() => setRegisterBusiness(!registerBusiness)} />
                                        <label htmlFor="register" className='ms-2'>This is registered business.</label><br />
                                    </div>
                                    <div className="col-md-12 mt-5">
                                        <button className="loginBtnDisable w-100" type="submit">
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
    )
}

export default ChooseRoles