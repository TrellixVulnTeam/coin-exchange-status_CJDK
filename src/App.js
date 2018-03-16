// @format

import React, {Component} from 'react';
import ReactGA from 'react-ga';
import {getPageFrom} from './lib/utils';
import {isFirstRun} from './constants';
import {Route} from 'react-router-dom';
import {withRouter} from 'react-router';
import {withStyles} from 'material-ui/styles';
import './App.css';
import TopBar from './components/TopBar';
import Exchanges from './components/Exchanges';
import Favorites from './components/Favorites';
import PostsForm from './components/PostsForm';
import {CircularProgress} from 'material-ui/Progress';
import fire from './fire';
import GlobalSnackage from './GlobalSnackage';
import AppSnackbar from './components/AppSnackbar';
import TopUserBenefits from './components/onboarding/TopUserBenefits';
import AppDrawer from './components/AppDrawer';
import TemporaryDrawer from './components/drawers/Temporary';
import Settings from './components/Settings';
import Add from './components/Add';
import localStorage from './lib/localStorage';

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
    position: 'relative',
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
      searchTerm: '',
      searchResultExchanges: {},
      mobileDrawerOpen: false,
    };
  }

  componentWillMount() {
    if (window.location.protocol !== 'https:') {
      return;
    } else {
      ReactGA.initialize('UA-113708505-1', {debug: true});
      const pathname = this.props.location.pathname;
      const page = getPageFrom(pathname);
      ReactGA.pageview(page);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (window.location.protocol !== 'https:') {
      return;
    } else {
      const currentPathname = this.props.location.pathname;
      const nextPathname = nextProps.location.pathname;
      if (currentPathname !== nextPathname) {
        const page = getPageFrom(nextPathname);
        ReactGA.pageview(page);
      }
    }
  }

  componentDidMount() {
    let exchangesRef = fire.database().ref('exchanges');
    exchangesRef.on('value', snapshot => {
      this.setState({exchanges: snapshot.val()});
      this.setState({isLoading: false});
    });
  }

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

  searchInputHandler = searchTerm => {
    this.setState({searchTerm: searchTerm}, () => {
      this.handleSearch(searchTerm);
    });
  };

  isSearching = () => {
    return this.state.searchTerm.length > 1 ? true : false;
  };

  handleSearch = searchTerm => {
    const term = searchTerm.toLowerCase();
    if (term.length < 2) {
      return;
    }
    let searchResultExchanges = {};
    Object.entries(this.state.exchanges).map(exchange => {
      if (exchange[0].match(term)) {
        searchResultExchanges[exchange[0]] = exchange[1];
      }
      return searchResultExchanges;
    });
    this.setState({searchResultExchanges});
    ReactGA.event({
      category: 'Search',
      action: 'Is Searching',
      label: `${this.state.searchTerm}`,
    });
  };

  exchangesComponentWillUnmountHandler = () => {
    /*
     * If we don't reset the search term here, if someone has searched something, and then
     * goes to a different /route, and then comes back the set of search results that was
     * displaying when they left will be still displayed when they return, but the top bar's
     * search input only displays on the /exchanges route and doesn't remember it's previous
     * term when you go back to it so there's a disconnect of the search input being empty (not
     * active / not searching) and yet a subset of exchanges display as if one had searched
     */
    this.setState({searchTerm: ''});
  };

  fetchFavorites = () => {
    const favKeys = localStorage.getFavorites();
    let favs = {};
    favKeys.forEach(key => {
      favs[key] = this.state.exchanges[key];
    });
    return favs;
  };

  favoritesDidUpdateHandler = callback => {
    const favs = this.fetchFavorites();
    callback(favs);
  };

  render() {
    const classes = this.props.classes;
    const exchanges = this.isSearching()
      ? this.state.searchResultExchanges
      : this.state.exchanges;
    const favorites = this.fetchFavorites();

    const snackbar = GlobalSnackage.message.length
      ? <AppSnackbar
          message={GlobalSnackage.message}
          handleCloseCallback={this.handleSnackbarClose}
        />
      : null;

    const addButton = window.location.pathname !== '/post' ? <Add /> : null;

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
              render={() =>
                <Exchanges
                  noContentMessage={`no results found for ${this.state
                    .searchTerm}`}
                  exchanges={exchanges}
                  willUnmountHandler={this.exchangesComponentWillUnmountHandler}
                />}
            />
            <Route
              path="/favorites"
              render={() =>
                <Favorites
                  noContentMessage="No favorites yet"
                  exchanges={favorites}
                  favoritesDidUpdateHandler={this.favoritesDidUpdateHandler}
                />}
            />
            <Route path="/post" component={PostsForm} />
            <Route path="/settings" component={Settings} />
            {snackbar}
            {addButton}
          </div>
        </div>
      );
    }

    return content;
  }
}

export default withStyles(styles)(withRouter(App));
