// @format

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function SubmitButton(props) {
  const {classes} = props;

  return (
    <div>
      <input id="raised-button-file" className={classes.input} type="submit" />
      <label htmlFor="raised-button-file">
        <Button
          raised
          component="span"
          color="primary"
          className={classes.button}>
          Submit
        </Button>
      </label>
    </div>
  );
}

SubmitButton.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SubmitButton);
