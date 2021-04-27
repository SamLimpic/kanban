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
      .get('/:listId', this.getTasksByListId)
      .get('/:id', this.getTaskById)
      .post('', this.createTask)
      .delete('/:id', this.deleteTask)
  }

  async getTasksByListId(req, res, next) {
    try {
      const tasks = await tasksService.find({ _listId: req.params.id }) // REVIEW Underscore may/may not be needed
      // NOTE query may not be required
      return res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async getTaskById(req, res, next) {
    try {
      const task = await tasksService.findOne({ _id: req.params.id })
      return res.send(task)
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

  async deleteTask(req, res, next) {
    try {
      const data = await tasksService.delete(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
