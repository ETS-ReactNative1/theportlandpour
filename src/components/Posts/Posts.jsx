/**
 * @file Posts component
 * @description List of posts
 * @author tm
 * @copyright Inspec Digital, LLC
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Post } from 'components';
import { find } from 'lodash';

const propTypes = {
  posts: PropTypes.array,
  tags: PropTypes.array,
  users: PropTypes.array
};

const defaultProps = {
  posts: [],
  tags: [],
  users: []
};

const styles = theme => ({
  headline: {
    flexGrow: 1
  },
  paper: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-around'
  },
  tags: {
    verticalAlign: 'bottom'
  },
  title: {
    display: 'flex',
    padding: '24px'
  }
});

const Posts = props => {

  const { classes, posts, tags, users } = props;

  return (
    <div className={classes.posts}>
      <div className={classes.paper}>
        {posts.map(post => {
          return (
            <Post post={post} user={find(users, { id: post.author })} key={post.id} />
          );
        })}
      </div>
    </div>
  );

}

Posts.propTypes = propTypes;
Posts.defaultProps = defaultProps;

export default withStyles(styles)(Posts);
