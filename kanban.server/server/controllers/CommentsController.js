import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'
import BaseController from '../utils/BaseController'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
    // NOTE This needs to be at the TOP of ALL routers
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)

      .get('/:id', this.getCommentById)
      .post('', this.createComment)
      .delete('/:id', this.deleteComment)
  }

  async getCommentById(req, res, next) {
    try {
      const comment = await commentsService.findOne({ _id: req.params.id })
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async createComment(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.create(req.body)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async deleteComment(req, res, next) {
    try {
      const data = await commentsService.delete(req.params.id, req.userInfo.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
