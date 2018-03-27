// @format

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import * as d3 from 'd3';

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
    const {score, magnitude} = nextProps.sentiment;
    const mappedScore = this.getMappedScore(score, -1, 1, 0, 1);
    const magnitudeAdjustedScore = this.adjustScoreForMagnitude(mappedScore, magnitude);
    this.setState({score: magnitudeAdjustedScore}, () => {
      this.doTheD3Thang(this.state.score);
    });
  };

  doTheD3Thang = (score) => {
    const arcs = [
      {
	startAngle: 0 * (Math.PI / 180),
	endAngle: 360 * (Math.PI / 180),
	outerRadius: 50,
	innerRadius: 47,
	cornerRadius: 0,
	fill: this.getFillColorFromScore(d3, score)
      },
      {
	startAngle: 0 * (Math.PI / 180),
	endAngle: 360 * (Math.PI / 180),
	outerRadius: 50,
	innerRadius: 47,
	cornerRadius: 0,
	fill: 'rgba(0, 0, 0, 0.125)'
      }
    ];
    
    this.drawArcsIn(this.sentimeter, arcs);  // this.sentimeter is a ref to our div in the render method setup for svg content
  };

  getFillColorFromScore = (d3, score) => {
    /*
     * interpolatedRdYlGn(t) - pass it a number [0,1] and it will return an
     * rgb value (string) from the RdYlGn diverging color scheme.
     */
    return d3.interpolateRdYlGn(score);
  };
  
  /* 
   * Maps a a number from one range to another 
   *
   * This is used b/c the sentiment analysis scores come back as a number [-1, 1] and
   * the d3.interpolateRdYlGn() takes a number [0, 1] so to get a meaningful color we 
   * need to map the value in the former to the latter.
  */
  getMappedScore = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  // 0 worst, 1 best
  adjustScoreForMagnitude = (score, magnitude) => {
    if (score < 0.5) {
      // magnitude pulls it closer to 0
      if (magnitude < 2)  return score - 0.025;
      if (magnitude < 5)  return score - 0.05;
      if (magnitude < 10) return score - 0.1;
      if (magnitude > 10) return score - 0.15
    } else {      
      // magnitude pulls it closer to 1
      if (magnitude < 2)  return score + 0.025;
      if (magnitude < 5)  return score + 0.05;
      if (magnitude < 10) return score + 0.1;
      if (magnitude > 10) return score + 0.15
    }
  }

  value2Percent = value => {
    return Math.round(value * 100);
  }

  drawArcsIn = (el, arcs) => {
    // target is the svg element
    let target = d3.select(el).append('svg');

    arcs.forEach(arc => {
      let d3arc = d3.arc()
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
    const percent = this.value2Percent(score);
    return (
      <div
        ref={ref => {
          this.sentimeter = ref;
        }}
        className={classes.sentimeter}
      >
        <Typography component="span" variant="title" className={classes.sentimeterScore}>{percent}</Typography>
      </div>
    );
  };
};

Sentimeter.propTypes = {
  sentiment: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sentimeter);
