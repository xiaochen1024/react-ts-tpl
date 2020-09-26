/** @format */

import { observable } from 'mobx'

export default class TodoItemStore {
  @observable description: string
  @observable completed: boolean

  constructor(description: string) {
    this.description = description
    this.completed = false
  }
}
