import React from 'react'
export default function ErrorBoundary(props: any) {
  return (
    <Error>
      <Test {...props} />
    </Error>
  )
}

function Test(props: any) {
  const { testObj } = props
  const { testKey } = testObj
  return (
    <div>{testKey}</div>
  )
}

class Error extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: any, info: any) {
    // You can also log the error to an error reporting service
    console.log(error)
    console.log(info)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }

    return this.props.children;
  }
}