// @format

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Input, {InputLabel} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';
import {FormControl} from 'material-ui/Form';
import Select from 'material-ui/Select';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing.unit * 4,
  },
});

class DelaySelect extends Component {
  state = {
    delay: '',
  };

  handleChange = event => {
    const value = event.target.value;
    this.setState({[event.target.name]: value});
    this.props.handleDelayChange(value);
  };

  render() {
    return (
      <FormControl className={this.props.classes.root}>
        <InputLabel htmlFor="status-type">How long delayed?</InputLabel>
        <Select
          value={this.state.delay}
          onChange={this.handleChange}
          input={<Input name="delay" id="delay-simple" />}>
          <MenuItem value="">None</MenuItem>
          <MenuItem value={'Under an hour'}>Under an hour</MenuItem>
          <MenuItem value={'1-2 hours'}>1-2 hours</MenuItem>
          <MenuItem value={'4-12 hours'}>4-12 hours</MenuItem>
          <MenuItem value={'12-24 hours'}>12-24 hours</MenuItem>
          <MenuItem value={'2 days'}>2 days</MenuItem>
          <MenuItem value={'Several days'}>Several days</MenuItem>
        </Select>
      </FormControl>
    );
  }
}

DelaySelect.propTypes = {
  handleDelayChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(DelaySelect);
