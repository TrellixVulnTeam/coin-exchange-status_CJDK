// @format

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flex: '0 0 100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    display: 'flex',
    flex: '0 0 10%',
  },
  form: {
    display: 'flex',
    flex: '0 0 90%',
    margin: 0,
  },
  input: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    border: 'none',
    background: 'none',
  },
});

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      fetching: false,
    };
  }

  handleChange = event => {
    this.setState({searchTerm: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmitCallback(this.state.searchTerm);
  };

  handleArrowBackClick = event => {
    this.props.arrowBackClickCallback(event);
  };

  render() {
    const {classes} = this.props;
    const input = React.createElement('input', {
      onChange: this.handleInputChange,
      className: classes.input,
    });
    return (
      <div className={classes.container}>
        <Link to="/">
          <ArrowBackIcon
            className={classes.icon}
            onClick={this.handleArrowBackClick}
          />
        </Link>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}>
          <input
            className={classes.input}
            type="text"
            autoFocus="true"
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  arrowBackClickCallback: PropTypes.func.isRequired,
  onSubmitCallback: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchBar);
