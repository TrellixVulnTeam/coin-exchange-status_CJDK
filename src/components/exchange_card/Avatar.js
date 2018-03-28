// @format

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.text.white,
  },
  icon: {
    color: theme.palette.text.secondary,
  },
});

class ExchangeCardAvatar extends Component {
  state = {weatherIcon: null};

  async componentWillReceiveProps(nextProps) {
    const {classes, score} = nextProps;

    if (score === 0) return;

    const name = this.getIconNameFromScore(score);
    const {default: WeatherIcon} = await import(`../../lib/icons/${name}`);
    this.setState({
      weatherIcon: <WeatherIcon className={classes.icon} />,
    });
  }

  getIconNameFromScore = score => {
    if (score <= 0.35) return 'Thunderstorm';
    if (score <= 0.45) return 'Rain';
    if (score <= 0.55) return 'Overcast';
    if (score <= 0.675) return 'Cloudy';
    if (score < 0.8) return 'PartlyCloudy';
    if (score >= 0.8) return 'Sunny';
  };

  render() {
    const {classes} = this.props;
    return (
      <Avatar aria-label="Avatar" className={classes.avatar}>
        {this.state.weatherIcon || <span>Loading...</span>}
      </Avatar>
    );
  }
}

ExchangeCardAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default withStyles(styles)(ExchangeCardAvatar);
