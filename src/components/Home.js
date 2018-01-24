// @format

import React, {Component} from 'react';
import '../App.css';
import fire from '../fire';
import ExchangePapers from './ExchangePapers';
import Add from './Add';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exchanges: {},
    };
  }

  componentDidMount() {
    // all the exchanges
    let exchangesRef = fire.database().ref('exchanges');
    exchangesRef.on('value', snapshot => {
      this.setState({exchanges: snapshot.val()});
    });
  }

  render() {
    let {exchanges} = this.state;
    return (
      <div>
        <div>
          <ExchangePapers exchanges={exchanges} />
        </div>
        <Add />
      </div>
    );
  }
}

export default Home;
