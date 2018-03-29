// @format

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {isFirstRun} from '../constants';
import Card, {CardContent} from 'material-ui/Card';
import List, {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
} from 'material-ui/List';
import Switch from 'material-ui/Switch';
import DirectionsWalk from 'material-ui-icons/DirectionsWalk';
import FeedbackCard from './settings/FeedbackCard';

const styles = theme => ({
  container: {
    minWidth: '360px',
    height: 'inherit',
    overflow: 'scroll',
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 2}px 0`,
    boxShadow: `inset 1px 0 2px ${theme.palette.text.divider}`,
    [theme.breakpoints.down('sm')]: {
      boxShadow: 'none',
    },
  },
  card: {
    marginBottom: theme.spacing.unit * 3,
  },
});

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstRun: null,
    };
  }

  componentWillMount = () => {
    const bool = JSON.parse(window.localStorage.getItem(isFirstRun));
    this.setState({isFirstRun: bool});
  };

  handleChange = name => event => {
    this.setState({[name]: event.target.checked});
    window.localStorage.setItem(isFirstRun, event.target.checked);
  };

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardContent>
            <List subheader={<ListSubheader>Onboarding</ListSubheader>}>
              <ListItem>
                <ListItemIcon>
                  <DirectionsWalk />
                </ListItemIcon>
                <ListItemText primary="Top User Benefits" />
                <ListItemSecondaryAction>
                  <Switch
                    onChange={this.handleChange('isFirstRun')}
                    checked={this.state.isFirstRun}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </CardContent>
        </Card>
        <FeedbackCard />
      </div>
    );
  }
}

export default withStyles(styles)(Settings);
