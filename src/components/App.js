// import logo from './../assets/images/logo.svg';
// import './App.css';
import { connect } from 'react-redux';
import Main from './Main';
import { bindActionCreators } from 'redux';
import * as actionCreators from './../actions/actionCreators';

function mapStateToProps(state) {
  return {
    posts: state.posts,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);
export default App;
