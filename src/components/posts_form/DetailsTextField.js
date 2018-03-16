// @format

import React, {Component} from 'react';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing.unit * 4,
  },
});

class DetailsTextField extends Component {
  state = {
    details: '',
  };

  handleChange = details => event => {
    const value = event.target.value;
    this.setState({
      details: value,
    });
    this.props.handleDetailsChange(value);
  };

  handleBlur = () => {
    ReactGA.event({
      category: 'New Post',
      action: 'Details TextField onBlur',
      label: this.state.details,
    });
  };

  render() {
    return (
      <TextField
        className={this.props.classes.root}
        id="details"
        label="Details"
        multiline={true}
        row={2}
        rowsMax={4}
        value={this.state.details}
        onChange={this.handleChange('details')}
        onBlur={this.handleBlur}
      />
    );
  }
}

DetailsTextField.propTypes = {
  handleDetailsChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(DetailsTextField);
