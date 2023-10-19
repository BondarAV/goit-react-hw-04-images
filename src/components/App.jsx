import { useState, useEffect } from 'react';

import { getImageList } from 'api';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { Modal } from './Modal';

import { perPage } from 'api';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [targetImg, setTargetImg] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (query.trim() === '') return;

    fetchImages(query, page);
  }, [query, page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleQuery = newQuery => {
    if (query === newQuery) return;

    setImages([]);
    setQuery(newQuery);
    setPage(1);
  };

  const sortData = data => {
    setImages(
      prev => [
        ...prev,
        ...data.map(element => {
          return {
            id: element.id,
            largeImageURL: element.largeImageURL,
            webformatURL: element.webformatURL,
          };
        }),
      ],
    );
  };

  const fetchImages = (query, page) => {

    setLoading(true);

    getImageList(query, page)
      .then(response => {
        if (response.data.hits.length === 0) {
          alert(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          sortData(response.data.hits, page);
        }
      })
      .catch(error => {
        alert(`Action failed with error: ${error}`);
      });

    setLoading(false);
  };

  const getTargetImgID = largeImage => {
    setTargetImg(largeImage);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="App">
      <Searchbar handleQuery={handleQuery} />

      {loading && <Loader />}

      <ImageGallery
        data={images}
        getTargetImgID={getTargetImgID}
      />

      {images.length >= perPage &&
        !loading &&
        images.length >= page * perPage && (
          <Button loadMore={loadMore} />
        )}

      {isModalOpen && (
        <Modal
          targetImg={targetImg}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}
