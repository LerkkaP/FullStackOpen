import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import notificationRedcuer from './reducers/notificationReducer'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

const store = createStore(notificationRedcuer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
