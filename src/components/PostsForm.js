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
      post: {
        exchangeKey: '',
        type: '',
        market: '',
        details: '',
        delay: '',
      },
    };
  }

  addStatus = event => {
    event.preventDefault(); // prevents form submit from reloading the page
    fire.database().ref('posts').push(this.state.post).then(() => {
      // send to firebase
      console.log('push complete');
    });
  };

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

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardHeader
            title="Post feedback for an exchange here"
            subheader="You must select an exchange. All other fields are optional but keep in mind, the more information provided, the better."
          />
          <CardContent>
            <form className={classes.form} onSubmit={this.addStatus}>
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
              <div
                className="g-recaptcha"
                data-sitekey="6LcFcEMUAAAAACFtajLNCKToXY6T9TMyy1_m81LC"
              />
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(PostsForm);
