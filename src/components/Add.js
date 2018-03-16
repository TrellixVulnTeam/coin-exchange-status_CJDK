// @format

import React, {Component} from 'react';
import ReactGA from 'react-ga';
import {getPageFrom} from '../lib/utils';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import {NavLink} from 'react-router-dom';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 2,
    position: 'fixed',
    bottom: 0,
    right: 0,
  },
});

class Add extends Component {
  clickHandler = () => {
    ReactGA.event({
      category: 'Navigation',
      action: 'FAB Click',
      label: `${getPageFrom(window.location.pathname)}`, // FAB appears on all pages except /post
    });
  };

  render() {
    const {classes} = this.props;
    return (
      <div>
        <NavLink to="/post">
          <Button
            onClick={this.clickHandler}
            variant="fab"
            aria-label="add"
            className={classes.button}
            color="secondary">
            <AddIcon />
          </Button>
        </NavLink>
      </div>
    );
  }
}
export default withStyles(styles)(Add);
