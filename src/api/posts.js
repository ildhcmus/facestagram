import client from './client';
import store from './../configure/store';
import * as actionCreators from './../actions/actionCreators';

const posts = {};

posts.fetchPosts = async() => {
  const accessToken = localStorage.getItem("accessToken");

  const fields = "name,link,comments.summary(1),likes.summary(1),images",
    type = "uploaded";
  const result = await client.getPhotos(fields, type, accessToken);

  store.dispatch(actionCreators.storePosts(result));
}

posts.deleteComment = async(commentId) => {
  const accessToken = localStorage.getItem("accessToken");
  const result = await client.deleteComment(commentId, accessToken);
  console.log(result);
}
export default posts;