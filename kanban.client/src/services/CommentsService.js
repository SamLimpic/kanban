import { AppState } from '../AppState'
import { api } from './AxiosService'

class CommentsService {
  // async getCommentById(id) {
  //   const res = await api.get(`api/comments/${id}`)
  //   AppState.activeComment = res.data
  // }

  async createComment(taskId, data) {
    const res = await api.post('api/comments', data)
    AppState.comments[taskId].push(res.data)
  }

  async deleteComment(taskId, commentId) {
    await api.delete(`api/comments/${commentId}`)
    AppState.comments[taskId] = AppState.comments[taskId].filter(comment => comment.id !== commentId)
  }
}

export const commentsService = new CommentsService()
