// @format

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Card, {CardHeader, CardContent} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';

const styles = theme => ({
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
    const summary = exchange.summary || '';
    const hasSummary = summary.length ? true : false;
    const postsCount = exchange.postsCount;

    const cardContent = hasSummary
      ? <CardContent>
          <Typography component="p">
            {summary}
          </Typography>
        </CardContent>
      : null;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Avatar">
              {name}
            </Avatar>
          }
          title={name}
          subheader={postsCount + ' recent updates'}
        />
        {cardContent}
      </Card>
    );
  }
}

export default withStyles(styles)(ExchangePaper);
