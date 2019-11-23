/** @format */

import Mock from './config'

const baseUrl = process.env.GATEWAY
Mock.mock(`${baseUrl}todo/list`, {
  'todoList|3': [
    {
      id: '@id()',
      description: '@title(3, 5)',
      'completed|1-2': true
    }
  ]
})
