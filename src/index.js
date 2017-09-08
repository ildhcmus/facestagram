import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
// import { ConnectedRouter } from 'react-router-redux';

// Import css
// import css from './assets/styles/style.styl';

// Import components
import App from './components/App';
import Single from './components/Single';
import Login from './components/Login';
// Import react router deps
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './configure/store';
// import history from './configure/history';

const router = (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route path="/home" component={App}></Route>
        <Route path="/view/:postId" component={Single}></Route>
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
