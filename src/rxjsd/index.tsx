import React, { lazy } from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'

const Queue = lazy(() => import("./Queue"))
const Drag = lazy(() => import("./RxDrag"))
const Input = lazy(() => import("./Input"))
const Observable = lazy(() => import("./Observable"))
const Progress = lazy(() => import("./Progress"))
const Subject = lazy(() => import("./Subject"))

export default withRouter(props => {
  const { match: { path } } = props

  return (
    <Switch>
      <Route path={path + '/queue'} component={Queue} />
      <Route path={path + '/drag'} component={Drag} />
      <Route path={path + '/input'} component={Input} />
      <Route path={path + '/observable'} component={Observable} />
      <Route path={path + '/progress'} component={Progress} />
      <Route path={path + '/subject'} component={Subject} />
      <Redirect from="*" to={path + '/queue'} />
    </Switch>
  )
})