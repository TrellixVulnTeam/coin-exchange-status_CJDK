// @format

import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  root: {
    flexBasis: '100%',
    flexShrink: 0,
    height: 'auto',
    margin: `${theme.spacing.unit * 3}px 0`,
    padding: theme.spacing.unit * 2,
    display: 'inline-block',
    borderRadius: 5,
    background: 'linear-gradient(180deg, #f76b1c 0%, #CF2347 100%)',
  },
  typography: {
    color: 'rgba(255, 255, 255, 0.85)',
  },
});

class NotificationPaper extends Component {
  render() {
    const {classes} = this.props;
    return (
      <Paper className={classes.root}>
        <Typography
          className={classes.typography}
          component="h3"
          gutterBottom={true}
          type="title">
          What is this?
        </Typography>
        <Typography className={classes.typography} component="p" type="body1">
          This site gathers and presents crowd-sourced feedback on crypto/coin
          exchanges from people that are using them.
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(NotificationPaper);
