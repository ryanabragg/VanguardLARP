import React from 'react';
import { Link } from 'react-router-dom';

export default class AdminDashboard extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/admin/events'>Events</Link>
          <Link to='/admin/rules'>Rules</Link>
          <Link to='/admin/characters'>Characters</Link>
        </nav>
        {this.props.children}
      </div>
    );
  }
}
