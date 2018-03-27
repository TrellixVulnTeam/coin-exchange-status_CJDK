// @format

import React, {Component} from 'react';
import Typography from 'material-ui/Typography';

class Sentiment extends Component {
  render() {
    const {sentiment} = this.props;
    const score = sentiment ? sentiment.score : 'no score';
    const magnitude = sentiment ? sentiment.magnitude : 'no mag';
    return (
      <div>
        <Typography paragraph>Sentiment:</Typography>
        <Typography paragraph>score: {score}</Typography>
        <Typography paragraph>magnitude: {magnitude}</Typography>
      </div>
    );
  }
}

export default Sentiment;
