/** @format */

import { observable } from 'mobx'

export class TodoTask {
  @observable description: string
  @observable completed: boolean

  constructor(description: string) {
    this.description = description
    this.completed = false
  }
}

export default TodoTask
