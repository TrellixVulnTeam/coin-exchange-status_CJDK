// @format

import React, {Component} from 'react';
import ExchangeCard from './ExchangeCard';
import InfiniteScroll from 'react-infinite-scroller';
import {exchangesPerPage} from '../constants';

class Exchanges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,
      exchanges: [],
      currentExchanges: [],
      searchResultExchanges: [],
    };
  }

  handleSearch = searchTerm => {
    let searchResultExchanges = [];
    if (searchTerm && searchTerm.length && searchTerm.length > 1) {
      Object.entries(this.state.exchanges).map(exchange => {
        if (exchange[1].key.match(searchTerm)) {
          searchResultExchanges.push(exchange[1]);
        }
        if (searchResultExchanges.length === 0) {
          // push an empty 'no results match <search-term>,' card here
        }
        return searchResultExchanges;
      });
    } else {
      console.log('no search');
    }
    return searchResultExchanges;
  };

  componentDidMount = () => {
    /*
     * This takes the object of objects that's passed as props.exchanges
     * and turns them into an array of objects
     */
    let exchanges = [];
    Object.entries(this.props.exchanges).forEach(array => {
      let exchange = {};
      exchange[array[0]] = array[1];
      exchanges.push(<ExchangeCard exchange={exchange} key={array[0]} />);
    });

    /* Then we set them on state and setup the initial value of currentExchanges */
    this.setState({exchanges}, () => {
      const exchanges = this.state.exchanges;
      const currentExchanges = exchanges.slice(0, exchangesPerPage);
      this.setState({currentExchanges});
    });
  };

  loadMore = page => {
    const numberOfExchangesForThePage = this.numberOfExchangesFor(page);
    const exchanges = this.state.exchanges;
    const currentExchanges = exchanges.slice(0, numberOfExchangesForThePage);
    this.setState({currentExchanges}, () => {
      this.state.currentExchanges.length <= this.state.exchanges.length
        ? this.setState({hasMore: false})
        : this.setState({hasMore: true});
    });
  };

  numberOfExchangesFor = page => {
    const numberOfExchangesPerPage = 10;
    switch (page) {
      case 0:
        return numberOfExchangesPerPage;
      default:
        return numberOfExchangesPerPage * page + 10;
    }
  };

  render() {
    let searchResultExchanges = this.handleSearch(
      this.props.searchTerm || null,
    );
    let currentExchanges = searchResultExchanges.length
      ? searchResultExchanges
      : this.state.currentExchanges;
    return currentExchanges
      ? <div style={{height: '100%', overflow: 'auto', padding: '32px 16px'}}>
          <InfiniteScroll
            page={0}
            hasMore={this.state.hasMore}
            initialLoad={false}
            loadMore={this.loadMore}
            loader={
              <div className="loader" key={Math.random}>
                loading...
              </div>
            }
            useWindow={false}>
            {currentExchanges}
          </InfiniteScroll>
        </div>
      : null;
  }
}

export default Exchanges;
