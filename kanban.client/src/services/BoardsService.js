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

  async getListsByBoardId(boardId) {
    const res = await api.get(`api/boards/${boardId}/lists`)
    // NOTE you must now specify which specific object in AppState.lists is being referenced.
    AppState.lists[boardId] = res.data
  }

  async createBoard(data) {
    const bill = Math.floor(Math.random() * 6 + 3)
    const murray = Math.floor(Math.random() * 6 + 3)
    data.imgUrl = `http://www.fillmurray.com/${bill}${murray}0/${bill}${murray}0`
    const res = await api.post('api/boards', data)
    AppState.boards.push(res.data)
    router.push({ name: 'Board', params: { id: res.data.id } })
  }

  async editBoard(boardId, edit) {
    await api.put(`api/boards/${boardId}`, edit)
    await this.getAllBoards()
  }

  async deleteBoard(boardId) {
    await api.delete(`api/boards/${boardId}`)
    await this.getAllBoards()
  }
}

export const boardsService = new BoardsService()
