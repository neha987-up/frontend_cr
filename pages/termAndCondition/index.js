import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSettings } from "../../redux/slices/setting";

const TermAndCondition = () => {
  const dispatch = useDispatch();

  const [settingData, setsettingData] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      getAllSettings();
    }
  }, []);

  const getAllSettings = () => {
    dispatch(
      getSettings({
        params: {},
        callback: (res, error) => {
          if (res) {
            setsettingData(res?.data?.payload?.find(x => x?.setting_name === "term_of_services")?.setting_value);
          } else if (error) {
            console.log(error);
          }
        },
      })
    );
  };
  return (
    <section className="termAndConditionSection">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h3 className="white mb-4" >Terms of Service</h3>
            <div className="white" dangerouslySetInnerHTML={{ __html: settingData }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermAndCondition;
