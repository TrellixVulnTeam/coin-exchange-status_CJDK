// @format

import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Reboot from 'material-ui/Reboot';
import {withStyles} from 'material-ui/styles';
import './App.css';
import TopBar from './components/TopBar';
import Home from './components/Home';
import PostsForm from './components/PostsForm';

const styles = theme => ({
  container: {
    padding: `64px ${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px`,
  },
});

class App extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div>
        <Reboot />
        <TopBar />
        <div className={classes.container}>
          <Route path="/" component={Home} exact={true} />
          <Route path="/posts" component={PostsForm} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
