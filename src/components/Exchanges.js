// @format

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import ExchangeCard from './ExchangeCard';
import VirtualList from 'react-tiny-virtual-list';
import Add from './Add';

const styles = theme => ({
  virtualList: {
    minWidth: '360px',
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 2}px 0`,
    boxShadow: `inset 1px 0 2px ${theme.palette.text.divider}`,
    [theme.breakpoints.down('sm')]: {
      boxShadow: 'none',
    },
  },
});

class Exchanges extends Component {
  render() {
    const {classes} = this.props;
    const exchanges = this.props.exchanges;
    let exchangeCards = [];
    Object.entries(exchanges).forEach(array => {
      let exchange = {};
      exchange[array[0]] = array[1];
      exchangeCards.push(<ExchangeCard exchange={exchange} key={array[0]} />);
    });
    return (
      <VirtualList
        className={classes.virtualList + ' exchangesVirtualList'}
        width="100%"
        height={600}
        itemCount={exchangeCards.length}
        itemSize={150} // Also supports variable heights (array or function getter)
        renderItem={({index, style}) =>
          <div key={index} style={style}>
            {exchangeCards[index]}
          </div>}
      />
    );
  }
}

export default withStyles(styles)(Exchanges);
