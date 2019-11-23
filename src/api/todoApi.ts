/** @format */

import axios from './request'

class TodoApi {
  public async fetchTodoReq() {
    return (await axios.get(`todo/list`)).data.todoList
  }
}

export default new TodoApi()
