// @format

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = {
  green: {
    color: 'green',
  },
  yellow: {
    color: 'yellow',
  },
  red: {
    color: 'red',
  },
};

class StatusIcon extends Component {
  render() {
    return (
      <Typography type="display2" component="span" className={this.props.classes[this.props.status]}>
        •
      </Typography>
      );
  }
}

export default withStyles(styles)(StatusIcon);
