import React from "react";

const LogoutModal = ({ close, logout }) => {
  return (
    <>
      <div className="d-flex justify-content-center">
        <button
          onClick={() => close()}
          type="submit"
          className="common_Btn modal_Btn me-4"
        >
          No, Cancel
        </button>
        <button
          onClick={() => {
            logout(), close();
          }}
          type="submit"
          className="common_Btn modal_Btn"
        >
          Yes, Logout
        </button>
      </div>
    </>
  );
};

export default LogoutModal;
