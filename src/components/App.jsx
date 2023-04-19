import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Modal from './modal/Modal';
import Loader from './loader/Loader';
import Button from './button/Button';
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

  useEffect(() => {
    fetchData();
  }, [searchQuery, page]);

  async function fetchData() {
    if (!searchQuery) {
      return;
    }
    setLoading(true);
    try {
      const data = await apiService(searchQuery, page);
      setTotalImages(data.totalHits);
      if (data.totalHits === 0) {
        setImages([]);
        toast.info(
          `Sorry, there are no images with ${searchQuery}. Please try again.`
        );
        return;
      }
      setImages([...images, ...data.hits]);
    } catch (error) {
      setError(error);
      toast.error('Sorry, an error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

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
      toast.info(`We already found images with ${query}.`);
    }
  };

  const handleLoadMore = () => setPage(page + 1);

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSearchbarSubmit} />
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
