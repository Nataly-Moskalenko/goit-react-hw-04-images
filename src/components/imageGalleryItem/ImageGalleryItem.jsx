import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  onClick,
}) {
  return (
    <li className={css.galleryItem}>
      <img
        className={css.galleryItem__image}
        src={webformatURL}
        data-source={largeImageURL}
        alt={tags}
        onClick={onClick}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
