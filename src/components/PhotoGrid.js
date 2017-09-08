import React from 'react';
import Photo from './Photo';

const PhotoGrid = (props) => {
  return (
    <div className="photo-grid">
      {!!props.posts.data ? props.posts.data.map((post, i) =>
        <Photo 
          key={`photo_${i}`}
          i={i}
          {...props}
          post={post}
        />
      ) : null}
    </div>
  )
};

export default PhotoGrid;