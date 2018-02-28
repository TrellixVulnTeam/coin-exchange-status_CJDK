// @format

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import {FormControlLabel} from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Add from './Add';

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
    this.setState({
      isFirstRun: JSON.parse(window.localStorage.getItem('ISFIRSTRUN')),
    });
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
            <Typography>Settings</Typography>
            <Typography>Onboarding</Typography>
            <Typography>Top User Benefits</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.isFirstRun}
                  onChange={this.handleChange('isFirstRun')}
                  value="isFirstRun"
                  color="primary"
                />
              }
              label={this.state.isFirstRun ? 'On' : 'Off'}
            />
          </CardContent>
        </Card>
        <Add />
      </div>
    );
  }
}

export default withStyles(styles)(Settings);
