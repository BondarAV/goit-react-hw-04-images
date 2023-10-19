import { Component } from 'react';

import { getImageList } from 'api';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { Modal } from './Modal';

import { perPage } from 'api';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    loading: false,
    targetImg: '',
    isModalOpen: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImages(query, page);
    }
  }

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleQuery = query => {
    this.setState(prevState => {
      if (prevState.query !== query) {
        return { images: [], query: query, page: 1 };
      }
    });
  };

  sortData = (data, page) => {
    this.setState(prevState => ({
      images: [
        ...prevState.images,
        ...data.map(element => {
          return {
            id: element.id,
            largeImageURL: element.largeImageURL,
            webformatURL: element.webformatURL,
          };
        }),
      ],
    }));
  };

  fetchImages = (query, page) => {
    this.setState({ loading: true });

    getImageList(query, page)
      .then(response => {
        if (response.data.hits.length === 0) {
          alert(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          this.sortData(response.data.hits, page);
        }
      })
      .catch(error => {
        alert(`Action failed with error: ${error}`);
      });

    this.setState({ loading: false });
  };

  getTargetImgID = largeImage => {
    this.setState({
      targetImg: largeImage,
      isModalOpen: true,
    });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <div className="App">
        <Searchbar handleQuery={this.handleQuery} />

        {this.state.loading && <Loader />}

        <ImageGallery
          data={this.state.images}
          getTargetImgID={this.getTargetImgID}
        />

        {this.state.images.length >= perPage &&
          !this.state.loading &&
          this.state.images.length >= this.state.page * perPage && (
            <Button loadMore={this.loadMore} />
          )}

        {this.state.isModalOpen && (
          <Modal
            targetImg={this.state.targetImg}
            closeModal={this.closeModal}
          />
        )}
      </div>
    );
  }
}
