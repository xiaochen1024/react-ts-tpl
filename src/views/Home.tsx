/** @format */

import React, { memo, PureComponent } from 'react'
import { inject, observer, useLocalStore, useObserver } from 'mobx-react'
import { renderRoutes } from 'react-router-config'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'

import todoStore, { TodoStore } from '@/stores/todo'

import TodoList from '@/components/B_Todo/TodoList'
import styles from './Home.module.less'
import './Home.less'
import useRequst from '@/hooks/useRequst'
interface Props {
  todoStore: TodoStore
  route: { children: [] }
}

const I18n = () => {
  const { t } = useTranslation()
  return (
    <div>
      <h2 className="theme">{t('Welcome to React')}</h2>
    </div>
  )
}

// const Func = (props: Props) => {
//   console.log(props.todoStore.todos[0]?.description)
//   return (
//     <div>
//       <div>{props.todoStore.todos[0]?.description}</div>
//     </div>
//   )
// }
// const FuncWapper = inject((stores: Props) => ({
//   todoStore: stores.todoStore
// }))(observer(Func))

const Hook = () => {
  const localStore = useLocalStore(() => todoStore)
  return useObserver(() => (
    <Button
      onClick={() => {
        localStore.todos[0].completed = !localStore.todos[0].completed
      }}>
      {localStore.todos[0]?.description}
    </Button>
  ))
}

const AsyncHook = memo(() => {
  const { data, success, loading } = useRequst('todo/list', 'get')
  return <Button loading={loading}>{success ? data.todoList[0]?.description : ''}</Button>
})

@inject((stores: Props) => ({
  todoStore: stores.todoStore
}))
@observer
class Home extends PureComponent<Props> {
  async componentDidMount() {
    this.props.todoStore.fetchTodo()
  }
  render() {
    const { route, todoStore } = this.props
    return (
      <div className={styles['home-page']}>
        <I18n />
        {/* <FuncWapper /> */}
        <Hook />
        <AsyncHook />
        <TodoList store={todoStore} />
        <>{renderRoutes(route.children)}</>
      </div>
    )
  }
}

export default Home
