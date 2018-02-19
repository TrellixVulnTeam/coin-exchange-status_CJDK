// @format

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  title: {
    color: theme.palette.text.light.primary,
  },
  subheading: {
    color: theme.palette.text.light.secondary,
  },
});

class Slide extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div>
        <Typography
          align="center"
          component="h1"
          gutterBottom={true}
          variant="title"
          className={classes.title}>
          {this.props.title}
        </Typography>
        <Typography
          align="center"
          component="p"
          variant="subheading"
          className={classes.subheading}>
          {this.props.subheading}
        </Typography>
      </div>
    );
  }
}

Slide.propTypes = {
  title: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired,
};

export default withStyles(styles)(Slide);
