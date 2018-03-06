// @format

import React, {Component} from 'react';
import ExchangeCard from './ExchangeCard';

class Exchanges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
    };
  }

  render() {
    const exchanges = this.props.exchanges;
    let exchangeCards = [];
    Object.entries(exchanges).forEach(array => {
      let exchange = {};
      exchange[array[0]] = array[1];
      exchangeCards.push(<ExchangeCard exchange={exchange} key={array[0]} />);
    });
    return (
      <div>
        {exchangeCards}
      </div>
    );
  }
}

export default Exchanges;
