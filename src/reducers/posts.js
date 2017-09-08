function posts(state = {}, action) {
  switch(action.type) {
    case 'STORE_POSTS': 
      console.log('STORE_POSTS');
      return !!action.posts ? action.posts : {};
    case 'REMOVE_COMMENT': 
      console.log('REMOVE_COMMENT');
      let { postId, i } = action;
      const posts = state;
      for (let index = 0; index < posts.data.length; index++) {
        if (posts.data[index].id == postId) {
          const comments = [...posts.data[index].comments.data.slice(0, i),...posts.data[index].comments.data.slice(i+1)];
          posts.data[index].comments.data = comments;
          return posts;
        }
      }
    default:
      return state;
  }
}
export default posts;
