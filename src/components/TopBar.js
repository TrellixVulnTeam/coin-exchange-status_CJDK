// @format

import React from 'react';
import AppBar from 'material-ui/AppBar';
import Search from 'material-ui-icons/Search';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(244, 244, 244, 0.925)',
    height: 64,
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
  title: {
    display: 'flex',
    flexBasis: '80%',
    justifyContent: 'flex-start',
  },
  iconContainer: {
    display: 'flex',
    flexBasis: '20%',
    justifyContent: 'flex-end',
  },
});

class TopBar extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <AppBar
        className={classes.root}
        color="default"
        elevation={1}
        position="fixed">
        <Typography className={classes.title} type="title">
          Coin Exchange Status
        </Typography>
        <div className={classes.iconContainer}>
          <Search className={classes.icon} />
        </div>
      </AppBar>
    );
  }
}

export default withStyles(styles)(TopBar);
