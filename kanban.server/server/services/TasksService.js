import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async findOne(id) {
    const data = await dbContext.Tasks.findOne({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async findCommentByTask(id) {
    return await dbContext.Comments.find({ taskId: id }) // NOTE .populate('creator', 'name', etc)
  }

  async create(body) {
    return await dbContext.Tasks.create(body)
  }

  async edit(body) {
    const data = await dbContext.Tasks.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
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
