import React from 'react';
import posts from './../api/posts';

class Comments extends React.Component {

  handleRemoveCommentClick = (comment, i) => {
    posts.deleteComment(comment.id);
    this.props.removeComment.bind(null, this.props.match.params.postId, i);
  }

  renderComment = (comment, i) => (
    <div className="comment" key={`comment_${i}`}>
      <p>
        <strong>{comment.from.name}</strong>
        {comment.message}
        <button className="remove-comment" onClick={this.handleRemoveCommentClick.bind(this, comment, i)}>&times;</button>
      </p>
    </div>
  );

  handleSubmit = (e) => {
    e.preventDefault();
    const { postId } = this.props.match.params;
    const author = this.refs.author.value;
    const comment = this.refs.comment.value;
    this.props.addComment(postId, author, comment);
    this.refs.commentForm.reset();
  };

  render() {
    console.log(this.props.postComments);

    return (
      <div className="comments">
        {this.props.postComments.map(this.renderComment)}
        <form ref="commentForm" className="comment-form" onSubmit={this.handleSubmit}>
          <input type="text" ref="author" placeholder="author"/>
          <input type="text" ref="comment" placeholder="comment"/>
          <input type="submit" hidden />
        </form>
      </div>
    );
  }
}

export default Comments;