// @format

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import SettingsIcon from 'material-ui-icons/Settings';
import HomeIcon from 'material-ui-icons/Home';
import CreateIcon from 'material-ui-icons/Create';

const styles = theme => ({
  drawerContainer: {
    width: theme.widths.drawer,
    background: theme.palette.text.light.primary,
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: theme.heights.topBar,
    paddingLeft: theme.spacing.unit * 2,
  },
  drawerH1: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: '18px',
    color: theme.palette.text.secondary,
  },
});

class AppDrawer extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.drawerContainer}>
        <div className={classes.drawerHeader}>
          <Typography
            component="h1"
            variant="title"
            className={classes.drawerH1}>
            Coin Exchange Status
          </Typography>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="New Post" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(AppDrawer);
