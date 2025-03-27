import moment from 'moment-timezone'
import { useRouter } from 'next/router';
import React from 'react'
import * as Images from "../../utilities/images";
import Image from "next/image";
import { useSelector } from 'react-redux'
import Cookies from "universal-cookie";
const LoginProfileModal = (props) => {
  const cookies = new Cookies();
  const router = useRouter()

  let date = new Date()
  let verifyData
  const handleContinue = () => {
    cookies.set(
      'userLogin', props?.data?.token, { path: '/' }
    );
    cookies.set(
      'userLogin', props?.data?.token, { domain: 'jobr.com', path: '/' }
    );
    window.location.href = 'https://merchant-admin.jobr.com/verify';
  }
  return (
    <div className='loginProfileModal'>
      <div className="contentContainer_">
        <h5 className="heading24">Confirm your log in</h5>
        <Image src={Images.userDummy} className="profileUserImg mt-4 mb-4" alt="user" />
        <div className="userDetais">
          <div className="userValues">
            <p className="subHeading16 mb-2">{props?.data?.user?.user_profiles?.firstname}{" "}{props?.data?.user?.user_profiles?.lastname}</p>
            <p className="subHeading16 mb-2">ID:{props?.data?.user?.id}</p>
          </div>
          <p className="subHeading13">Today {moment(date).format('dddd DD MMM YYYY')}<br />
            Time {moment(date).format('hh:mm A')}</p>
          <button className="primaryBtn mt-4 w-100" onClick={() => handleContinue()}>Continue</button>
        </div>
      </div>
    </div>
  )
}

export default LoginProfileModal