// @format

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardContent} from 'material-ui/Card';
import Email from 'material-ui-icons/Email';
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from 'material-ui/List';

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit * 3,
  },
});

class Feedback extends Component {
  render() {
    const {classes, subheader} = this.props;
    const subheaderText = subheader || 'Feedback';

    return (
      <Card className={classes.card}>
        <CardContent>
          <List subheader={<ListSubheader>{subheaderText}</ListSubheader>}>
            <ListItem>
              <ListItemIcon>
                <Email />
              </ListItemIcon>
              <ListItemText
                primary="Send a message to:"
                secondary="hello@coinexchangestatus.com"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Feedback);
