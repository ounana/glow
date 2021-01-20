import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom"

const Tensorflow = lazy(() => import('./tensorflow/Tensorflow'))
const Test = lazy(() => import('./test/Test'))

function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={'路由加载中'}>
        <Switch>
          <Route exact path="/" component={Tensorflow} />
          <Route path="/tensorflow" component={Tensorflow} />
          <Route path="/test" component={Test} />
          <Redirect from="*" to="/test"></Redirect>
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router