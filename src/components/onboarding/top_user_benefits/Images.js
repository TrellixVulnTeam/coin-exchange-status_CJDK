// @format

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import exchange from '../../../img/exchange.svg';
import uptodate from '../../../img/uptodate.svg';
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
        return uptodate;
      case 1:
        return exchange;
      case 2:
        return grow;
      default:
        return exchange;
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
