import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PhotoGrid from './PhotoGrid';

class Main extends Component {
  componentWillMount() {
    console.log(this.props)
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <h1>
          <Link to="/home">Facestagram</Link>
        </h1>
        <PhotoGrid posts={this.props.posts} />
      </div>
    );
  }
}

export default Main;