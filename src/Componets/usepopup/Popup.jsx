import { useState } from 'react';

const usePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupType, setPopupType] = useState(null);

  const openPopup = (type) => {
    setPopupType(type);
    setIsOpen(true);
  };

  const closePopup = () => {
    setPopupType(null);
    setIsOpen(false);
  };

  return { isOpen, popupType, openPopup, closePopup };
};

export default usePopup;