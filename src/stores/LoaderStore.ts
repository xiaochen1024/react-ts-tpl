/** @format */

import { action, observable } from 'mobx'

export class LoaderStore {
  @observable loading: boolean

  constructor() {
    this.loading = false
  }

  @action loaderStart() {
    this.loading = true
  }

  @action loaderEnd() {
    this.loading = false
  }

  get getLoading(): boolean {
    return this.loading
  }
}

export default new LoaderStore()
