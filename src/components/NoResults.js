// @format

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';

class NoResults extends Component {
  componentWillReceiveProps = nextProps => {
    console.log(nextProps);
  };

  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant="body1">
            {this.props.noContentMessage}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

NoResults.propTypes = {
  noContentMessage: PropTypes.string.isRequired,
};

export default NoResults;
