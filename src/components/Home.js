// @format

import React, {Component} from 'react';
import ExchangeCards from './ExchangeCards';

class Home extends Component {
  render() {
    let {exchanges} = this.props;
    return <ExchangeCards exchanges={exchanges} />;
  }
}

export default Home;
