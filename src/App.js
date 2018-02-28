// @format

import React, {Component} from 'react';
import {isFirstRun} from './constants';
import {Route} from 'react-router-dom';
import {withStyles} from 'material-ui/styles';
import './App.css';
import TopBar from './components/TopBar';
import Home from './components/Home';
import PostsForm from './components/PostsForm';
import {CircularProgress} from 'material-ui/Progress';
import fire from './fire';
import GlobalSnackage from './GlobalSnackage';
import AppSnackbar from './components/AppSnackbar';
import TopUserBenefits from './components/onboarding/TopUserBenefits';
import AppDrawer from './components/AppDrawer';
import TemporaryDrawer from './components/drawers/Temporary';
import Settings from './components/Settings';

const drawerWidth = 240;

const styles = theme => ({
  content: {
    height: '100vh',
    overflow: 'scroll',
    width: `calc(100% - ${drawerWidth}px)`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  progress: {
    position: 'static',
    top: '50%',
    left: '50%',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    this.state = {
      isLoading: true,
      exchanges: {},
      searchResults: {},
      searchTerm: '',
      mobileDrawerOpen: false,
    };
  }

  componentDidMount() {
    /*
     * Check to see if there's exchanges stored locally.
     *
     * i) If there are, use them.
     *
     * ii) If not, load them - all of them
     *
     */
    let exchangesRef = fire.database().ref('exchanges');
    exchangesRef.limitToFirst(10).on('value', snapshot => {
      this.setState({exchanges: snapshot.val()});
      this.setState({isLoading: false});
    });
  }

  searchInputHandler = searchTerm => {
    console.log('search input handler', searchTerm);
    // set the search term on state
    this.setState({searchTerm: searchTerm});
    // clear (previous) searchResults
    this.setState({searchResults: {}});
    // set up an object to hold our results
    let results = {};
    // filter exchanges on the search term
    Object.entries(this.state.exchanges).map(exchange => {
      if (exchange[0].match(searchTerm)) {
        results[exchange[0]] = exchange[1];
      }
      return true;
    });
    // set the results to state's searchResults object
    this.setState({searchResults: results});
  };

  handleSnackbarClose = () => {
    GlobalSnackage.message = '';
  };

  isFirstRun = () => {
    return window.localStorage.getItem(isFirstRun) === 'false' ? false : true;
  };

  menuIconOnTouchEndHandler = () => {
    this.setState({mobileDrawerOpen: !this.state.mobileDrawerOpen});
  };

  mobileDrawerCloseHandler = event => {
    this.setState({mobileDrawerOpen: false});
  };

  render() {
    const classes = this.props.classes;
    const exchanges = Object.keys(this.state.searchResults).length
      ? this.state.searchResults
      : this.state.exchanges;

    const snackbar = GlobalSnackage.message.length
      ? <AppSnackbar
          message={GlobalSnackage.message}
          handleCloseCallback={this.handleSnackbarClose}
        />
      : null;

    let content;
    if (this.isFirstRun()) {
      // Show onboarding - top user benefits if First Run Experience
      content = <TopUserBenefits />;
    } else if (this.state.isLoading) {
      // Show loading indicator if we're loading exchanges from the backend
      content = <CircularProgress className={classes.progress} />;
    } else {
      // Everything else
      content = (
        <div className={classes.appFrame}>
          <AppDrawer />
          <TemporaryDrawer
            open={this.state.mobileDrawerOpen}
            onCloseHandler={this.mobileDrawerCloseHandler}
          />
          <div className={this.props.classes.content}>
            <TopBar
              searchInputHandler={this.searchInputHandler}
              menuIconOnTouchEndHandler={this.menuIconOnTouchEndHandler}
            />
            <Route
              path="/"
              exact={true}
              render={() => <Home exchanges={exchanges} />}
            />
            <Route path="/posts" component={PostsForm} />
            <Route path="/settings" component={Settings} />
            {snackbar}
          </div>
        </div>
      );
    }

    return content;
  }
}

export default withStyles(styles)(App);
