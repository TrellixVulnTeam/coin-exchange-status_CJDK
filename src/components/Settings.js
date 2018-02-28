// @format

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardContent} from 'material-ui/Card';
import Add from './Add';
import List, {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
} from 'material-ui/List';
import Switch from 'material-ui/Switch';
import DirectionsWalk from 'material-ui-icons/DirectionsWalk';

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
});

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstRun: null,
    };
  }

  componentWillMount = () => {
    const isFirstRun = JSON.parse(window.localStorage.getItem('ISFIRSTRUN'));
    this.setState({isFirstRun: isFirstRun});
  };

  handleChange = name => event => {
    this.setState({[name]: event.target.checked});
    window.localStorage.setItem('ISFIRSTRUN', event.target.checked);
  };

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.container}>
        <Card>
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
        <Add />
      </div>
    );
  }
}

export default withStyles(styles)(Settings);
