// @format

import React from 'react';
import PropTypes from 'prop-types';
import Hidden from 'material-ui/Hidden';
import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui-icons/Menu';
import SearchBar from './SearchBar';
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
          <SearchInput />
        </div>
      : <SearchBar
          arrowBackClickCallback={this.arrowBackClickCallback}
          onSubmitCallback={this.onSearchSubmitCallback}
        />;

    return (
      <AppBar className={classes.root} elevation={1} position="sticky">
        {elements}
      </AppBar>
    );
  }
}

TopBar.propTypes = {
  onSearchSubmitCallback: PropTypes.func.isRequired,
};

export default withStyles(styles)(TopBar);
