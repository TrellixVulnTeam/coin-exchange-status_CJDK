// @format

import React, {Component} from 'react';
import ExchangeCards from './ExchangeCards';
import Add from './Add';
import TopUserBenefits from './onboarding/TopUserBenefits';

class Home extends Component {
  isFirstRun = () => {
    return window.localStorage.getItem('isFirstRun') || true;
  };

  render() {
    const isFirstRun = this.isFirstRun();
    console.log('isFirstRun', isFirstRun);
    let {exchanges} = this.props;
    return (
      <div>
        <TopUserBenefits />
        <ExchangeCards exchanges={exchanges} />
        <Add />
      </div>
    );
  }
}

export default Home;
