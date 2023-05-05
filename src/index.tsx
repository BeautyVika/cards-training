import React from 'react'

import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import App from './app/App'
import { store } from './s1-DAL/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={store}>
    {/*<React.StrictMode>*/}
    <HashRouter>
      <App />
    </HashRouter>
    {/*</React.StrictMode>*/}
  </Provider>
)
