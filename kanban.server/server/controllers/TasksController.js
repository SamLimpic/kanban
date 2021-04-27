import { Auth0Provider } from '@bcwdev/auth0provider'
import { tasksService } from '../services/TasksService'
import BaseController from '../utils/BaseController'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
    // NOTE This needs to be at the TOP of ALL routers
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .get('/:id', this.getTaskById)
      .get('/:id/comments', this.getCommentsByTaskId)
      .post('', this.createTask)
      .put('/:id', this.editTask)
      .delete('/:id', this.deleteTask)
  }

  async getTaskById(req, res, next) {
    try {
      const task = await tasksService.findOne({ _id: req.params.id })
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByTaskId(req, res, next) {
    try {
      const comments = await tasksService.findCommentByTask({ _id: req.params.id }) // REVIEW Underscore may/may not be needed
      // NOTE query may not be required
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async createTask(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.accountId = req.userInfo.id
      const task = await tasksService.create(req.body)
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async editTask(req, res, next) {
    try {
      req.body.id = req.params.id
      const data = await tasksService.edit(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteTask(req, res, next) {
    try {
      const data = await tasksService.delete(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
