// @format

import React, {Component} from 'react';
import Hidden from 'material-ui/Hidden';
import {NavLink} from 'react-router-dom';
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
  navLink: {
    /* see index.css
     * these styles were easier to deal with plain 'ol css
     *
     * (note: className on these elements are a string)
     */
  },
});

class AppDrawer extends Component {
  render() {
    const {classes} = this.props;
    return (
      <Hidden smDown>
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
              <NavLink to="/" exact className="navLink">
                <ListItemText primary="Home" />
              </NavLink>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <NavLink to="/posts" className="navLink">
                <ListItemText primary="New Post" />
              </NavLink>
            </ListItem>
            <ListItem button>
              <NavLink to="/settings" className="navLink">
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </NavLink>
            </ListItem>
          </List>
        </div>
      </Hidden>
    );
  }
}

export default withStyles(styles)(AppDrawer);
