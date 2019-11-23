/** @format */

import { observer } from 'mobx-react'
import * as React from 'react'
import TodoView from './TodoView'
import TodoStore from '@/stores/TodoStore'
import styles from './TodoList.module.less'
import { Button, Input } from 'antd'

export interface ITodoListProps {
  store: TodoStore
}
export interface ITodoListState {
  description: string
}

@observer
export class TodoList extends React.Component<ITodoListProps, ITodoListState> {
  constructor(props: ITodoListProps) {
    super(props)
    this.state = { description: '' }
  }

  public render() {
    const store = this.props.store
    return (
      <div className={styles['todo-list']}>
        <p>{store.report}</p>
        <form onSubmit={this.onNewTodo} style={{ display: 'flex' }}>
          <span style={{ display: 'flex' }}>
            <label style={{ width: 140 }}>New task:</label>
            <Input type="text" value={this.state.description} onChange={this.onDescriptionChange} />
          </span>
          <Button>Submit</Button>
        </form>
        <ul>
          {store.todos.map((todo, idx) => (
            <TodoView todo={todo} key={idx} />
          ))}
        </ul>
        <small> (double-click a todo to edit)</small>
      </div>
    )
  }

  private onDescriptionChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ description: event.currentTarget.value })
  }
  private onNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    this.props.store.addTodo(this.state.description)
    this.setState({ description: '' })
    event.preventDefault()
  }
}

export default TodoList
