// @format

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import ExchangeCard from './ExchangeCard';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});

class ExchangeCards extends Component {
  render() {
    const {classes} = this.props;
    const exchanges = this.props.exchanges;
    let exchangeCards = [];
    Object.entries(exchanges).forEach(array => {
      let exchange = {};
      exchange[array[0]] = array[1];
      exchangeCards.push(
        <ExchangeCard exchange={exchange} key={Math.random()} />,
      );
    });
    return (
      <div className={classes.container}>
        {exchangeCards}
      </div>
    );
  }
}

export default withStyles(styles)(ExchangeCards);
