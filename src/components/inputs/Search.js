// @format

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SearchIcon from 'material-ui-icons/Search';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
    transition: 'width 0.2s ease-out',
    height: '35px',
    padding: '4px 8px 4px 18px',
    borderRadius: `${theme.spacing.unit / 4}px`,
    background: theme.palette.text.light.divider,
    color: theme.palette.primary.contrastText,
  },
  containerFocused: {
    width: 'auto',
    transition: 'width 0.2s ease-out',
  },
  containerHovered: {
    background: 'rgba(255, 255, 255, 0.18)',
  },
  searchIcon: {
    width: '24px',
  },
  textInput: {
    width: '160px',
    transition: 'width 200ms ease-out',
    paddingLeft: '18px',
    background: 'none',
    border: 'none',
    color: theme.palette.text.white,
    '&:focus': {
      width: '200px',
      transition: 'width 200ms ease-out',
      outline: 'none',
      boxShadow: 'none',
    },
    fontWeight: 400,
    fontSize: '16px',
  },
});

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      hovered: false,
    };
  }

  onFocus = () => {
    this.setState({focused: true});
  };

  onBlur = () => {
    this.setState({focused: false});
  };

  onMouseOver = () => {
    this.setState({hovered: true});
  };

  onMouseOut = () => {
    this.setState({hovered: false});
  };

  onChange = event => {
    const value = event.target.value;
    this.props.onChangeHandler(value);
  };

  render() {
    const {classes} = this.props;
    return (
      <div
        className={
          classes.container +
          (this.state.focused ? ' ' + classes.containerFocused : '') +
          (this.state.hovered ? ' ' + classes.containerHovered : '')
        }
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}>
        <SearchIcon className={classes.searchIcon} />
        <input
          type="text"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          className={classes.textInput}
        />
      </div>
    );
  }
}

SearchInput.propTypes = {
  onChangeHandler: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchInput);