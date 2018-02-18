// @format

import React, {Component} from 'react';
import {isFirstRun} from '../../../constants';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
import Slide from './Slide';
import Dots from './Dots';
import Images from './Images';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = theme => ({
  swipeableContainer: {
    marginTop: '56px',
  },
  button: {
    display: 'block',
    margin: '56px auto 24px',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
      top: '60px',
    },
  },
  screen: {
    display: 'block',
    margin: '0 auto',
  },
});

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  onChangeHandler = (index, indexLatest) => {
    this.setState({index});
  };

  buttonClickHandler = () => {
    window.localStorage.setItem(isFirstRun, false);
    window.location.href = window.location.href; // refresh
  };

  dotsClickHandler = index => {
    this.setState({index});
  };

  render() {
    const {classes} = this.props;
    return (
      <div>
        <Images index={this.state.index} />
        <AutoPlaySwipeableViews
          index={this.state.index}
          interval={6000}
          className={classes.swipeableContainer}
          onChangeIndex={this.onChangeHandler}>
          <Slide
            title="Status pages for crypto exchanges"
            subheading="Find out how things are running on trading platforms."
          />
          <Slide
            title="Trade with confidence"
            subheading="Read users' feedback to become aware of potential delays, pitfalls, or setbacks before using an exchange."
          />
          <Slide
            title="Help the community grow"
            subheading="Report back often. Each time you interact with an exchange let others know how it went by posting a posty post."
          />
        </AutoPlaySwipeableViews>
        <Button
          onClick={this.buttonClickHandler}
          variant="raised"
          align="center"
          className={classes.button}>
          Get Started
        </Button>
        <Dots index={this.state.index} clickCallback={this.dotsClickHandler} />
      </div>
    );
  }
}

export default withStyles(styles)(Content);
