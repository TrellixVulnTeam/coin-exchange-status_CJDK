// @format

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing.unit * 4,
  },
});

class MarketTextField extends Component {
  state = {
    market: '',
  };

  handleChange = market => event => {
    const value = event.target.value;
    this.setState({
      market: value,
    });
    this.props.handleMarketChange(value);
  };

  render() {
    return (
      <TextField
        className={this.props.classes.root}
        id="market"
        label="Market"
        placeholder="STAK/BTC"
        value={this.state.market}
        onChange={this.handleChange('market')}
      />
    );
  }
}

MarketTextField.propTypes = {
  handleMarketChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(MarketTextField);
