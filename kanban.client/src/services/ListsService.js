import { AppState } from '../AppState'
import { api } from './AxiosService'

class ListsService {
  // async getListById(id) {
  //   const res = await api.get(`api/lists/${id}`)
  //   AppState.activeList = res.data
  // }

  async getTasksByListId(listId) {
    const res = await api.get(`api/lists/${listId}/tasks`)
    AppState.tasks[listId] = res.data
  }

  async createList(boardId, data) {
    const res = await api.post('api/lists', data)
    AppState.lists[boardId].push(res.data)
  }

  async editList(boardId, listId, edit) {
    const res = await api.put(`api/lists/${listId}`, edit)
    AppState.lists[boardId] = res.data
  }

  async deleteList(boardId, listId) {
    await api.delete(`api/lists/${listId}`)
    AppState.lists[boardId] = AppState.lists[boardId].filter(list => list.id !== listId)
  }
}

export const listsService = new ListsService()
