// @format

import React, {Component} from 'react';
import ReactGA from 'react-ga';
import {isFirstRun} from '../../constants';
import {withStyles} from 'material-ui/styles';
import compose from 'recompose/compose';
import withWidth from 'material-ui/utils/withWidth';
import Hidden from 'material-ui/Hidden';
import Content from './top_user_benefits/Content';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import Button from 'material-ui/Button';

const styles = theme => ({
  container: {
    height: 'inherit',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    background: theme.palette.primary.main,
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  desktop: {
    flexBasis: '46%',
    background: 'rgba(0, 0, 0, 0.025)',
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 2}px`,
    borderRadius: '5px',
    boxShadow: '2px 2px 7px 0 rgba(0, 0, 0, 0.25)',
  },
  navLeft: {
    display: 'flex',
    flexBasis: '27%',
    justifyContent: 'flex-end',
  },
  navRight: {
    flexBasis: '27%',
  },
  buttons: {
    margin: theme.spacing.unit * 6,
    background: theme.palette.text.light.primary,
  },
  icons: {
    color: theme.palette.text.secondary,
  },
});

class TopUserBenefits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  dotsClickHandler = index => {
    this.setState({index});
    ReactGA.event({
      category: 'Onboarding',
      action: 'Clicked Dot',
      value: index,
    });
  };

  getStartedHandler = () => {
    window.localStorage.setItem(isFirstRun, false);
    window.location.href = window.location.href; // refresh
    ReactGA.event({
      category: 'Onboarding',
      action: 'Clicked Get Started button',
    });
  };

  slideChangeHandler = index => {
    this.setState({index});
    ReactGA.event({
      category: 'Onboarding',
      action: 'Slide Change',
      value: index,
    });
  };

  rightNavClickHandler = () => {
    const index = this.state.index;
    switch (index) {
      case 2:
        this.setState({index: 0});
        break;
      default:
        this.setState({index: this.state.index + 1});
        break;
    }
    ReactGA.event({
      category: 'Onboarding',
      action: 'Clicked Right Arrow',
    });
  };

  leftNavClickHandler = () => {
    const index = this.state.index;
    switch (index) {
      case 0:
        this.setState({index: 2});
        break;
      default:
        this.setState({index: this.state.index - 1});
        break;
    }
    ReactGA.event({
      category: 'Onboarding',
      action: 'Clicked Left Arrow',
    });
  };

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.container}>
        {/* Hidden if screen width >= 960px, the md breakpoint */}
        <Hidden mdUp>
          <Content
            index={this.state.index}
            dotsClickHandler={this.dotsClickHandler}
            getStartedHandler={this.getStartedHandler}
            slideChangeHandler={this.slideChangeHandler}
          />
        </Hidden>
        {/* Hidden if screen with is less than sm's upper max to the next breakpoint, md, which is 960px */}
        <Hidden smDown>
          <div className={classes.navLeft}>
            <Button
              variant="fab"
              mini
              aria-label="nav left"
              className={classes.buttons}
              onClick={this.leftNavClickHandler}>
              <KeyboardArrowLeft className={classes.icons} />
            </Button>
          </div>
          <div className={classes.desktop}>
            <Content
              index={this.state.index}
              dotsClickHandler={this.dotsClickHandler}
              getStartedHandler={this.getStartedHandler}
              slideChangeHandler={this.slideChangeHandler}
            />
          </div>
          <div className={classes.navRight}>
            <Button
              variant="fab"
              mini
              aria-label="nav right"
              className={classes.buttons}
              onClick={this.rightNavClickHandler}>
              <KeyboardArrowRight className={classes.icons} />
            </Button>
          </div>
        </Hidden>
      </div>
    );
  }
}

export default compose(withStyles(styles), withWidth())(TopUserBenefits);
