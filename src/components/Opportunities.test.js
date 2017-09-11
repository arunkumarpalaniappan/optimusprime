import React from 'react';
import ReactDOM from 'react-dom';
import Opportunities from './Opportunities';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Opportunities />, div);
});
