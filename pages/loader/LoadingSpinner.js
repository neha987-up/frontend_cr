import Image from "next/image";
import * as Images from "../../utilities/images";

export default function LoadingSpinner() {
  return (
    <div className="spinner-container-bg">
      {" "}
      <div className="spinner-container">
        {" "}
        <div className="loading-spinner">
          {" "}
          <Image
            className="loader-svg"
            src={Images.loadingimg}
            alt="loading-image"
            width="65"
            height={100}
          />{" "}
        </div>
        <p className="mainSubHeading">Your task is processing</p>
        <p className="subHeading">Please Wait..</p>{" "}
      </div>{" "}
    </div>
  );
}
