import React from 'react';
import Photo from './Photo';
import Comments from './Comments';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './../actions/actionCreators';

function mapStateToProps(state) {
  return {
    posts: state.posts,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const Single = (props) => {

  const { postId } = props.match.params;
  const { posts } = props;
  const index = posts.data.findIndex((post) => post.id === postId);
  const post = posts.data[index];
  const postComments = posts.data[index].comments.data || [];

  return(
    <div className="single-photo">
      <Photo 
        i={index}
        post={post}
        {...props} />
      <Comments
        postComments={postComments}
        {...props}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Single);