// @format

import React from 'react';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {MenuItem} from 'material-ui/Menu';
import {withStyles} from 'material-ui/styles';
import fire from '../../fire';

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    height: 'auto',
    zIndex: 2,
    marginBottom: theme.spacing.unit * 4,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  textField: {
    width: '100%',
  },
});

class ExchangeNameAutosuggest extends React.Component {
  state = {
    value: '',
    suggestions: [],
    exchanges: [], // the 'datasource' from which suggestions are populated
  };

  componentDidMount() {
    let exchanges = [];
    // load exchanges from db
    const exchangeRef = fire.database().ref('/exchanges');
    exchangeRef.once('value').then(snapshot => {
      const entries = Object.entries(snapshot.val());
      entries.map(entry => {
        const exchangeKey = entry[0]; // the exchange's key
        const exchangeName = entry[1].name; // the exchange's name
        return exchanges.push({label: exchangeName, key: exchangeKey});
      });
      this.setState({exchanges: exchanges});
    });
  }

  renderInput = inputProps => {
    const {classes, autoFocus, value, ref, ...other} = inputProps;

    return (
      <TextField
        autoFocus={autoFocus}
        className={classes.textField}
        value={value}
        inputRef={ref}
        InputProps={{
          classes: {
            input: classes.input,
            underline: classes.underline,
            inkbar: classes.inkbar,
          },
          ...other,
        }}
      />
    );
  };

  renderSuggestion = (suggestion, {query, isHighlighted}) => {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    if (!suggestion.label) {
      // hack to fix a bug where an 'empty' suggestion was coming through, not sure why
      return;
    }

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) => {
            return part.highlight
              ? <span key={String(index)} style={{fontWeight: 300}}>
                  {part.text}
                </span>
              : <strong key={String(index)} style={{fontWeight: 500}}>
                  {part.text}
                </strong>;
          })}
        </div>
      </MenuItem>
    );
  };

  renderSuggestionsContainer(options) {
    const {containerProps, children} = options;

    return (
      <Paper {...containerProps} square>
        {children}
      </Paper>
    );
  }

  getSuggestionValue(exchange) {
    return exchange.label;
  }

  getSuggestions(value) {
    ReactGA.event({
      category: 'New Post',
      action: 'Value Entered For Exchange Name AutoSuggest',
      label: value,
    });
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : this.state.exchanges.filter(exchange => {
          if (exchange && exchange.label) {
            const keep =
              count < 5 &&
              exchange.label.toLowerCase().slice(0, inputLength) === inputValue;

            if (keep) {
              count += 1;
            }

            return keep;
          } else {
            return [];
          }
        });
  }

  handleSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (event, {newValue}) => {
    this.setState({
      value: newValue === undefined ? '' : newValue,
    });
    // newValue is the name (what's displayed) but we want to save against the exchange's key / id
    // this.state.exchanges is an array of objects like [{label: 'exchangeName', key: 'exchangeKey'},...]
    const exchange = this.state.exchanges.find(exchange => {
      return exchange.label === newValue;
    });
    if (exchange && exchange.key) {
      this.props.handleExchangeNameChange(exchange.key);
    } else {
      this.props.handleExchangeNameChange('');
    }
  };

  render() {
    const {classes} = this.props;
    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={this.renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={{
          autoFocus: false,
          classes,
          placeholder: 'Which exchange?',
          value: this.state.value,
          onChange: this.handleChange,
        }}
      />
    );
  }
}

ExchangeNameAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
  handleExchangeNameChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(ExchangeNameAutosuggest);
