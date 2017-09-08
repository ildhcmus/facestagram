// increment
export function increment(index) {
  return {
    type: 'INCREMENT_LIKES',
    index
  }
}

// add comment
export function addComment(postId, author, comment) {
  return {
    type: 'ADD_COMMENT',
    postId,
    author,
    comment
  }
}

// remove comment
export function removeComment(postId, i) {
  return {
    type: 'REMOVE_COMMENT',
    i,
    postId
  }
}


export function setUser(user) {
  return {
    type: 'SET_USER',
    user
  }
}

export function unsetUser(user) {
  return {
    type: 'UNSET_USER'
  }
}

export function storePosts(posts) {
  return {
    type: 'STORE_POSTS',
    posts
  }
}