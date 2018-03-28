// @format

import React, {Component} from 'react';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classnames from 'classnames';
import Card, {CardHeader, CardContent, CardActions} from 'material-ui/Card';
import ExchangeCardAvatar from './exchange_card/Avatar';
import Posts from './exchange_card/Posts';
import Collapse from 'material-ui/transitions/Collapse';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui-icons/Favorite';
import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import {CircularProgress} from 'material-ui/Progress';
import fire from '../fire';
import localStorage from '../lib/localStorage';
import AppSnackbar from './AppSnackbar';
import * as d3 from 'd3';
import {
  getFillColorFromScore,
  mappedAndAdjustedScore,
  getLinearGradient,
} from '../lib/sentiment';
import {value2Percent} from '../lib/utils';

const styles = theme => ({
  card: {
    position: 'relative',
    flexBasis: '100%',
    marginBottom: theme.spacing.unit * 3,
  },
  summary: {
    paddingLeft: theme.spacing.unit * 7,
  },
  actions: {
    display: 'flex',
    borderTop: '1px solid rgba(0, 0, 0, 0.025)',
    background: 'rgba(0, 0, 0, 0.025)',
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
      favorite: this.isFavorite(),
      posts: null,
      snackbarMessage: '',
      score: 0,
      fillColor: 'rgba(255, 255, 255, 0)',
    };
  }

  componentDidMount() {
    const twitterUsername = Object.values(this.props.exchange)[0]['twitter'];
    let db = fire.database();
    let sentimentsRef = db.ref(`sentiments/${twitterUsername}`);
    sentimentsRef.on('value', snapshot => {
      const sentiment = snapshot.val();
      const score = mappedAndAdjustedScore(sentiment);
      const fillColor = getFillColorFromScore(d3, score);
      this.setState({fillColor});
      this.setState({score: score});
    });
  }

  isFavorite = () => {
    const favs = localStorage.getFavorites() || [];
    return favs.includes(Object.keys(this.props.exchange)[0]) || false;
  };

  handleFavoriteClick = () => {
    this.setState({favorite: !this.state.favorite}, () => {
      this.state.favorite ? this.handleFavorited() : this.handleUnfavorited();
    });
  };

  handleFavorited = () => {
    const key = Object.keys(this.props.exchange)[0];
    localStorage.setFavorite(key);
    const msg = `Favorited ${this.props.exchange[key].name}`;
    this.setState({snackbarMessage: msg});
    ReactGA.event({
      category: 'Favorites',
      action: 'favorited',
      label: `${key}`,
    });
  };

  handleUnfavorited = () => {
    const key = Object.keys(this.props.exchange)[0];
    localStorage.removeFavorite(key);
    const msg = `Unfavorited ${this.props.exchange[key].name}`;
    this.setState({snackbarMessage: msg}, () => {
      const handler = this.props.favoritesDidUpdateHandler;
      if (handler) {
        handler();
      }
    });
    ReactGA.event({
      category: 'Favorites',
      action: 'unfavorited',
      label: `${key}`,
    });
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
    const key = Object.keys(this.props.exchange)[0];

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
    ReactGA.event({
      category: 'Exchange Card',
      action: 'Card Expanded',
      label: `${exchangeKey}`,
    });
  };

  handleWillClose = () => {
    this.setState({expanded: !this.state.expanded});
    const exchangeKey = Object.keys(this.props.exchange)[0];
    ReactGA.event({
      category: 'Exchange Card',
      action: 'Card Closed',
      label: `${exchangeKey}`,
    });
  };

  handleSnackbarClose = () => {
    this.setState({snackbarMessage: ''});
  };

  postsCountMessage = count => {
    switch (count) {
      case 0:
        return 'No updates yet';
      case 1:
        return `${count} recent update`;
      default:
        return `${count} recent updates`;
    }
  };

  subheaderMessage = score => {
    return `Sentiment: ${value2Percent(score)}/100`;
  };

  render() {
    const {classes} = this.props;
    const exchange = this.props.exchange;
    const key = Object.keys(exchange)[0];
    const name = exchange[key].name;
    const postsCount = exchange[key].postsCount;
    const {score} = this.state;
    let exchangeCardAvatar = <ExchangeCardAvatar name={name} score={score} />;

    const cardHeader = (
      <CardHeader
        avatar={exchangeCardAvatar}
        title={name}
        subheader={this.subheaderMessage(score)}
      />
    );

    const cardContent = true ? (
      <CardContent>
        <Typography paragraph className={classes.summary}>
          add summary message here...
        </Typography>
      </CardContent>
    ) : null;

    let cardActionIcon = this.state.isLoading ? (
      <CircularProgress className={classes.progress} />
    ) : (
      <ExpandMoreIcon />
    );

    let favoriteIcon = this.state.favorite ? (
      <FavoriteIcon />
    ) : (
      <FavoriteBorderIcon />
    );

    let showAllSpan = (
      <Typography
        component="span"
        type="caption"
        className={classes.showAllSpan}>
        {!this.state.expanded ? 'Show all posts' : ''}
      </Typography>
    );

    let snackbar = this.state.snackbarMessage.length ? (
      <AppSnackbar
        message={this.state.snackbarMessage}
        handleCloseCallback={this.handleSnackbarClose}
      />
    ) : null;

    const cardActions =
      postsCount > 0 ? (
        <CardActions className={classes.actions}>
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
      ) : (
        <CardActions className={classes.actions}>
          <IconButton
            onClick={this.handleFavoriteClick}
            aria-label="Add to favorites">
            {favoriteIcon}
          </IconButton>
        </CardActions>
      );

    return (
      <Card
        className={classes.card}
        style={{
          background: getLinearGradient(),
        }}>
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

ExchangeCard.propTypes = {
  favoritesDidUpdateHandler: PropTypes.func.isRequired,
};

export default withStyles(styles)(ExchangeCard);
