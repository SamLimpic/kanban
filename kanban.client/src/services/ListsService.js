import { AppState } from '../AppState'
import { api } from './AxiosService'

class ListsService {
  async getListById(id) {
    const res = await api.get(`api/lists/${id}`)
    AppState.activeList = res.data
  }

  async getTasksByListId(id) {
    const res = await api.get(`api/lists/${id}/tasks`)
    AppState.tasks = res.data
  }

  async createList(data) {
    const res = await api.post('api/lists', data)
    AppState.lists.push(res.data)
  }

  async editList(id, edit) {
    const res = await api.put(`api/lists/${id}`, edit)
    AppState.activeList = res.data
    // this.getListById(res.data.id)
  }

  async deleteList(id) {
    await api.delete(`api/lists/${id}`)
    AppState.lists = AppState.lists.filter(list => list.id !== id)
  }
}

export const listsService = new ListsService()
