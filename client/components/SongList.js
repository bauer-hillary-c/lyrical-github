import React, { Component } from 'react';
import gql from 'graphql-tag';

class SongLlist extends Component {
  render() {
    return (
      <div>
        Song List
      </div>
    );
  }
}

const query = gql`
  {
    songs {
      title
    }
  }
`;

export default SongList;
