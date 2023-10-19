import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ data, getTargetImgID }) => {
  if (data === undefined) return;

  return (
    <ul className="gallery">
      {data.map(element => {
        return (
          <ImageGalleryItem
            webformatURL={element.webformatURL}
            id={element.id}
            largeImage={element.largeImageURL}
            getTargetImgID={getTargetImgID}
          />
        );
      })}
    </ul>
  );
};
