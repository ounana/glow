import { Component } from 'react'

/**
 * Error Boundaries
 * 捕捉底层错误
 */

export default function ErrorBoundaries() {
  return (
    <Error>
      <h1>React Error Boundaries</h1>
      <Test />
    </Error>
  )
}

function Test(props: any) {
  return (
    <div>{props.name.test}</div>
  )
}

class Error extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: any, info: any) {
    // Get error info
    console.log(error)
    console.log(info)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Rendering error.</h1>
    }
    return this.props.children
  }
}