// @format

import React, {Component} from 'react';
import ExchangeCards from './ExchangeCards';
import Add from './Add';

class Home extends Component {
  render() {
    let {exchanges} = this.props;
    return (
      <div>
        <ExchangeCards exchanges={exchanges} />
        <Add />
      </div>
    );
  }
}

export default Home;
