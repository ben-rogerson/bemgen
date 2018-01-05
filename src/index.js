import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import bemgenApp from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { randomItem } from './utilities/utilities'
import AppContainer from './containers/AppContainer';

const initialState = {
  block: {
    title: '',
  },
  children: [],
  options: {
    isExport: false,
    isConfigOpen: false,
  },
  config: {
    html: 'classic',
    selector: 'nested',
    element: 'classic',
    modifier: 'classic',
  },
  examples: {
    block: randomItem([
      'breadcrumbs',
      'header',
      'footer',
      'card',
      'tile',
    ]),
    child: randomItem([
      'title',
      'wrap',
      'list',
      'item',
      'button',
    ]),
  },
}

let store = createStore(
  bemgenApp,
  initialState,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
// store.subscribe(() =>
//   console.log(store.getState())
// )

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);
