import { useEffect } from 'react';

export const Modal = ({ targetImg, closeModal }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  // useEffect(() => {
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   }
  // }, []);

  // const handleKeyDown = event => {
  //   if (event.code === 'Escape') {
  //     closeModal();
  //   }
  // };

  const hadleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="overlay" onClick={hadleOverlayClick}>
      <div className="modal">
        <img src={targetImg} alt="" />
      </div>
    </div>
  );
};
