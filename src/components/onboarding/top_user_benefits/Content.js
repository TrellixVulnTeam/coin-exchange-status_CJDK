// @format

import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
    color: theme.palette.text.secondary,
    background: theme.palette.text.light.primary,
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
  render() {
    const {classes, index} = this.props;
    return (
      <div>
        <Images index={index} />
        <AutoPlaySwipeableViews
          index={index}
          interval={6000}
          className={classes.swipeableContainer}
          onChangeIndex={this.props.slideChangeHandler}>
          <Slide
            title="Stay up-to-date with your favorite crypto exchanges"
            subheading="Find out how things are running on trading platforms from the people that are using them."
          />
          <Slide
            title="Trade with confidence"
            subheading="Read users' feedback to become aware of potential delays, pitfalls, or setbacks before using an exchange."
          />
          <Slide
            title="Help the community grow"
            subheading="Report back often. Each time you interact with an exchange let others know how it went by submitting a post."
          />
        </AutoPlaySwipeableViews>
        <Button
          onClick={this.props.getStartedHandler}
          variant="raised"
          align="center"
          className={classes.button}>
          Get Started
        </Button>
        <Dots index={index} clickHandler={this.props.dotsClickHandler} />
      </div>
    );
  }
}

Content.propTypes = {
  dotsClickHandler: PropTypes.func.isRequired,
  getStartedHandler: PropTypes.func.isRequired,
  slideChangeHandler: PropTypes.func.isRequired,
};

export default withStyles(styles)(Content);
