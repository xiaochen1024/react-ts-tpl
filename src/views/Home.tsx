/** @format */

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { renderRoutes } from 'react-router-config'
import { useTranslation } from 'react-i18next'

import TodoStore from '@/stores/TodoStore'

import TodoList from '@/components/B_Todo/TodoList'
import styles from './Home.module.less'
import './Home.less'
interface Props {
  todoStore: TodoStore
  route: { children: [] }
}

const I18n = () => {
  const { t } = useTranslation()
  return <h2 className="theme">{t('Welcome to React')}</h2>
}
@inject((stores: Props) => ({
  todoStore: stores.todoStore
}))
@observer
class Home extends Component<Props> {
  async componentDidMount() {
    this.props.todoStore.fetchTodo()
  }
  render() {
    const { route, todoStore } = this.props
    return (
      <div className={styles['home-page']}>
        <I18n />
        <TodoList store={todoStore} />
        <>{renderRoutes(route.children)}</>
      </div>
    )
  }
}

export default Home
