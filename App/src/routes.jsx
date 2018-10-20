import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/app'

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ Main } />
    <Route path='new' component={ CreateProject } />
    <Route path='user' component={ UserInfo } />
  </Route>
)
