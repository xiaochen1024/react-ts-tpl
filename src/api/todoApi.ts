/** @format */

import axios from './request'

class TodoApi {
  async fetchTodoReq() {
    return (await axios.get(`todo/list`)).data.todoList
  }
}

export default new TodoApi()
