import { AppState } from '../AppState'
import router from '../router'
import { api } from './AxiosService'

class BoardsService {
  async getAllBoards() {
    const res = await api.get('api/boards')
    AppState.boards = res.data
  }

  async getBoardById(id) {
    const res = await api.get(`api/boards/${id}`)
    AppState.activeBoard = res.data
  }

  async getListsByBoardId(id) {
    const res = await api.get(`api/boards/${id}/lists`)
    AppState.lists = res.data
  }

  async createBoard(data) {
    const res = await api.post('api/boards', data)
    AppState.boards.push(res.data)
    router.push({ name: 'BoardPage', params: { id: res.data.id } })
  }

  async editBoard(id, edit) {
    const res = await api.put(`api/boards/${id}`, edit)
    AppState.activeBoard = res.data
    // this.getBoardById(res.data.id)
  }

  async deleteBoard(id) {
    await api.delete(`api/boards/${id}`)
    AppState.boards = AppState.boards.filter(board => board.id !== id)
  }
}

export const boardsService = new BoardsService()
