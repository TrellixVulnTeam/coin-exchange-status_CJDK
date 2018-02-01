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

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: `${theme.spacing.unit * 10}px 0`,
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing.unit * 2}px 0`,
    },
  },
  card: {
    [theme.breakpoints.up('lg')]: {
      margin: `0 ${theme.spacing.unit * 64}px`,
    },
    [theme.breakpoints.up('md')]: {
      margin: `0 ${theme.spacing.unit * 32}px`,
    },
    [theme.breakpoints.down('sm')]: {
      margin: `0 ${theme.spacing.unit * 4}px`,
    },
    [theme.breakpoints.down('xs')]: {
      margin: 0,
    },
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
      disabled: true,
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
    this.setState({disabled: false});
    /*
     * TODO add cloud function that verifies the token
     * https://developers.google.com/recaptcha/docs/verify
     */
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.isDisabled) {
      return;
    }
    fire.database().ref('posts').push(this.state.post).then(() => {
      // redirect to root /
      this.setState({shouldRedirect: true});
    });
  };

  render() {
    const {classes} = this.props;
    const {disabled, shouldRedirect} = this.state;
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
                <ReCAPTCHA
                  className={classes.recaptcha}
                  sitekey="6LcFcEMUAAAAACFtajLNCKToXY6T9TMyy1_m81LC"
                  onChange={this.handleReCaptchaSuccess}
                />
                <SubmitButton disabled={disabled} />
              </form>
            </CardContent>
          </Card>
        </div>;
  }
}

export default withStyles(styles)(PostsForm);
