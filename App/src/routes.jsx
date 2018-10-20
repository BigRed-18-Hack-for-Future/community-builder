import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'

import Main from './components/views/Main'
import CreateProject from './components/views/CreateProject'
import UserInfo from './components/views/UserInfo'

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ Main } />
    <Route path='new' component={ CreateProject } />
    <Route path='user' component={ UserInfo } />
  </Route>
)
