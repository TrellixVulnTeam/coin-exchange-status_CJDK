// @format

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import classnames from 'classnames';
import Card, {CardHeader, CardContent, CardActions} from 'material-ui/Card';
import ExchangeCardCollapseContent from './ExchangeCardCollapseContent';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

const styles = theme => ({
  card: {
    flexBasis: '100%',
    marginBottom: theme.spacing.unit * 3,
    borderRadius: 5,
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

class ExchangeCard extends Component {
  state = {
    expanded: false,
  };

  handleExpandClick = () => {
    this.setState({expanded: !this.state.expanded});
  };

  render() {
    const {classes} = this.props;
    const exchange = this.props.exchange;
    const name = exchange.name;
    const summary = exchange.summary || '';
    const hasSummary = summary.length ? true : false;
    const postsCount = exchange.postsCount;

    const cardHeader = (
      <CardHeader
        avatar={
          <Avatar aria-label="Avatar">
            {name}
          </Avatar>
        }
        title={name}
        subheader={postsCount + ' recent updates'}
      />
    );

    const cardContent = hasSummary
      ? <CardContent>
          <Typography component="p">
            {summary}
          </Typography>
        </CardContent>
      : null;

    const cardActions =
      postsCount > 0
        ? <CardActions className={classes.actions} disableActionSpacing>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more">
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        : null;

    return (
      <Card className={classes.card}>
        {cardHeader}
        {cardContent}
        {cardActions}
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <ExchangeCardCollapseContent exchangeKey={this.props.exchange.key} />
        </Collapse>
      </Card>
    );
  }
}

export default withStyles(styles)(ExchangeCard);
