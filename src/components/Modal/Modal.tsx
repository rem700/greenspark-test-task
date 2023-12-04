import React, { FC, CSSProperties, useEffect, useState, Fragment } from 'react';
import './styles/Modal.css';

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  triggerElement?: HTMLElement | null;
}

export const Modal: FC<IModal> = ({ isOpen, onClose, children, triggerElement }) => {
  const [modalStyle, setModalStyle] = useState<CSSProperties>({});

  useEffect(() => {
    const calculatePosition = () => {
      if (isOpen && triggerElement) {
        const rect = triggerElement.getBoundingClientRect();
        const screenWidth = window.innerWidth;
  
        const leftValue = screenWidth <= 425 ? 65 : rect.left;
  
        setModalStyle({opacity: 1, top: rect.top, left: leftValue });
      }
    };
  
    calculatePosition();
  
    window.addEventListener('resize', calculatePosition);
  
    return () => {
      window.removeEventListener('resize', calculatePosition);
    };
  }, [isOpen, triggerElement]);

  return (
    <Fragment>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" style={modalStyle} onClick={(e) => e.stopPropagation()} onMouseLeave={onClose}>
            {children}
          </div>
        </div>
      )}
    </Fragment>
  );
};
