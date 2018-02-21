// @format

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import ExchangeCards from './ExchangeCards';
import Add from './Add';

const styles = theme => ({
  homeContent: {
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 2}px 0`,
    boxShadow: `inset 1px -6px 2px ${theme.palette.text.divider}`,
  },
});

class Home extends Component {
  render() {
    let {exchanges, classes} = this.props;
    return (
      <div className={classes.homeContent}>
        <ExchangeCards exchanges={exchanges} />
        <Add />
      </div>
    );
  }
}

export default withStyles(styles)(Home);
