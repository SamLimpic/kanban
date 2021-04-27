import { Auth0Provider } from '@bcwdev/auth0provider'
import { listsService } from '../services/ListsService'
import BaseController from '../utils/BaseController'

export class ListsController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
    // NOTE This needs to be at the TOP of ALL routers
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .get('/:boardId', this.getListsByBoardId)
      .get('/:id', this.getListById)
      .post('', this.createList)
      .delete('/:id', this.deleteList)
  }

  async getListsByBoardId(req, res, next) {
    try {
      const lists = await listsService.find({ _boardId: req.params.id }) // REVIEW Underscore may/may not be needed
      // NOTE query may not be required
      return res.send(lists)
    } catch (error) {
      next(error)
    }
  }

  async getListById(req, res, next) {
    try {
      const list = await listsService.findOne({ _id: req.params.id })
      return res.send(list)
    } catch (error) {
      next(error)
    }
  }

  async createList(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.accountId = req.userInfo.id
      const list = await listsService.create(req.body)
      return res.send(list)
    } catch (error) {
      next(error)
    }
  }

  async deleteList(req, res, next) {
    try {
      const data = await listsService.delete(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}