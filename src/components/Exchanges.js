// @format

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {exchangesVlistCssClass} from '../constants';
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
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
    };
  }

  componentDidMount = () => {
    /* dynamically calc virtual list's height by subtracting height of the
     * top bar / header from the app container
     */
    const list = document.getElementsByClassName(exchangesVlistCssClass)[0];
    const container = list.parentElement;
    const containerHeight = container.clientHeight;
    const header = document.getElementsByTagName('header')[0];
    const headerHeight = header.clientHeight;
    this.setState({height: containerHeight - headerHeight});
  };

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
        className={classes.virtualList + ' ' + exchangesVlistCssClass}
        width="100%"
        height={this.state.height}
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
