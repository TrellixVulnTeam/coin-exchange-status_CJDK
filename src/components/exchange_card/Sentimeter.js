// @format

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import * as d3 from 'd3';
import {value2Percent} from '../../lib/utils';

const styles = theme => ({
  sentimeter: {
    position: 'absolute',
    display: 'flex',
    top: `${theme.spacing.unit * 2}px`,
    right: `${theme.spacing.unit * 2}px`,
    width: '100px',
    height: '100px',
  },
  sentimeterScore: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
  },
});

class Sentimeter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.score === this.props.score) {
      return;
    }
    this.setState({score: nextProps.score}, () => {
      this.doTheD3Thang(this.state.score);
    });
  };

  doTheD3Thang = score => {
    const arcs = [
      {
        startAngle: 0 * (Math.PI / 180),
        endAngle: 360 * (Math.PI / 180),
        outerRadius: 50,
        innerRadius: 47,
        cornerRadius: 0,
        fill: this.props.fillColor,
      },
      {
        startAngle: 0 * (Math.PI / 180),
        endAngle: 360 * (Math.PI / 180),
        outerRadius: 50,
        innerRadius: 47,
        cornerRadius: 0,
        fill: 'rgba(0, 0, 0, 0.125)',
      },
    ];

    this.drawArcsIn(this.sentimeter, arcs); // this.sentimeter is a ref to our div in the render method setup for svg content
  };

  drawArcsIn = (el, arcs) => {
    // target is the svg element
    let target = d3.select(el).append('svg');

    arcs.forEach(arc => {
      let d3arc = d3
        .arc()
        .innerRadius(arc.innerRadius)
        .outerRadius(arc.outerRadius)
        .cornerRadius(arc.cornerRadius)
        .startAngle(arc.startAngle)
        .endAngle(arc.endAngle)();

      target
        .attr('width', 100)
        .attr('height', 100)
        .append('path')
        .attr('d', d3arc)
        .attr('fill', arc.fill)
        .attr('transform', 'translate(50, 50)');
      target
        .append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 50)
        .attr('fill', arc.fill)
        .attr('transform', 'translate(50, 50)');
    });
  };

  render() {
    const {classes} = this.props;
    const score = this.state.score;
    const percent = value2Percent(score);
    return (
      <div
        ref={ref => {
          this.sentimeter = ref;
        }}
        className={classes.sentimeter}>
        <Typography
          component="span"
          variant="title"
          className={classes.sentimeterScore}>
          {percent}
        </Typography>
      </div>
    );
  }
}

Sentimeter.propTypes = {
  score: PropTypes.number.isRequired,
  fillColor: PropTypes.string.isRequired,
};

export default withStyles(styles)(Sentimeter);
