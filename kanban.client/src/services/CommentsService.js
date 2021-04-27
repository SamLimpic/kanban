import { AppState } from '../AppState'
import router from '../router'
import { api } from './AxiosService'

class CommentsService {
  async getCommentById(id) {
    const res = await api.get(`api/comments/${id}`)
    AppState.activeComment = res.data
  }

  async createComment(data) {
    const res = await api.post('api/comments', data)
    AppState.comments.push(res.data)
    router.push({ name: 'CommentPage', params: { id: res.data.id } })
  }

  async deleteComment(id) {
    await api.delete(`api/comments/${id}`)
    AppState.comments = AppState.comments.filter(comment => comment.id !== id)
  }
}

export const commentsService = new CommentsService()
