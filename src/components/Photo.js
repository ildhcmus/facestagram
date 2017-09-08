import React from 'react';
import { Link } from 'react-router-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const Photo = (props) => {
  const { post } = props;
  return (
    <figure className="grid-figure">
      <div className="grid-photo-wrap">
        <Link to={`/view/${post.id}`}>
          <img src={post.images[1].source} alt={post.name || ''} className="grid-photo" />
        </Link>

        <CSSTransitionGroup transitionName="like" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          <span key={post.likes.summary.total_count} className="likes-heart">{post.likes.summary.total_count}</span>
        </CSSTransitionGroup>

      </div>

      <figcaption>
        <p>{post.caption}</p>
        <div className="control-buttons">
          <button onClick={() => {}} className="likes">&hearts; {post.likes.summary.total_count}</button>
          <Link className="button" to={`/view/${post.id}`}>
            <span className="comment-count">
              <span className="speech-bubble"></span>
              {post.comments.summary.total_count ? post.comments.summary.total_count : 0 }
            </span>
          </Link>
        </div>
      </figcaption>

    </figure>
  );
}

export default Photo;