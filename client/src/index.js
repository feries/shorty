import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'

import * as serviceWorker from './serviceWorker'
import configureStore from './store'

import routes from './Router'
import AuthenticatedRoute from './hocs/AuthenticatedRoute'

import Loader from './components/Loader'

import './styles/style.scss'

const wrapRoute = (props, key) => {
  if (!props.auth) return <Route key={key} {...props} />

  return <AuthenticatedRoute key={key} {...props} />
}

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<Loader isFullScreen />}>
      <Switch>
        {routes.map((route, index) => wrapRoute(route, index))}
        <Redirect to="/404" />
      </Switch>
    </Suspense>
  </BrowserRouter>
)

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
