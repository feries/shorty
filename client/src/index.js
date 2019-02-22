import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import * as serviceWorker from './serviceWorker'

import routes from './Router'
import AuthenticatedRoute from './hocs/AuthenticatedRoute'

import Loader from './components/Loader'

import './styles/style.scss'

const wrapRoute = ({ path, exact, component, auth }, key) => {
  const props = { key, path, exact, component }

  if (!auth) return <Route {...props} />

  return <AuthenticatedRoute {...props} />
}

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<Loader />}>
      <Switch>{routes.map((route, index) => wrapRoute(route, index))}</Switch>
    </Suspense>
  </BrowserRouter>
)

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
