import { ImSearch } from 'react-icons/im';
import { Component } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSearchQuery = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { searchQuery } = this.state;
    if (searchQuery.trim() === '') {
      toast.info('Please enter your search query.');
      return;
    }
    this.props.onSubmit(searchQuery);
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.search__button}>
            <ImSearch className={css.search__icon} />
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={this.handleSearchQuery}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
