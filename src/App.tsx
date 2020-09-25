/** @format */

import React, { Component } from 'react'
import { observer, Provider } from 'mobx-react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { renderRoutes, RouteConfig } from 'react-router-config'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import loadable /*, { LoadableComponent }*/ from '@loadable/component'
import { Spin } from 'antd'
import 'moment/locale/zh-cn'
import config from '@/config'

import './styles/index.less'
import TodoStore from '@/stores/TodoStore'
import loaderStore from '@/stores/LoaderStore'

const history = createBrowserHistory({
  basename: `${config.PUBLIC_PATH}`
})

const stores = {
  todoStore: new TodoStore()
}

// type TRouteConfig = {
//   ...RouteConfig
// }

const routes = [
  {
    path: '/',
    component: loadable(() => import(/* webpackChunkName: "home" */ './views/Home')),
    children: [
      {
        path: '/child',
        component: loadable(() => import(/* webpackChunkName: "child" */ './views/Child')),
        children: [
          {
            path: '/child/c1',
            component: loadable(() => import(/* webpackChunkName: "child1" */ './views/Child1'))
          }
        ]
      }
    ]
  }
]

@observer
export default class App extends Component {
  render() {
    return (
      <Spin spinning={loaderStore.loading}>
        <ConfigProvider locale={zh_CN}>
          <Provider {...stores}>
            <Router history={history}>{renderRoutes(routes as any)}</Router>
          </Provider>
        </ConfigProvider>
      </Spin>
    )
  }
}
