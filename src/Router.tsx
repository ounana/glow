import { lazy, Suspense } from 'react';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter
} from "react-router-dom"

const Docment = lazy(() => import('./document'))
const Tensorflow = lazy(() => import('./tensorflow'))
const Test = lazy(() => import('./test/Test'))
const Redux = lazy(() => import('./redux'))
const Rxjs = lazy(() => import('./rxjs'))
const Game = lazy(() => import('./game'))
const DuckShooter = lazy(() => import('./duckshooter'))
const G6Graphic = lazy(() => import('./g6/G6Graphic'))
const Plane = lazy(() => import('./plane'))

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={'路由加载中'}>
        <Switch>
          <Route exact path={"/"} component={Docment} />
          <Route path={"/tensorflow"} component={Tensorflow} />
          <Route path="/test" component={Test} />
          <Route path="/redux" component={Redux} />
          <Route path="/rxjs" component={Rxjs} />
          <Route path="/game" component={Game} />
          <Route path="/duckshooter" component={DuckShooter} />
          <Route path="/g6" component={G6Graphic} />
          <Route path="/plane" component={Plane} />

          <Redirect from="*" to="/"></Redirect>
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}