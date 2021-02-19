/*
  React HOC
  以组件作为参数并返回新组件的函数
  作用：注入一些props
*/

import { Button } from "antd"

const state = {
  count: 0,
  dispatch: function () {
    state.count += 1
  },
  getCount: () => {
    return state.count
  }
}
type State = typeof state

function MyConnect<P>(Component: any) {
  return (props: Omit<P, keyof State>) => {
    return <Component {...props} {...state} />
  }
}
const MyComponent = MyConnect<HigherOrderProps>(HigherOrder)

export default function Test() {
  return (
    <MyComponent name="baby" age={15} />
  )
}
interface HigherOrderProps extends State {
  name: string
  age: number
}
function HigherOrder(props: HigherOrderProps) {
  const { name, age, count, dispatch, getCount } = props
  const onClick = () => {
    dispatch()
    console.log(getCount())
  }
  return (
    <div>
      <h1>React Higher-Order Components</h1>
      <h3>Name: {name}, age: {age}</h3>
      <h3>count: {count}</h3>
      <Button onClick={onClick}>DISPATCH</Button>
    </div>
  )
}