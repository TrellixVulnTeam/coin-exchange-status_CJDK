// @format

import React, {Component} from 'react';
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
  render() {
    const {classes} = this.props;
    return (
      <div>
        <NavLink to="/posts">
          <Button
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
