// @format

import React from 'react';
import PropTypes from 'prop-types';
import Hidden from 'material-ui/Hidden';
import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import SearchInput from './inputs/Search';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    height: 64,
    padding: `0 ${theme.spacing.unit * 2}px`,
    background: theme.palette.primary.main,
  },
  appBarContainer: {
    display: 'flex',
    flex: '0 0 100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    display: 'flex',
    flex: '1 1 80%',
    justifyContent: 'center',
    color: theme.palette.primary.contrastText,
  },
  menuIconButton: {
    display: 'flex',
    flex: '1 1 10%',
    justifyContent: 'flex-start',
    color: theme.palette.primary.contrastText,
  },
});

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
    };
  }

  componentWillUnMount = () => {
    this.props.searchInputHandler('');
  };

  searchInputOnChangeHandler = value => {
    this.props.searchInputHandler(value);
  };

  render() {
    const {classes} = this.props;
    const searchInput =
      window.location.pathname === '/'
        ? <SearchInput onChangeHandler={this.searchInputOnChangeHandler} />
        : null;
    return (
      <AppBar className={classes.root} elevation={1} position="sticky">
        <div className={classes.appBarContainer}>
          <Hidden mdUp>
            <IconButton
              className={classes.menuIconButton}
              aria-label="open drawer"
              onClick={this.props.menuIconOnTouchEndHandler}>
              <Menu />
            </IconButton>
            <Hidden xsDown>
              <Typography
                className={classes.title}
                type="title"
                variant="title">
                Coin Exchange Status
              </Typography>
            </Hidden>
          </Hidden>
          {searchInput}
        </div>
      </AppBar>
    );
  }
}

TopBar.propTypes = {
  searchInputHandler: PropTypes.func.isRequired,
};

export default withStyles(styles)(TopBar);
