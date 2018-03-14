// @format

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {NavLink} from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import SettingsIcon from 'material-ui-icons/Settings';
import HomeIcon from 'material-ui-icons/Home';
import CreateIcon from 'material-ui-icons/Create';
import FavoriteIcon from 'material-ui-icons/Favorite';

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
  drawerListItem: {
    paddingTop: 0,
    paddingBottom: 0,
  },
});

class TemporaryDrawer extends Component {
  render() {
    const {classes} = this.props;
    return (
      <Drawer
        variant="temporary"
        open={this.props.open}
        anchor="left"
        transitionDuration={200}
        onClose={this.props.onCloseHandler}>
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
            <ListItem button className={classes.drawerListItem}>
              <NavLink
                to="/"
                exact
                className="navLink"
                onClick={this.props.onCloseHandler}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </NavLink>
            </ListItem>
            <ListItem button className={classes.drawerListItem}>
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <NavLink to="/favorites" exact className="navLink">
                <ListItemText primary="My Favs" />
              </NavLink>
            </ListItem>
            <ListItem button className={classes.drawerListItem}>
              <NavLink
                to="/posts"
                className="navLink"
                onClick={this.props.onCloseHandler}>
                <ListItemIcon>
                  <CreateIcon />
                </ListItemIcon>
                <ListItemText primary="New Post" />
              </NavLink>
            </ListItem>
            <ListItem button className={classes.drawerListItem}>
              <NavLink
                to="/settings"
                className="navLink"
                onClick={this.props.onCloseHandler}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </NavLink>
            </ListItem>
          </List>
        </div>
      </Drawer>
    );
  }
}

TemporaryDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onCloseHandler: PropTypes.func.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);
