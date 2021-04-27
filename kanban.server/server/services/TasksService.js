import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async find(id) {
    return await dbContext.Tasks.find({ _listId: id }) // NOTE .populate('creator', 'name', etc)
  }

  async findOne(id) {
    const data = await dbContext.Tasks.findOne({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async create(body) {
    return await dbContext.Tasks.create(body)
  }

  async delete(id) {
    const data = await dbContext.Tasks.findOneAndDelete({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted'
  }
}

export const tasksService = new TasksService()
