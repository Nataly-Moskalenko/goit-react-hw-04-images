import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Modal from './modal/Modal';
import Loader from './loader/Loader';
import Button from './button/Button';
import apiService from 'services/apiService';
import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

export class App extends Component {
  state = {
    showModal: false,
    images: [],
    searchQuery: '',
    error: null,
    page: 1,
    totalImages: 0,
    showImage: null,
    loading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { images, searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ loading: true });
      try {
        const data = await apiService(searchQuery, page);
        this.setState({ totalImages: data.totalHits });
        if (data.totalHits === 0) {
          this.setState({ images: [] });
          toast.info(
            `Sorry, there are no images with ${searchQuery}. Please try again.`
          );
          return;
        }
        this.setState({ images: [...images, ...data.hits] });
      } catch (error) {
        this.setState({ error });
        toast.error('Sorry, an error occurred. Please try again.');
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  toggleModal = e => {
    const { showModal } = this.state;
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    if (showModal === false) {
      this.setState({ showImage: e.target });
    }
  };

  handleSearchbarSubmit = searchQuery => {
    if (searchQuery !== this.state.searchQuery) {
      this.setState({ searchQuery, page: 1, images: [] });
    } else {
      toast.info(`We already found images with ${searchQuery}.`);
    }
  };

  handleLoadMore = () => {
    this.setState(state => {
      return {
        page: state.page + 1,
      };
    });
  };

  render() {
    const { showModal, images, showImage, loading, totalImages, error } =
      this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearchbarSubmit} />
        {images && <ImageGallery images={images} onClick={this.toggleModal} />}
        {showModal && showImage && (
          <Modal
            onClose={this.toggleModal}
            src={showImage.dataset.source}
            alt={showImage.alt}
          />
        )}
        {totalImages > images.length && images && !loading && !error && (
          <Button handleLoadMore={this.handleLoadMore} />
        )}
        {loading && <Loader />}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
