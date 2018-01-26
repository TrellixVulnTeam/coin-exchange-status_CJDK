// @format

import React, {Component} from 'react';
import {CardContent} from 'material-ui/Card';
import Post from './Post';

class Posts extends Component {
  render() {
    const posts = Object.values(this.props.posts); // posts come in as an object of objects, makes them an array

    return (
      <CardContent>
        {posts.map(post => {
          return <Post post={post} key={Math.random()} />;
        })}
      </CardContent>
    );
  }
}

export default Posts;
