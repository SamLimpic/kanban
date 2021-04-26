import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async find(query = {}) {
    return await dbContext.Boards.find(query) // NOTE .populate('creator', 'name', etc)
  }

  async findById(id) {
    const board = await dbContext.Boards.findById(id)
    // NOTE might need to use  findOne({_id: id}) if the id property looks like _id
    if (!board) {
      throw new BadRequest('Invalid Id')
    }
    return board
  }

  async create(body) {
    return await dbContext.Boards.create(body)
  }

  async delete(id) {
    const board = await dbContext.Boards.findOneAndDelete({ _id: id })
    if (!board) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted'
  }
}

export const boardsService = new BoardsService()
