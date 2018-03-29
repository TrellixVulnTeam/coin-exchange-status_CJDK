// @format

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardContent} from 'material-ui/Card';
import FeedbackCard from './settings/FeedbackCard';
import List, {ListItem, ListItemText, ListSubheader} from 'material-ui/List';

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

class Faq extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardContent>
            <List
              subheader={
                <ListSubheader>How is sentiment calculated?</ListSubheader>
              }>
              <ListItem>
                <ListItemText primary="We collect relevant tweets through Twitter's search api and pass the results to Google's Natural Language API's Sentiment Analysis endpoint. Updated every fifteen minutes." />
              </ListItem>
            </List>
          </CardContent>
        </Card>
        <FeedbackCard subheader="How do I suggest a feature or provide feedback?" />
      </div>
    );
  }
}

export default withStyles(styles)(Faq);
