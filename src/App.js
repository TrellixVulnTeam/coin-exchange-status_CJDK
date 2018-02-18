// @format

import React, {Component} from 'react';
import {isFirstRun} from './constants';
import {Route} from 'react-router-dom';
import {withStyles} from 'material-ui/styles';
import './App.css';
import TopBar from './components/TopBar';
import Home from './components/Home';
import PostsForm from './components/PostsForm';
import Results from './components/Results';
import {CircularProgress} from 'material-ui/Progress';
import fire from './fire';
import GlobalSnackage from './GlobalSnackage';
import AppSnackbar from './components/AppSnackbar';
import TopUserBenefits from './components/onboarding/TopUserBenefits';

const styles = theme => ({
  container: {
    height: '100vh',
    padding: `82px ${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  progress: {
    position: 'static',
    top: '50%',
    left: '50%',
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.resultsComponentWillUnmount = this.resultsComponentWillUnmount.bind(
      this,
    );
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    this.state = {
      isLoading: true,
      exchanges: {},
      searchResults: {},
      searchTerm: '',
    };
  }

  componentDidMount() {
    // load exchanges from db
    let exchangesRef = fire.database().ref('exchanges');
    exchangesRef.on('value', snapshot => {
      this.setState({exchanges: snapshot.val()});
      this.setState({isLoading: false});
    });
  }

  onSearchSubmitCallback = searchTerm => {
    // set the search term to on state
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

  resultsComponentWillUnmount() {
    // empty the search results
    this.setState({searchResults: {}});
    // clear the search term
    this.setState({searchTerm: ''});
  }

  isFirstRun = () => {
    return window.localStorage.getItem(isFirstRun) === 'false' ? false : true;
  };

  render() {
    const classes = this.props.classes;
    const searchTerm = this.state.searchTerm;
    const exchanges = this.state.exchanges;

    const snackbar = GlobalSnackage.message.length
      ? <AppSnackbar
          message={GlobalSnackage.message}
          handleCloseCallback={this.handleSnackbarClose}
        />
      : null;

    let content;
    if (this.isFirstRun()) {
      // Show onboarding - top user benefits if First Run Experience
      content = (
        <div style={{height: 'inherit'}}>
          <TopUserBenefits />
        </div>
      );
    } else if (this.state.isLoading) {
      // Show loading indicator if we're loading exchanges from the backend
      content = <CircularProgress className={classes.progress} />;
    } else {
      // Everything else
      content = (
        <div className={this.props.classes.container}>
          <TopBar onSearchSubmitCallback={this.onSearchSubmitCallback} />
          <Route
            path="/"
            exact={true}
            render={() => <Home exchanges={exchanges} />}
          />
          <Route path="/posts" component={PostsForm} />
          <Route
            path="/search"
            render={() =>
              <Results
                searchTerm={searchTerm}
                exchanges={this.state.searchResults}
                willUnmountCallback={this.resultsComponentWillUnmount}
              />}
          />
          {snackbar}
        </div>
      );
    }

    return content;
  }
}

export default withStyles(styles)(App);
