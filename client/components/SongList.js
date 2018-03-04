import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import songListQuery from '../queries/fetchSongs.js';

class SongList extends Component {
  onSongDelete(id) {
    this.props.mutate({
      variables: { id },
      refetchQueries: [{ query: songListQuery }]
    });
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          {title}
          <i
            className="material-icons right"
            onClick={() => this.onSongDelete(id)}
          >
            delete
          </i>
        </li>
      );
    })
  }

  render() {
    if (this.props.data.loading) { return <div>Loading</div> }
    return (
      <div>
        <ul className="collection">
          {this.renderSongs()}
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const deleteSongMutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      title
    }
  }
`;

export default graphql(deleteSongMutation)(
  graphql(songListQuery)(SongList)
)
