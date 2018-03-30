// @format
import red from 'material-ui/colors/red';
import green from 'material-ui/colors/green';
import yellow from 'material-ui/colors/yellow';

const getStatusColorFromScore = score => {
  if (score < 0.35) return red[300];
  if (score < 0.7) return yellow[300];
  if (score >= 0.7) return green[300];
};

/* 
 * Maps a a number from one range to another 
 *
 * This is used b/c the sentiment analysis scores come back as a number [-1, 1] and
 * the d3.interpolateRdYlGn() takes a number [0, 1] so to get a meaningful color we 
 * need to map the value in the former to the latter.
*/
const getMappedScore = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

// 0 worst, 1 best
const magnitudeAdjustedScore = (score, magnitude) => {
  if (score < 0.5) {
    // magnitude pulls it closer to 0
    if (magnitude < 2) return score - 0.025;
    if (magnitude < 5) return score - 0.05;
    if (magnitude < 10) return score - 0.1;
    if (magnitude > 10) return score - 0.15;
  } else {
    // magnitude pulls it closer to 1
    if (magnitude < 2) return score + 0.025;
    if (magnitude < 5) return score + 0.05;
    if (magnitude < 10) return score + 0.1;
    if (magnitude > 10) return score + 0.15;
  }
};

// Takes a sentiment value as returned from gcloud's nlp sentiment
// analysis endpoint and turns it into a meaningful value for the UI
const mappedAndAdjustedScore = sentiment => {
  const {score, magnitude} = sentiment;
  const mappedScore = getMappedScore(score, -1, 1, 0, 1);
  const magAdjustedScore = magnitudeAdjustedScore(mappedScore, magnitude);
  return magAdjustedScore;
};

export {
  getStatusColorFromScore,
  getMappedScore,
  magnitudeAdjustedScore,
  mappedAndAdjustedScore,
};
