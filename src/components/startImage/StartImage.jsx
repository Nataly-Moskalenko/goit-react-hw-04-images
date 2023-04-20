import image from '../../images/start.jpg';
import css from './StartImage.module.css';

export default function StartImage() {
  return (
    <div className={css.start}>
      <p className={css.start__description}>What will we search?</p>
      <img
        src={image}
        alt="Question mark"
        width="420"
        className={css.start__image}
      />
    </div>
  );
}
