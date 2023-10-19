export const ImageGalleryItem = ({
  webformatURL,
  id,
  largeImage,
  getTargetImgID,
}) => {
  return (
    <li
      className="gallery-item"
      key={id}
      onClick={() => getTargetImgID(largeImage)}
    >
      <img src={webformatURL} alt="" id={largeImage} />
    </li>
  );
};
