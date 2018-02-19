// @format

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
      top: '70px',
    },
  },
  bull: {
    fontSize: '32px',
    color: theme.palette.text.light.disabled,
  },
  bullOn: {
    fontSize: '32px',
    color: theme.palette.text.light.secondary,
  },
  dot: {
    margin: `0 ${theme.spacing.unit / 4}px`,
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

class Dots extends Component {
  getCssClass = elementIndex => {
    if (elementIndex === this.props.index) {
      return this.props.classes.bullOn;
    } else {
      return this.props.classes.bull;
    }
  };

  clickHandler = event => {
    const index = Number(event.target.getAttribute('index'));
    this.props.clickHandler(index);
  };

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.container}>
        <span
          index="0"
          onClick={this.clickHandler}
          className={[this.getCssClass(0), classes.dot].join(' ')}>
          &bull;
        </span>
        <span
          index="1"
          onClick={this.clickHandler}
          className={[this.getCssClass(1), classes.dot].join(' ')}>
          &bull;
        </span>
        <span
          index="2"
          onClick={this.clickHandler}
          className={[this.getCssClass(2), classes.dot].join(' ')}>
          &bull;
        </span>
      </div>
    );
  }
}

Dots.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};

export default withStyles(styles)(Dots);
