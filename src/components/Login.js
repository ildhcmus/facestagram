import React from 'react';
import FacebookLogin from './FacebookLogin';
import posts from './../api/posts';
import store from './../configure/store';
import * as actionCreators from './../actions/actionCreators';

class Login extends React.Component{

  constructor (props, context) {
    super(props, context);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  responseFacebook (response) {
    console.log(response);
    //anything else you want to do(save to localStorage)...
    if (typeof(Storage) !== "undefined") {
      // Code for localStorage/sessionStorage.
      const user = {
        id: response.id,
        name: response.name,
        email: response.email,
        picture: response.picture.data.url,
        accessToken: response.accessToken
      };
      localStorage.setItem("id", response.id);
      localStorage.setItem("accessToken", response.accessToken);
      store.dispatch(actionCreators.setUser(user));
      posts.fetchPosts();
      // Redirect to home page
      this.props.history.push("/home");
    } else {
        // Sorry! No Web Storage support..
        alert("Your browser doesn't support localStorage/sessionStorage");
    }
  }

  render () {
    return (
      <div className="login-page">
        <h1 className="title">Welcome to Facestagram</h1>
        <p className="sub-description">Connect to Facebook account to see your photo moments</p>
        <div className="login-button">
          <FacebookLogin 
            socialId="<YOUR_APP_ID>"
            language="en_US"
            scope="public_profile,email,user_photos,publish_actions"
            responseHandler={this.responseFacebook}
            xfbml={true}
            fields="id,email,name,picture"
            version="v2.5"
            className="fb-login-button"
            buttonText="Login With Facebook"/>
        </div>
      </div>
    );
  }
}

export default Login;