import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListsService {
  async findOne(id) {
    const data = await dbContext.Lists.findOne({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async findTasksByList(id) {
    return await dbContext.Tasks.find({ listId: id }) // NOTE .populate('creator', 'name', etc)
  }

  async create(body) {
    return await dbContext.Lists.create(body)
  }

  async edit(body) {
    const data = await dbContext.Lists.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async delete(id, creatorId) {
    const data = await dbContext.Lists.findOneAndDelete({ _id: id, creatorId })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted'
  }
}

export const listsService = new ListsService()
