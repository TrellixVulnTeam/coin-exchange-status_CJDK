// @format

import React, {Component} from 'react';
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';

class NoResults extends Component {
  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant="body1">No results found</Typography>
        </CardContent>
      </Card>
    );
  }
}

NoResults.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default NoResults;
