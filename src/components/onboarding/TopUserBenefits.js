// @format

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
import Slide from './top_user_benefits/Slide';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
};

class TopUserBenefits extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div>
        <AutoPlaySwipeableViews interval="5000">
	  <Slide title="Status pages for crypto exchanges" subheading="Get user-submitted feedback on your favorite exchanges" />
	  <Slide title="Slide 2" subheading="subheading 2" />
	  <Slide title="Slide 3" subheading="subheading 3" />
        </AutoPlaySwipeableViews>
        <div className={this.props.classes.buttonContainer}>
          <Button variant="raised" align="center">
            Get Started
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(TopUserBenefits);
