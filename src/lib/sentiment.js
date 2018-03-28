// @format

const getFillColorFromScore = (d3, score) => {
  if (typeof d3.interpolateRdYlGn !== 'function') {
    throw D3Exception(d3);
  }

  if (score < 0 || score > 1) {
    throw ScoreRangeException();
  }

  /*
   * interpolatedRdYlGn(t) - pass it a number [0,1] and it
   * returns an rgb value (string) from the RdYlGn diverging
   * color scheme.
   */
  return d3.interpolateRdYlGn(score);
};

const getLinearGradient = () => {
  return 'linear-gradient(#fff, #fff)';
};

const D3Exception = obj => {
  return `Expected ${obj} to implement interpolateRdYlGn but it does not. Make sure you're passing an instance of D3`;
};

const ScoreRangeException = score => {
  return (
    'The value of score passed to getFillColorFromScore was expected to be gte 0 and lte1 but it was ' +
    score
  );
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
  getFillColorFromScore,
  getMappedScore,
  magnitudeAdjustedScore,
  mappedAndAdjustedScore,
  getLinearGradient,
};
