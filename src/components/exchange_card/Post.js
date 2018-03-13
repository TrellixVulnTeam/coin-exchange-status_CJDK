// @format

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import TimeAgo from 'react-timeago';

const styles = theme => ({
  postContainer: {
    paddingTop: theme.spacing.unit * 2,
    borderBottom: '1px solid rgba(0, 0, 0, 0.035)',
  },
  ul: {
    display: 'flex',
    listStyleType: 'none',
    paddingLeft: 0,
  },
  li: {
    flexBasis: '33%',
    flexShrink: 0,
  },
  span: {
    display: 'flex',
    flexBasis: '100%',
    justifyContent: 'flex-start',
  },
  notes: {
    paddingTop: theme.spacing.unit * 2,
  },
});

class Post extends Component {
  render() {
    const classes = this.props.classes;
    const post = this.props.post;

    return (
      <div className={classes.postContainer}>
        <Typography component="ul" className={classes.ul} color="secondary">
          <li className={classes.li}>
            <Typography component="span" variant="body2" className={classes.span}>
	      market:
	    </Typography>
            <Typography component="span" variant="body1" className={classes.span}>
              {post.market || 'n/a'}
            </Typography>
          </li>
          <li className={classes.li}>
            <Typography component="span" variant="body2" className={classes.span}>
	      regarding:
	    </Typography>
            <Typography component="span" variant="body1" className={classes.span}>
              {post.type}
            </Typography>
          </li>
          <li className={classes.li}>
            <Typography component="span" variant="body2" className={classes.span}>
	      delay:
	    </Typography>
            <Typography component="span" variant="body1" className={classes.span}>
              {post.delay}
            </Typography>
          </li>
        </Typography>
        <Typography
          component="span"
	  variant="body2"
          className={classes.notes}>
          notes:
        </Typography>
        <Typography paragraph variant="body1">
          {post.details}
        </Typography>
        <Typography paragraph variant="caption" align="right">
          <TimeAgo date={post.createdAt} />
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Post);
