import { lazy, Suspense } from 'react';
import {
  Route,
  Switch,
  Redirect,
  HashRouter
} from "react-router-dom"

const DraftPlan = lazy(() => import('./draftplan/DraftPlan'))
const Tensorflow = lazy(() => import('./tensorflow'))
const Test = lazy(() => import('./test/Test'))
const Reduxd = lazy(() => import('./reduxd'))
const Paperd = lazy(() => import('./paperd'))
const Rxjsd = lazy(() => import('./rxjsd'))
const Game = lazy(() => import('./game'))
const DuckShooter = lazy(() => import('./duckshooter'))
const G6Graphic = lazy(() => import('./g6/G6Graphic'))

export default function Router() {
  return (
    <HashRouter>
      <Suspense fallback={'路由加载中'}>
        <Switch>
          <Route exact path={"/"} component={DraftPlan} />
          <Route path={"/tensorflow"} component={Tensorflow} />
          <Route path="/test" component={Test} />
          <Route path="/reduxd" component={Reduxd} />
          <Route path="/paperd" component={Paperd} />
          <Route path="/rxjsd" component={Rxjsd} />
          <Route path="/game" component={Game} />
          <Route path="/duckshooter" component={DuckShooter} />
          <Route path="/g6" component={G6Graphic} />
          
          <Redirect from="*" to="/tensorflow"></Redirect>
        </Switch>
      </Suspense>
    </HashRouter>
  )
}