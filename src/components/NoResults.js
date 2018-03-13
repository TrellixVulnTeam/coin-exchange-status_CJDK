// @format

import React, {Component} from 'react';
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';

class NoResults extends Component {
  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant="body1">
            No results found for <i>{this.props.searchTerm}</i>
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default NoResults;
