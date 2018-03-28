// @format

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';
import ExchangeCard from './ExchangeCard';
import InfiniteScroll from 'react-infinite-scroller';
import {exchangesPerPage} from '../constants';
import NoResults from './NoResults';

const styles = theme => ({
  exchangesContainer: {
    height: '100%',
    overflow: 'auto',
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 2}px`,
  },
  infiniteScrollContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class Exchanges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      hasMore: false,
      exchanges: [],
      currentExchanges: [],
    };
  }

  componentWillReceiveProps = nextProps => {
    this.setState({page: 0});
    this.prepareExchanges(nextProps.exchanges);
  };

  componentWillMount = () => {
    this.prepareExchanges(this.props.exchanges);
  };

  componentWillUnmount = () => {
    if (this.props.willUnmountHandler) {
      this.props.willUnmountHandler();
    }
  };

  favoritesDidUpdateHandler = () => {
    // noop
  };

  prepareExchanges = exchanges => {
    /*
     * This takes the object of objects that's passed as props.exchanges
     * and turns them into an array of objects
     */
    let exchangesArray = [];
    Object.entries(exchanges).forEach(array => {
      let exchange = {};
      exchange[array[0]] = array[1];
      exchangesArray.push(
        <ExchangeCard
          exchange={exchange}
          key={array[0]}
          favoritesDidUpdateHandler={this.favoritesDidUpdateHandler}
        />,
      );
    });

    if (exchangesArray.length === 0) {
      exchangesArray.push(
        <NoResults
          key="no-results"
          noContentMessage={this.props.noContentMessage}
        />,
      );
    }

    /* Then we set them on state and setup the initial value of currentExchanges */
    this.setState({exchanges: exchangesArray}, () => {
      const exchanges = this.state.exchanges;
      const currentExchanges = exchanges.slice(0, exchangesPerPage);
      this.setState({currentExchanges}, () => {
        this.setHasMore();
      });
    });
  };

  loadMore = page => {
    // ignore the page passed from InfiniteScroll
    page = this.state.page;
    const numberOfExchangesForThePage = this.numberOfExchangesFor(page);
    const exchanges = this.state.exchanges;
    const currentExchanges = exchanges.slice(0, numberOfExchangesForThePage);
    this.setState({currentExchanges}, () => {
      this.setHasMore();
    });
    this.setState({page: this.state.page + 1});
  };

  setHasMore = () => {
    this.state.currentExchanges.length < this.state.exchanges.length
      ? this.setState({hasMore: true})
      : this.setState({hasMore: false});
  };

  numberOfExchangesFor = page => {
    switch (page) {
      case 0:
        return exchangesPerPage;
      default:
        return exchangesPerPage * page + exchangesPerPage;
    }
  };

  render() {
    let currentExchanges = this.state.currentExchanges;
    const {classes} = this.props;
    return (
      <div className={classes.exchangesContainer}>
        <InfiniteScroll
          className={classes.infiniteScrollContainer}
          pageStart={this.state.page}
          hasMore={this.state.hasMore}
          initialLoad={false}
          loadMore={this.loadMore}
          loader={null}
          useWindow={false}>
          {currentExchanges}
        </InfiniteScroll>
      </div>
    );
  }
}

Exchanges.propTypes = {
  willUnmountHandler: PropTypes.func,
  noContentMessage: PropTypes.string.isRequired,
  favoritesDidUpdateHandler: PropTypes.func,
};

export default withStyles(styles)(Exchanges);
