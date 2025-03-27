import React, { useEffect, useState } from "react";
import Image from "next/image";
import { calculateTimeLeft } from "../utilities/globalMethods";
import moment from "moment-timezone";

const GiveawayCard = ({ item, handleOpenModal, setTokenDetail }) => {
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = calculateTimeLeft(item?.end_date);
      setRemainingTime(timeLeft);
      if (moment(item?.end_date).isBefore(moment())) {
        setIsOver(true)
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [item]);

  return (

    <section>

      <div className="container-fluid givewayContainer mb-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="givewayContent">
              <h1 className="fontSize30 mb-2 oneLine">
                {item?.name}
                {/* Giveaway */}
                {/* <br /> Name */}
              </h1>

              <div
                className="fontSize16"
                dangerouslySetInnerHTML={{ __html: item?.description }}
              />
              {/* <p className="fontSize16">{item?.description}</p> */}
              <div className="">
                {remainingTime?.days == 0 && remainingTime?.hours == 0 &&
                  remainingTime?.minutes == 0 &&
                  remainingTime?.seconds == 0 ? <></> : (
                  <>
                    <ul className="collectionCardList">
                      {remainingTime.days > 0 && <li>
                        <h2>
                          {remainingTime.days}
                        </h2>
                        <span>Days</span>
                      </li>}
                      <li>
                        <h2>
                          {remainingTime.hours}
                        </h2>
                        <span>Hours</span>
                      </li>
                      <li>
                        <h2>
                          {remainingTime.minutes}
                        </h2>
                        <span>Minutes</span>
                      </li>
                      <li>
                        <h2>
                          {remainingTime.seconds}
                        </h2>
                        <span>Seconds</span>
                      </li>
                    </ul>
                    {item?.user_draws == null && (
                      <button
                        onClick={() => {
                          setTokenDetail(item);
                          handleOpenModal("givewayModal");
                        }}
                        className="common_Btn"
                      >
                        Join Now
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6 pe-0 paddingleft0">
            <div className="collectionCard">
              <Image
                width={700}
                height={300}
                src={item?.images?.[0]?.images}
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: "473px",
                  maxHeight: "473px",
                  borderRadius: "15px",
                  objectFit: "cover",
                }}
                onClick={() => {
                  setTokenDetail(item);
                  handleOpenModal("givewayModal");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiveawayCard;
