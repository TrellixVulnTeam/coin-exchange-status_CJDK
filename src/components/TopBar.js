// @format

import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Home from 'material-ui-icons/Home';
import Search from 'material-ui-icons/Search';
import SearchBar from './SearchBar';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    padding: `0 ${theme.spacing.unit * 2}px`,
    background: theme.palette.primary.main,
  },
  appBarContainer: {
    display: 'flex',
    flex: '0 0 100%',
  },
  title: {
    display: 'flex',
    flex: '0 0 80%',
    justifyContent: 'center',
    color: theme.palette.text.light.secondary,
  },
  searchIcon: {
    display: 'flex',
    flex: '0 0 10%',
    justifyContent: 'flex-end',
    color: theme.palette.text.light.secondary,
  },
  homeIconLink: {
    display: 'flex',
    flex: '0 0 10%',
    justifyContent: 'flex-start',
    color: theme.palette.text.light.secondary,
  },
});

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
    };
  }

  handleSearchIconClick = event => {
    this.setState({searching: !this.state.searching});
  };

  arrowBackClickCallback = event => {
    this.setState({searching: !this.state.searching});
  };

  onSearchSubmitCallback = searchTerm => {
    this.props.onSearchSubmitCallback(searchTerm);
  };

  render() {
    const {classes} = this.props;
    let elements = !this.state.searching
      ? <div className={classes.appBarContainer}>
          <Link to="/" className={classes.homeIconLink}>
            <Home />
          </Link>
          <Typography className={classes.title} type="title">
            Coin Exchange Status
          </Typography>
          <Link to="/search" className={classes.searchIcon}>
            <Search onClick={this.handleSearchIconClick} />
          </Link>
        </div>
      : <SearchBar
          arrowBackClickCallback={this.arrowBackClickCallback}
          onSubmitCallback={this.onSearchSubmitCallback}
        />;

    return (
      <AppBar className={classes.root} elevation={1} position="fixed">
        {elements}
      </AppBar>
    );
  }
}

TopBar.propTypes = {
  onSearchSubmitCallback: PropTypes.func.isRequired,
};

export default withStyles(styles)(TopBar);
