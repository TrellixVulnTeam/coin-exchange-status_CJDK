// @format

import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Reboot from 'material-ui/Reboot';
import {withStyles} from 'material-ui/styles';
import './App.css';
import TopBar from './components/TopBar';
import Home from './components/Home';
import PostsForm from './components/PostsForm';
import Results from './components/Results';
import {CircularProgress} from 'material-ui/Progress';
import fire from './fire';

const styles = theme => ({
  container: {
    height: 'inherit',
    padding: `64px ${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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

  resultsComponentWillUnmount() {
    // empty the search results
    this.setState({searchResults: {}});
    // clear the search term
    this.setState({searchTerm: ''});
  }

  render() {
    const classes = this.props.classes;
    const searchTerm = this.state.searchTerm;
    const exchanges = this.state.exchanges;
    const containerContent = this.state.isLoading
      ? <CircularProgress className={classes.progress} />
      : <div>
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
        </div>;

    return (
      <div>
        <Reboot />
        <TopBar onSearchSubmitCallback={this.onSearchSubmitCallback} />
        <div className={classes.container}>
          {containerContent}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
