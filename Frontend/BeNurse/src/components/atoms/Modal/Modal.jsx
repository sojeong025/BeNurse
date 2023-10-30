import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ModalWrapper, ModalOverlay, ModalInner } from "./Modal.styles";
import { IoCloseSharp } from "react-icons/io5";
import { Common } from "../../../utils/global.styles";

function Modal({
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  children,
}) {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const close = (e) => {
    if (onClose) {
      onClose(e);
    }
  };

  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: "";`;
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, []);

  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex={-1}
        visible={visible}
      >
        <ModalInner
          tabIndex={0}
          className="modal-inner"
        >
          <div style={{ display: "flex", justifyContent: "end" }}>
            {closable && (
              <IoCloseSharp
                className="modal-close"
                onClick={close}
                style={{ fontSize: "26px", color: Common.color.black01 }}
              />
            )}
          </div>
          {children}
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

Modal.defaultProps = {
  visible: false,
  closable: true,
  maskClosable: true,
};

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  closable: PropTypes.bool.isRequired,
  maskClosable: PropTypes.bool.isRequired,
};

export default Modal;
