import image from '../images/error.jpg';
import css from './ErrorImage.module.css';

export default function ErrorImage() {
  return (
    <div className={css.error}>
      <p className={css.error__description}>
        Oops, there are no images. Please try again.
      </p>
      <img src={image} alt="Error" width="420" className={css.error__image} />
    </div>
  );
}
