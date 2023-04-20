import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import StartImage from './StartImage/StartImage';
import ErrorImage from './ErrorImage/ErrorImage';
import apiService from 'services/apiService';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

export function App() {
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [showImage, setShowImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startImage, setStartImage] = useState(true);
  const [errorImage, setErrorImage] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!searchQuery) {
        setStartImage(true);
        return;
      }
      setLoading(true);
      setStartImage(false);
      setErrorImage(false);
      try {
        const data = await apiService(searchQuery, page);
        setTotalImages(data.totalHits);
        if (data.totalHits === 0) {
          setImages([]);
          setErrorImage(true);
          toast.info(
            `Sorry, there are no images with ${searchQuery}. Please try again.`
          );
          return;
        }
        setImages(images => [...images, ...data.hits]);
      } catch (error) {
        setError(error);
        toast.error('Sorry, an error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [searchQuery, page]);

  const toggleModal = e => {
    setShowModal(!showModal);
    if (showModal === false) {
      setShowImage(e.target);
    }
  };

  const handleSearchbarSubmit = query => {
    if (searchQuery !== query) {
      setSearchQuery(query);
      setPage(1);
      setImages([]);
    } else {
      if (searchQuery === query && images.length > 0) {
        toast.info(`We already found images with ${query}.`);
      }
    }
  };

  const handleLoadMore = () => setPage(page + 1);

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSearchbarSubmit} />
      {startImage && <StartImage />}
      {(error || errorImage) && <ErrorImage />}
      {images && <ImageGallery images={images} onClick={toggleModal} />}
      {showModal && showImage && (
        <Modal
          onClose={toggleModal}
          src={showImage.dataset.source}
          alt={showImage.alt}
        />
      )}
      {totalImages > images.length && images && !loading && !error && (
        <Button handleLoadMore={handleLoadMore} />
      )}
      {loading && <Loader />}
      <ToastContainer autoClose={3000} />
    </div>
  );
}
