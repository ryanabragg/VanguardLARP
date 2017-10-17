import React from 'react';

import Stone from './Stone';

const Crafting = (props) => {
  return (
    <div {...props}>
      <div>
        <span>Copper</span>
        <span>Silver</span>
        <span>Iron</span>
        <span>Steel</span>
        <span>Mithril</span>
        <span>Adamite</span>
      </div>
      <div>
        <span>Apprentice</span>
        <span>Journeyman</span>
        <span>Craftsman</span>
        <span>Master</span>
        <span>Master</span>
        <span>Master</span>
      </div>
      <div>
        <span>
          <Stone color='black' />
          <Stone color='red' />
          <Stone color='red' />
          <Stone color='white' />
          <Stone color='white' />
        </span>
        <span>
          <Stone color='plus' colorLetters={{ plus: '+' }} />
          <Stone color='white' />
          <Stone color='white' />
        </span>
        <span>
          <Stone color='plus' colorLetters={{ plus: '+' }} />
          <Stone color='blue' />
          <Stone color='white' />
          <Stone color='white' />
        </span>
        <span>
          <Stone color='plus' colorLetters={{ plus: '+' }} />
          <Stone color='white' />
          <Stone color='white' />
          <Stone color='white' />
          <Stone color='and' colorLetters={{ and: '&' }} />
          <Stone color='black' />
          <Stone color='equals' colorLetters={{ equals: '=' }} />
          <Stone color='blue' />
        </span>
        <span>& Heart of Fire</span>
        <span>& Heart of Fire</span>
      </div>
    </div>
  );
};

export default Crafting;
