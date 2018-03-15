// @format

import React, {Component} from 'react';
import ExchangeNameAutosuggest from './posts_form/ExchangeNameAutosuggest';
import TypeSelect from './posts_form/TypeSelect';
import DelaySelect from './posts_form/DelaySelect';
import MarketTextField from './posts_form/MarketTextField';
import DetailsTextField from './posts_form/DetailsTextField';
import SubmitButton from './posts_form/SubmitButton';
import Card, {CardHeader, CardContent} from 'material-ui/Card';
import {withStyles} from 'material-ui/styles';
import fire from '../fire';
import ReCAPTCHA from 'react-google-recaptcha';
import {Redirect} from 'react-router';
import GlobalSnackage from '../GlobalSnackage';
import Hidden from 'material-ui/Hidden';
import compose from 'recompose/compose';
import withWidth from 'material-ui/utils/withWidth';

const styles = theme => ({
  container: {
    flexBasis: '100%',
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 2}px`,
    boxShadow: `inset 1px 0 2px ${theme.palette.text.divider}`,
    [theme.breakpoints.down('sm')]: {
      boxShadow: 'none',
    },
  },
  card: {
    flexBasis: '100%',
  },
  form: {
    width: '100%',
  },
  recaptcha: {
    marginBottom: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 2,
  },
  root: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class PostsForm extends Component {
  constructor(props) {
    super(props);
    this.handleExchangeNameChange = this.handleExchangeNameChange.bind(this);
    this.handleFeedbackTypeChange = this.handleFeedbackTypeChange.bind(this);
    this.handleMarketChange = this.handleMarketChange.bind(this);
    this.handleDetailsChange = this.handleDetailsChange.bind(this);
    this.handleDelayChange = this.handleDelayChange.bind(this);
    this.state = {
      recaptchaIsValid: false,
      shouldRedirect: false,
      post: {
        recaptchaToken: '',
        exchangeKey: '',
        type: '',
        market: '',
        details: '',
        delay: '',
      },
    };
  }

  handleExchangeNameChange = key => {
    const post = this.state.post;
    post.exchangeKey = key;
    this.setState({post: post});
  };

  handleFeedbackTypeChange = type => {
    const post = this.state.post;
    post.type = type;
    this.setState({post: post});
  };

  handleMarketChange = value => {
    const post = this.state.post;
    post.market = value;
    this.setState({post: post});
  };

  handleDetailsChange = value => {
    const post = this.state.post;
    post.details = value;
    this.setState({post: post});
  };

  handleDelayChange = value => {
    const post = this.state.post;
    post.delay = value;
    this.setState({post: post});
  };

  handleReCaptchaSuccess = token => {
    let {post} = this.state;
    post.recaptchaToken = token;
    this.setState({post: post});
    this.setState({recaptchaIsValid: true});
    /*
     * TODO add cloud function that verifies the token
     * https://developers.google.com/recaptcha/docs/verify
     */
  };

  isValid = () => {
    const exchange = this.state.post.exchangeKey;
    const exchangeIsValid = exchange.length > 0 ? true : false;
    const recaptchaIsValid = this.state.recaptchaIsValid;
    return exchangeIsValid && recaptchaIsValid ? true : false;
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.isValid()) {
      return;
    }
    fire.database().ref('posts').push(this.state.post).then(() => {
      // set snack message
      GlobalSnackage.message = 'Success!';
      // redirect to root /
      this.setState({shouldRedirect: true});
    });
  };

  getRecaptcha = opts => {
    const classes = this.props.classes;
    return (
      <ReCAPTCHA
        className={classes.recaptcha}
        size={opts['compact'] === true ? 'compact' : 'normal'}
        sitekey="6LcFcEMUAAAAACFtajLNCKToXY6T9TMyy1_m81LC"
        onChange={this.handleReCaptchaSuccess}
      />
    );
  };

  render() {
    const {classes} = this.props;
    const {shouldRedirect} = this.state;
    const disabled = this.isValid() ? false : true;
    return shouldRedirect
      ? <Redirect to="/" />
      : <div className={classes.container}>
          <Card className={classes.card}>
            <CardHeader
              title="Post feedback for an exchange here"
              subheader="You must select an exchange. All other fields are optional but keep in mind, the more information provided, the better."
            />
            <CardContent>
              <form className={classes.form} onSubmit={this.handleSubmit}>
                <ExchangeNameAutosuggest
                  className={classes.root}
                  handleExchangeNameChange={this.handleExchangeNameChange}
                />
                <TypeSelect
                  handleFeedbackTypeChange={this.handleFeedbackTypeChange}
                />
                <MarketTextField handleMarketChange={this.handleMarketChange} />
                <DetailsTextField
                  handleDetailsChange={this.handleDetailsChange}
                />
                <DelaySelect handleDelayChange={this.handleDelayChange} />
                <Hidden smUp>
                  {/* Breakpoint up - children are hidden at or above the breakpoint. sm = 600px or larger */}
                  {this.getRecaptcha({compact: true})}
                </Hidden>
                <Hidden xsDown>
                  {/*
		    * Breakpoint down - children are hidden at or below the upper bounds to the next breakpoint.
		    * The upper bounds of xs is 600 because that's where the sm breakpoint is defined so xsDown will
		    * hide everything below 600.
		  */}
                  {this.getRecaptcha({compact: false})}
                </Hidden>
                <SubmitButton disabled={disabled} />
              </form>
            </CardContent>
          </Card>
        </div>;
  }
}

export default compose(withStyles(styles), withWidth())(PostsForm);
