// @format

import React, {Component} from 'react';
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
    color: 'rgba(0, 0, 0, 0.5)',
  },
  bullOn: {
    fontSize: '32px',
    color: 'rgb(0, 0, 0)',
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
    this.props.clickCallback(index);
  };

  render() {
    return (
      <div className={this.props.classes.container}>
        <span
          index="0"
          onClick={this.clickHandler}
          className={this.getCssClass(0)}>
          &bull;
        </span>
        <span
          index="1"
          onClick={this.clickHandler}
          className={this.getCssClass(1)}>
          &bull;
        </span>
        <span
          index="2"
          onClick={this.clickHandler}
          className={this.getCssClass(2)}>
          &bull;
        </span>
      </div>
    );
  }
}

export default withStyles(styles)(Dots);
