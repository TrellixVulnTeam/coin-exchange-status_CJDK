// @format

import React, {Component} from 'react';
import ExchangeNameAutosuggest from './status_form/ExchangeNameAutosuggest';
import TypeSelect from './status_form/TypeSelect';
import DelaySelect from './status_form/DelaySelect';
import MarketTextField from './status_form/MarketTextField';
import DetailsTextField from './status_form/DetailsTextField';
import SubmitButton from './status_form/SubmitButton';
import Card, {CardHeader, CardContent} from 'material-ui/Card';
import {withStyles} from 'material-ui/styles';
//import fire from '../fire';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: `${theme.spacing.unit * 10}px 0`,
  },
  card: {
    width: '40%',
    [theme.breakpoints.up('md')]: {
      width: '45%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '65%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '98.6%',
    },
  },
  form: {
    width: '100%',
  },
  root: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class StatusForm extends Component {
  constructor(props) {
    super(props);
    this.handleExchangeNameChange = this.handleExchangeNameChange.bind(this);
    this.handleFeedbackTypeChange = this.handleFeedbackTypeChange.bind(this);
    this.handleMarketChange = this.handleMarketChange.bind(this);
    this.handleDetailsChange = this.handleDetailsChange.bind(this);
    this.handleDelayChange = this.handleDelayChange.bind(this);
    this.state = {
      issue: {
        exchangeName: '',
        type: '',
        market: '',
        details: '',
        delay: '',
      },
    };
  }

  addStatus = event => {
    event.preventDefault();
    console.log(this.state);
    /*event.preventDefault(); // prevents form submit from reloading the page
    fire.database().ref('status').push(this.state.issue).then(() => {
      // send to firebase
      console.log('push complete');
    });*/
  };

  handleExchangeNameChange = name => {
    const issue = this.state.issue;
    issue.exchangeName = name;
    this.setState({issue: issue});
  };

  handleFeedbackTypeChange = type => {
    const issue = this.state.issue;
    issue.type = type;
    this.setState({issue: issue});
  };

  handleMarketChange = value => {
    const issue = this.state.issue;
    issue.market = value;
    this.setState({issue: issue});
  };

  handleDetailsChange = value => {
    const issue = this.state.issue;
    issue.details = value;
    this.setState({issue: issue});
  };

  handleDelayChange = value => {
    const issue = this.state.issue;
    issue.delay = value;
    this.setState({issue: issue});
  };

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardHeader
            title="Add new feedback here"
            subheader="You can do it!"
          />
          <CardContent>
            <form className={classes.form} onSubmit={this.addStatus}>
              <ExchangeNameAutosuggest
                className={classes.root}
                exchangeNames={this.state.exchangeNames}
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
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(StatusForm);
