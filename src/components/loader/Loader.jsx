import { ImSpinner } from 'react-icons/im';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loader}>
      <ImSpinner className={css.loader__icon} />
      Loading...
    </div>
  );
}
