import axios from 'axios';

const BASE_URL = 'https://graph.facebook.com';
const facebookAPI = {};

const callAPI = async(method, baseURL, url, params, body = {}) => {
  const config = {
    method: method,
    url: url,
    baseURL: baseURL,
    params: params
  };
  if (method === 'post') {
    config.body = body;
  }

  return await axios(config)
  .then(response => {
    if (method !== 'get') return response;
    return response.data;
  })
  .catch(err => {
    console.log(err)
  });
}

facebookAPI.getPhotoUrlByPhotoId = (id, access_token) => {
  const url = 'facebook/picture';
  const params = {
    id:
    access_token
  }
  return callAPI('get', BASE_URL, url, params);
}

//?fields=name,link,comments,picture&type=uploaded
facebookAPI.getPhotos = (fields, type, access_token) => {
  const url = '/v2.10/me/photos';
  const params = {
    fields,
    type,
    access_token
  }
  return callAPI('get', BASE_URL, url, params);
}

facebookAPI.deleteComment = (commentId, access_token) => {
  const url = '/v2.10/' + commentId;
  const params = {
    access_token
  };
  return callAPI('delete', BASE_URL, url, params);
}

facebookAPI.replyComment = (postId, messages, access_token) => {
  const url = `/v2.10/${postId}/comments`;
  const params = {
    access_token
  },
  body = {
    messages
  };
  return callAPI('post', BASE_URL, url, params, body);
}
export default facebookAPI;