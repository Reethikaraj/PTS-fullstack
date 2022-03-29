import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import reduxStore from './redux/store/store'
import { positions, transitions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

// Options for error display using react-alert
const options = {
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
}
ReactDOM.render(
  <Provider store={reduxStore}>
    {/* Wrapping for error display using react-alert */}
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
)
