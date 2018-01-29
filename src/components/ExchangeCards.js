// @format

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import ExchangeCard from './ExchangeCard';
import NotificationPaper from './NotificationPaper';

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
    for (const exchange in exchanges) {
      let exchangeWithKey = exchanges[exchange];
      exchangeWithKey['key'] = exchange;
      exchangeCards.push(
        <ExchangeCard exchange={exchangeWithKey} key={Math.random()} />,
      );
    }
    return (
      <div className={classes.container}>
        <NotificationPaper />
        {exchangeCards}
      </div>
    );
  }
}

export default withStyles(styles)(ExchangeCards);