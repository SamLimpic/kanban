import { Auth0Provider } from '@bcwdev/auth0provider'
import { boardsService } from '../services/BoardsService'
import BaseController from '../utils/BaseController'

export class BoardsController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
    // NOTE This needs to be at the TOP of ALL routers
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .get('', this.getAllBoards)
      .get('/:id', this.getBoardById)
      .post('', this.createBoard)
      .delete('/:id', this.deleteBoard)
  }

  async getAllBoards(req, res, next) {
    try {
      const boards = await boardsService.find(req.query)
      // NOTE query may not be required
      return res.send(boards)
    } catch (error) {
      next(error)
    }
  }

  async getBoardById(req, res, next) {
    try {
      const board = await boardsService.findOne({ _id: req.params.id })
      return res.send(board)
    } catch (error) {
      next(error)
    }
  }

  async createBoard(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.accountId = req.userInfo.id
      const board = await boardsService.create(req.body)
      return res.send(board)
    } catch (error) {
      next(error)
    }
  }

  async deleteBoard(req, res, next) {
    try {
      const data = await boardsService.delete(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
