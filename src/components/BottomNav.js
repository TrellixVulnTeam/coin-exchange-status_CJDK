// @format

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import BottomNavigation, {
  BottomNavigationAction,
} from 'material-ui/BottomNavigation';
import HomeIcon from 'material-ui-icons/Home';
import FavoriteIcon from 'material-ui-icons/Favorite';
import TrendingUpIcon from 'material-ui-icons/TrendingUp';

const styles = {
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    background: 'rgba(244, 244, 244, 0.925)',
    borderTop: '1px solid rgba(0, 0, 0, 0.025)',
  },
  selected: {
    color: 'rgba(0, 0, 0, 0.925)',
  },
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({value});
  };

  render() {
    const {classes} = this.props;
    const {value} = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}>
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          classes={{selected: classes.selected}}
        />
        <BottomNavigationAction
          label="Trending"
          icon={<TrendingUpIcon />}
          classes={{selected: classes.selected}}
        />
        <BottomNavigationAction
          label="Favorites"
          icon={<FavoriteIcon />}
          classes={{selected: classes.selected}}
        />
      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBottomNavigation);
