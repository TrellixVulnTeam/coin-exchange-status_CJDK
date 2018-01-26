// @format

import React, {Component} from 'react';
import {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';

class ExchangeCardCollapseContent extends Component {
  render() {
    let posts = this.props.posts;
    let postsSummaries = [];

    for (const post in posts) {
      postsSummaries.push(posts[post].details);
    }

    return (
      <CardContent>
        {postsSummaries}
      </CardContent>
    );
  }
}

export default ExchangeCardCollapseContent;
