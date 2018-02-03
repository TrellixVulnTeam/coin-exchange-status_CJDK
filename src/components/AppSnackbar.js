// @format

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

class AppSnackbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  handleClose = () => {
    this.setState({open: false});
    this.props.handleCloseCallback();
  };

  render() {
    const message = this.props.message;
    return (
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        autoHideDuration={2000}
        open={this.state.open}
        onClose={this.handleClose}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={
          <span id="message-id">
            {message}
          </span>
        }
      />
    );
  }
}

AppSnackbar.propTypes = {
  message: PropTypes.string.isRequired,
  handleCloseCallback: PropTypes.func.isRequired,
};

export default AppSnackbar;
