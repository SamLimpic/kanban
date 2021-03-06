import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async find(query = {}) {
    return await dbContext.Boards.find(query) // NOTE .populate('creator', 'name, etc')
  }

  async findOne(id) {
    const data = await dbContext.Boards.findOne({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async findListsByBoard(id) {
    return await dbContext.Lists.find({ boardId: id }) // NOTE .populate('creator', 'name', etc)
  }

  async create(body) {
    return await dbContext.Boards.create(body)
  }

  async edit(body) {
    const data = await dbContext.Boards.findOneAndUpdate({ _id: body.id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async delete(id, creatorId) {
    const data = await dbContext.Boards.findOneAndDelete({ _id: id, creatorId })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted'
  }
}

export const boardsService = new BoardsService()
