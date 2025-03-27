import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const CustomModal = (props) => {
  const [show, setShow] = useState(props.show);

  const handleClose = () => {
    setShow(false);
    if (props.onCloseModal) {
      props.onCloseModal();
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      keyboard={false}
      size={props.size}
      id={props.ids}
      dialogClassName={
        props.isRightSideModal
          ? "common-modal modal-dialog-centered modal-dialog-scrollable"
          : ""
      }
      className={props.isRightSideModal ? "pe-0" : ""}
      animation={true}
      backdrop={props.backdrop ?? false}
    >
      {props.style && <div className="modal-backdrop" style={props.style} />}
      {props.header || props.showCloseBtn ? (
        <Modal.Header>{props.header}</Modal.Header>
      ) : (
        ""
      )}
      <Modal.Body className={props.isRightSideModal ? "" : ""}>
        {props.child}
      </Modal.Body>

      {props.footerContent ? (
        <Modal.Footer className={props.footerClasses}>
          {props.footerContent}
        </Modal.Footer>
      ) : (
        ""
      )}
    </Modal>
  );
};

export default CustomModal;
