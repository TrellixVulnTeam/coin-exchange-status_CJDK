// @format

import React, {Component} from 'react';
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
    [theme.breakpoints.down('md')]: {
      justifyContent: 'flex-end',
      alignItems: 'center',
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
  },
  icons: {
    color: theme.palette.text.secondary,
  },
});

class TopUserBenefits extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.container}>
        {/* Hidden if screen width >= 960px, the md breakpoint */}
        <Hidden mdUp>
          <Content />
        </Hidden>
        {/* Hidden if screen with < 960px, the md breakpoint */}
        <Hidden mdDown>
          <div className={classes.navLeft}>
            <Button
              variant="fab"
              mini
              color="secondary"
              aria-label="nav left"
              className={classes.buttons}>
              <KeyboardArrowLeft className={classes.icons} />
            </Button>
          </div>
          <div className={classes.desktop}>
            <Content />
          </div>
          <div className={classes.navRight}>
            <Button
              variant="fab"
              mini
              color="secondary"
              aria-label="nav right"
              className={classes.buttons}>
              <KeyboardArrowRight className={classes.icons} />
            </Button>
          </div>
        </Hidden>
      </div>
    );
  }
}

export default compose(withStyles(styles), withWidth())(TopUserBenefits);
