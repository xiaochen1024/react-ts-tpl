/** @format */

import React from 'react'

interface IProps {}
interface IState {
  hasError: boolean
}
class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch() {
    this.setState({ hasError: true })
  }

  render() {
    const { hasError } = this.state
    if (hasError) {
      return <h1>出错了，请刷新页面！</h1>
    }
    const { children } = this.props
    return children
  }
}

export default ErrorBoundary
