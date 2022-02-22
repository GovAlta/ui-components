import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import App from './app/app';

import '@abgov/styles';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
