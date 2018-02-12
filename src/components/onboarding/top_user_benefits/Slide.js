// @format

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

class Slide extends Component {
  render() {
    return (
      <div>
        <Typography
          align="center"
          component="h1"
          gutterBottom={true}
          variant="title">
          {this.props.title}
        </Typography>
        <Typography
          align="center"
          component="p"
          paragraph={true}
          variant="subheading">
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

export default Slide;
