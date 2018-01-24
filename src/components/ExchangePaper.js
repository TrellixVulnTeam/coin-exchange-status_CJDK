// @format

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardHeader, CardContent} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    flexBasis: '100%',
    flexShrink: 0,
    height: 'auto',
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    display: 'inline-block',
    borderRadius: 5,
  },
  card: {
    flexBasis: '100%',
    marginBottom: theme.spacing.unit * 3,
    borderRadius: 5,
  },
});

class ExchangePaper extends Component {
  render() {
    const {classes} = this.props;
    const exchange = this.props.exchange;
    const name = exchange.name;
    const notes = exchange.notes;
    const hasNotes = notes.length ? true : false;
    const statusCount = exchange.statusCount;

    const cardContent = hasNotes
      ? <CardContent>
          <Typography component="p">
            {notes}
          </Typography>
        </CardContent>
      : null;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {name}
            </Avatar>
          }
          title={name}
          subheader={statusCount + ' recent updates'}
        />
        {cardContent}
      </Card>
    );
  }
}

export default withStyles(styles)(ExchangePaper);
