// @format

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import ExchangeCard from './ExchangeCard';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});

class Results extends Component {
  componentWillUnmount() {
    this.props.willUnmountCallback();
  }

  render() {
    const {classes, exchanges, searchTerm} = this.props;
    let exchangeCards = [];
    for (const exchange in exchanges) {
      let exchangeWithKey = exchanges[exchange];
      exchangeWithKey['key'] = exchange;
      exchangeCards.push(
        <ExchangeCard exchange={exchangeWithKey} key={Math.random()} />,
      );
    }
    const messageElement = searchTerm
      ? <p>
          display results for {searchTerm} here...
        </p>
      : <p>"no search term yet"</p>;
    return (
      <div className={classes.container}>
        {messageElement}
        {exchangeCards}
      </div>
    );
  }
}

Results.propTypes = {
  willUnmountCallback: PropTypes.func.isRequired,
};

export default withStyles(styles)(Results);
