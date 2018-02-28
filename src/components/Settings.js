// @format

import React, {Component} from 'react';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';
import Card, {CardContent} from 'material-ui/Card';
import Add from './Add';

const styles = theme => ({
  container: {
    minWidth: '360px',
    height: 'inherit',
    overflow: 'scroll',
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 2}px 0`,
    boxShadow: `inset 1px 0 2px ${theme.palette.text.divider}`,
    [theme.breakpoints.down('sm')]: {
      boxShadow: 'none',
    },
  },
});

class Settings extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.container}>
        <Card>
          <CardContent>
            <Typography>Settings</Typography>
          </CardContent>
        </Card>
        <Add />
      </div>
    );
  }
}

export default withStyles(styles)(Settings);
