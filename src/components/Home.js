// @format

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import ExchangeCards from './ExchangeCards';
import Add from './Add';

const styles = theme => ({
  container: {
    minWidth: '360px',
    height: 'inherit',
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 2}px 0`,
    boxShadow: `inset 1px 0 2px ${theme.palette.text.divider}`,
    [theme.breakpoints.down('sm')]: {
      boxShadow: 'none',
    },
  },
});

class Home extends Component {
  render() {
    let {exchanges, classes} = this.props;
    return (
      <div className={classes.container}>
        <ExchangeCards exchanges={exchanges} />
        <Add />
      </div>
    );
  }
}

export default withStyles(styles)(Home);
