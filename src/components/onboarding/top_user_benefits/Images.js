// @format

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import screen from '../../../img/screen.svg';
import health from '../../../img/health.svg';
import grow from '../../../img/grow.svg';

const styles = {
  screen: {
    display: 'block',
    margin: '0 auto',
  },
};

class Images extends Component {
  getImageName = index => {
    switch (index) {
      case 0:
        return health;
      case 1:
        return screen;
      case 2:
        return grow;
      default:
        return screen;
    }
  };

  render() {
    return (
      <img
        src={this.getImageName(this.props.index)}
        width={200}
        className={this.props.classes.screen}
        alt="crypto-exchange-screen"
      />
    );
  }
}

export default withStyles(styles)(Images);
