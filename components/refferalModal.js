import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as images from "../utilities/images";
import { selectLoginAuth } from "../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ApiClient } from "../utilities/api";
import { AUTH_API_URL } from "../utilities/config";
import { getSettings } from "../redux/slices/setting";

const RefferModal = ({ show, close, refferdata }) => {
  const dispatch = useDispatch();
  const authData = useSelector(selectLoginAuth);
  const [userData, setUserData] = useState(null);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refCode, setRefCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const res = await ApiClient.get(`${AUTH_API_URL}/api/v1/users/verify/code/${refCode}`)
      if (res?.status) {
        refCode && refferdata(refCode)
        close()
        toast.success(res?.data?.msg)
      }
    } catch (error) {
      console.log(error, '+++')
    } finally {
      setIsLoading(false)
    }
  };

  const getAllMyRewards = async () => {
    try {
      const res = await ApiClient.get(`${AUTH_API_URL}/api/v1/users/my/points`)
      setList(res.data.payload.points.users.sort((a, b) => a.id - b.id))
    } catch (error) {
      console.log(error, '+++')
    }
  };

  useEffect(() => {
    if (show == 'full') {
      getAllMyRewards()
    }
  }, [show])


  useEffect(() => {
    if (typeof window !== "undefined" && authData) {
      setUserData(authData?.usersInfo?.user)
      getAllSettings()
    }
  }, [authData]);

  const getAllSettings = () => {
    dispatch(
      getSettings({
        params: {},
        callback: (res, error) => { },
      })
    );
  };

  const copyText = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success('Coppied to clipboard !!')
    } catch (err) {
    }
  };

  return (
    <form>
      {(show == 'full' || show == 'top') && <div className="mb-0">
        <p className="verifySubHeading">What does my invited friend need to do :</p><br />

        <p className="verifySubHeading">1. Sign up for a new VIP membership and complete the payment process</p>
        <p className="verifySubHeading">2. Before claiming their VIP entries, enter your unique referral code</p>
        <p className="verifySubHeading mb-4">3. Once claimed any bonus entries will automatically be added both of your accounts</p>
        <label for="email" className="common_Label fontSize16 white">
          Share your link
        </label>
        <br />
        <div className="referCodeOuter">
          <input
            value={userData?.refer_code}
            disabled
            type="text"
            className="common_Input"
            placeholder="GYGY-GJHB-MLIM-BHJB"
          />
          <div className="copyRefferCode" onClick={() => copyText(userData?.refer_code)}>
            <Image src={images.referIcon} alt="icon" />
          </div>
        </div>
      </div>}

      {show == 'half' &&
        <>
          <div className="mb-3">
            <label for="email" className="common_Label fontSize16 white">
              Have a code?
            </label>
            <br />
            <div className="referCodeOuter">
              <input
                value={refCode}
                type="text"
                className="common_Input"
                placeholder="Enter referral code here"
                onChange={(e) => {
                  setRefCode(e.target.value.trim());
                }}
              />
            </div>
          </div>
          <button
            className="common_Btn modal_Btn w-100 fw700 mb-4"
            type="button"
            onClick={(e) => handleSubmit(e)}
            disabled={!refCode}
          >
            {isLoading ? <div className="spinner"></div> : "Claim"}
          </button>
        </>
      }

      {show == 'full' && list.length > 0 && <>
        <hr className="referHr" />
        <h3 className="fontSize20 mb-1">My Rewards</h3>
        <p className="verifySubHeading mb-3">View all referral records here</p>
        {list.map((x, inx) =>
          <div className="myRewardInner mb-3">
            <div className="myRewardLeft">
              <h4 className="fontSize18">{x.user_info.name}</h4>
              <p className="fontSize14">{x.points} Entries</p>
            </div>
            <div className={`redeemedBtn ${x.is_used ? '' : 'notRedemedBtn'}`}>{x.is_used ? '' : 'Not '} Redeemed</div>
          </div>
        )}
      </>}
    </form>
  );
};

export default RefferModal;
