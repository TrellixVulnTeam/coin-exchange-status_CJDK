// @format

import React from 'react';
import Script from 'react-load-script';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  recaptcha: {
    marginBottom: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 2,
  },
});

/*
 * React doesn't allow JSX for custom attributes, they must be assigned a string
 * or number. If JSX was allowed you do something like
 * data-callback={this.dataCallback} but instead we can assign a global function
 * and pass it that way.
 */
window.dataCallback = function(token) {
  console.log('recaptcha success: ', token);
};

class ReCaptcha extends React.Component {
  handleScriptLoad = () => {
    console.log('script load');
  };

  render() {
    const {classes} = this.props;
    return (
      <div>
        <Script
          url="https://www.google.com/recaptcha/api.js"
          onLoad={this.handleScriptLoad.bind(this)}
        />
        <div
          className={['g-recaptcha', `${classes.recaptcha}`].join(' ')}
          data-sitekey="6LcFcEMUAAAAACFtajLNCKToXY6T9TMyy1_m81LC"
          data-callback="dataCallback"
        />
      </div>
    );
  }
}

export default withStyles(styles)(ReCaptcha);
