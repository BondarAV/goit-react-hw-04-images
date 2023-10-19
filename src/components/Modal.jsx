import { useEffect } from 'react';

export const Modal = ({targetImg, closeModal}) => {

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };

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
}
