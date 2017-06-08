import React from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends React.Component {
  render() {
    return (
      <nav>
        <Link to='/'>Homepage</Link>
        <Link to='/admin'>Dashboard</Link>
        <Link to='/admin/events'>Events</Link>
        <Link to='/admin/rules'>Rules</Link>
        <Link to='/admin/characters'>Characters</Link>
      </nav>
    );
  }
}
