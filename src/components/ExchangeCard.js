// @format

import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import classnames from 'classnames';
import Card, {CardHeader, CardContent, CardActions} from 'material-ui/Card';
import Posts from './exchange_card/Posts';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui-icons/Favorite';
import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import {CircularProgress} from 'material-ui/Progress';
import fire from '../fire';
import localStorage from '../lib/localStorage';
import AppSnackbar from './AppSnackbar';

const styles = theme => ({
  card: {
    flexBasis: '100%',
    marginBottom: theme.spacing.unit * 3,
    borderRadius: 5,
  },
  actions: {
    display: 'flex',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
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
  progress: {
    color: 'rgba(0, 0, 0)',
    margin: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px 0`,
  },
  showAllSpan: {
    flex: '1 0 auto',
    textAlign: 'right',
  },
});

class ExchangeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      isLoading: false,
      favorite: JSON.parse(
        localStorage.getFavorites().includes(this.props.exchange.key),
      ),
      posts: null,
      snackbarMessage: '',
    };
  }

  handleFavoriteClick = () => {
    this.setState({favorite: !this.state.favorite}, () => {
      this.state.favorite ? this.handleFavorited() : this.handleUnfavorited();
    });
  };

  handleFavorited = () => {
    localStorage.setFavorite(this.props.exchange.key);
    this.setState({snackbarMessage: `Favorited ${this.props.exchange.name}`});
  };

  handleUnfavorited = () => {
    localStorage.removeFavorite(this.props.exchange.key);
    this.setState({snackbarMessage: `Unfavorited ${this.props.exchange.name}`});
  };

  handleExpandClick = () => {
    /*
     * The expanded state of this card is for showing its posts.
     * The posts are not yet loaded, they need to be fetched from the server.
     * Waiting to fetch them while the expanded card's component is rendering
     * causes the expansion transition to 'jump' into place when it displays the posts.
     * It's computing the markup and figuring out content and height on the fly
     * while it's animating, so it makes sense this might not work out.
     *
     * if the handleExpandClick results in card expansion, we can initiate the fetch
     * for the posts, defer setting the state until the fetch returns (hold off on
     * transitioning), and then pass the posts to the child component for rendering.
     * 
     * This is just a theory, need to prove or disprove if this helps. tbc...
     *
     */

    const willExpand = !this.state.expanded;
    const key = this.props.exchange.key;

    willExpand ? this.handleWillExpand(key) : this.handleWillClose();
  };

  handleWillExpand = exchangeKey => {
    this.setState({isLoading: true});
    const exchangePostsRef = fire.database().ref('posts');
    exchangePostsRef
      .orderByChild('exchangeKey')
      .equalTo(exchangeKey)
      .once('value', snapshot => {
        this.setState({posts: snapshot.val()});
        this.setState({expanded: !this.state.expanded});
        this.setState({isLoading: false});
      });
  };

  handleWillClose = () => {
    this.setState({expanded: !this.state.expanded});
  };

  handleSnackbarClose = () => {
    this.setState({snackbarMessage: ''});
  };

  postsCountMessage = count => {
    switch (count) {
      case 0:
        return 'No updates yet. Post one now!';
      case 1:
        return `${count} recent update`;
      default:
        return `${count} recent updates`;
    }
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
        subheader={this.postsCountMessage(postsCount)}
      />
    );

    const cardContent = hasSummary
      ? <CardContent>
          <Typography component="p">
            {summary}
          </Typography>
        </CardContent>
      : null;

    let cardActionIcon = this.state.isLoading
      ? <CircularProgress className={classes.progress} />
      : <ExpandMoreIcon />;

    let favoriteIcon = this.state.favorite
      ? <FavoriteIcon />
      : <FavoriteBorderIcon />;

    let showAllSpan = (
      <Typography
        component="span"
        type="caption"
        className={classes.showAllSpan}>
        {!this.state.expanded ? 'Show all posts' : ''}
      </Typography>
    );

    let snackbar = this.state.snackbarMessage.length
      ? <AppSnackbar
          message={this.state.snackbarMessage}
          handleCloseCallback={this.handleSnackbarClose}
        />
      : null;

    const cardActions =
      postsCount > 0
        ? <CardActions className={classes.actions}>
            <IconButton
              onClick={this.handleFavoriteClick}
              aria-label="Add to favorites">
              {favoriteIcon}
            </IconButton>
            {showAllSpan}
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show all posts">
              {cardActionIcon}
            </IconButton>
          </CardActions>
        : <CardActions className={classes.actions}>
            <IconButton
              onClick={this.handleFavoriteClick}
              aria-label="Add to favorites">
              {favoriteIcon}
            </IconButton>
          </CardActions>;

    return (
      <Card className={classes.card}>
        {cardHeader}
        {cardContent}
        {cardActions}
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <Posts posts={this.state.posts} />
        </Collapse>
        {snackbar}
      </Card>
    );
  }
}

export default withStyles(styles)(ExchangeCard);
