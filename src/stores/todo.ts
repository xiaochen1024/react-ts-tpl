/** @format */

import { computed, action, observable } from 'mobx'
import TodoItemStore from './todoItem'
import axios from '@/api/request'

export class TodoStore {
  @observable todos: TodoItemStore[] = []

  @action async fetchTodo() {
    const result: any = (await axios.get(`todo/list`)).data.todoList
    this.todos = result || []
  }

  @computed get completedTodosCount(): number {
    return this.todos.filter(todo => todo.completed).length
  }

  @computed get report(): string {
    if (this.todos.length === 0) {
      return '<none>'
    }

    return `Next todo: "${this.todos[0].description}". ` + `Progress: ${this.completedTodosCount}/${this.todos.length}`
  }

  @action addTodo(task: string) {
    this.todos.push(new TodoItemStore(task))
  }
}

export default new TodoStore()
