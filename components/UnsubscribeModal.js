import React from "react";

const UnsubscribeModal = ({ close, unsub, del }) => {
  return (
    <>
      {del && <p className="white">
        By deleting your account, you will lose access to:
        <ul className="white">
          <li>Your purchased tokens</li>
          <li>Any ongoing giveaways and rewards</li>
          <li>Your membership benefits</li>
        </ul>
      </p>}
      <div className="d-flex justify-content-center">
        <button
          onClick={() => close()}
          type="submit"
          className="common_Btn modal_Btn me-4"
        >
          No, Don't
        </button>
        <button
          onClick={() => {
            unsub(); close();
          }}
          type="submit"
          className="common_Btn modal_Btn"
        >
          Yes, {del ? 'Delete' : 'Cancel'}
        </button>
      </div>
    </>
  );
};

export default UnsubscribeModal;
