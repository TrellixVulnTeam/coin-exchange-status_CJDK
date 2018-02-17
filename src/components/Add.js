// @format

import React, {Component} from 'react';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import {Link} from 'react-router-dom';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 2,
    background: theme.palette.secondary.main,
    color: theme.palette.text.disabled,
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
        <Link to="/posts">
          <Button
            variant="fab"
            color="primary"
            aria-label="add"
            className={classes.button}>
            <AddIcon />
          </Button>
        </Link>
      </div>
    );
  }
}
export default withStyles(styles)(Add);
