// @format

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Input, {InputLabel} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';
import {FormControl} from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing.unit * 4,
  },
});

class TypeSelect extends Component {
  state = {
    type: '',
  };

  handleChange = event => {
    const value = event.target.value;
    this.setState({
      type: value,
    });
    this.props.handleFeedbackTypeChange(value);
  };

  render() {
    return (
      <FormControl className={this.props.classes.root}>
        <InputLabel htmlFor="status-type">Regarding?</InputLabel>
        <Select
          value={this.state.type}
          onChange={this.handleChange}
          input={<Input name="type" id="type-simple" />}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'fees'}>Fees</MenuItem>
          <MenuItem value={'deposits'}>Deposits</MenuItem>
          <MenuItem value={'withdrawals'}>Withdrawals</MenuItem>
          <MenuItem value={'trades'}>Trades</MenuItem>
          <MenuItem value={'support'}>Support</MenuItem>
          <MenuItem value={'other'}>Other</MenuItem>
        </Select>
      </FormControl>
    );
  }
}

TypeSelect.propTypes = {
  handleFeedbackTypeChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(TypeSelect);
