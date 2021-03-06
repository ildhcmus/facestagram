import React from 'react';

export default class FacebookLogin extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    (function (d, s, id) {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = () => {
      window.FB.init({
        appId: this.props.socialId,
        xfbml: this.props.xfbml,
        cookie: this.props.cookie,
        version: this.props.version,
      });
    };
  }

  responseApi (authResponse) {
    window.FB.api('/me', { fields: this.props.fields }, (me) => {
      me.accessToken = authResponse.accessToken;
      this.props.responseHandler(me);
    });
  };

  checkLoginState (response) {
    if (response.authResponse) {
      this.responseApi(response.authResponse);
    } else {
      if (this.props.responseHandler) {
        this.props.responseHandler({ status: response.status });
      }
    }
  };

  handleClickLogin () {
    window.FB.getLoginStatus((response) => {
      if (response.status !== 'connected') {
        window.FB.login(this.checkLoginState.bind(this), { scope: this.props.scope });
      } else {
        this.checkLoginState(response);
      }
    });
  };

  render() {
    const {
      socialId, xfbml, cookie, version, language, fields, responseHandler,
      children, buttonText, ...props
    } = this.props;

    return (
      <div >
        <button 
          {...props} 
          onClick={this.handleClickLogin.bind(this)}
        >
          {children}
          {buttonText}
        </button>
        {/* <div className="fb-login-button" 
          data-max-rows="1" 
          data-size="large" 
          data-button-type="continue_with" 
          data-show-faces="false" 
          data-auto-logout-link="false" 
          data-use-continue-as="false">
        </div> */}
      </div>
      
    );
  }
}