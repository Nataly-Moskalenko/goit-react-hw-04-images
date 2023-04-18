import css from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ handleLoadMore }) {
  return (
    <button
      type="button"
      className={css.buttonLoadmore}
      onClick={handleLoadMore}
    >
      Load more
    </button>
  );
}

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};
