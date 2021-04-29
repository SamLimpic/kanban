import { AppState } from '../AppState'
import router from '../router'
import { api } from './AxiosService'

class BoardsService {
  async getAllBoards() {
    const res = await api.get('api/boards')
    AppState.boards = res.data
  }

  // async getBoardById(id) {
  //   const res = await api.get(`api/boards/${id}`)
  //   AppState.activeBoard = res.data
  // }

  async getListsByBoardId(boardId) {
    const res = await api.get(`api/boards/${boardId}/lists`)
    AppState.lists[boardId] = res.data
  }

  async createBoard(data) {
    const res = await api.post('api/boards', data)
    AppState.boards.push(res.data)
    router.push({ name: 'Board', params: { id: res.data.id } })
  }

  async editBoard(boardId, edit) {
    await api.put(`api/boards/${boardId}`, edit)
  }

  async deleteBoard(boardId) {
    await api.delete(`api/boards/${boardId}`)
  }
}

export const boardsService = new BoardsService()
