import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { boardsService } from '../services/BoardService'

export class BoardsController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      // NOTE This needs to be at the TOP of ALL routers
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .get('', this.getAllBoards)
      .get('/:id', this.getBoardById)
      .post('/:id', this.createBoard)
      .delete('/:id', this.deleteBoard)
  }

  /**
   * Sends found clusters to a client by request
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  async getAllBoards(req, res, next) {
    try {
      const boards = await boardsService.find(req.query) // NOTE query may not be required
      return res.send(boards)
    } catch (error) {
      next(error)
    }
  }

  /**
 * Sends found clusters to a client by id
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
  async getBoardById(req, res, next) {
    try {
      const boards = await boardsService.findById({ _id: req.params.id })
      return res.send(boards)
    } catch (error) {
      next(error)
    }
  }

  /**
* Sends found clusters to a client by id
* @param {import("express").Request} req
* @param {import("express").Response} res
* @param {import("express").NextFunction} next
*/
  async createBoard(req, res, next) {
    try {
      const board = await boardsService.create(req.body)
      res.send(board)
    } catch (error) {
      next(error)
    }
  }

  /**
* Sends found clusters to a client by id
* @param {import("express").Request} req
* @param {import("express").Response} res
* @param {import("express").NextFunction} next
*/
  async deleteBoard(req, res, next) {
    try {
      const board = await boardsService.delete(req.params.id)
      res.send(board)
    } catch (error) {
      next(error)
    }
  }
}
