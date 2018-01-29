// @format

import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
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
    background: 'rgba(244, 244, 244, 0.925)',
    height: 64,
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
  appBarContainer: {
    display: 'flex',
    flex: '0 0 100%',
  },
  title: {
    display: 'flex',
    flex: '0 0 90%',
  },
  searchIcon: {
    display: 'flex',
    flex: '0 0 10%',
    justifyContent: 'flex-end',
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
      <AppBar
        className={classes.root}
        color="default"
        elevation={1}
        position="fixed">
        {elements}
      </AppBar>
    );
  }
}

TopBar.propTypes = {
  onSearchSubmitCallback: PropTypes.func.isRequired,
};

export default withStyles(styles)(TopBar);
