import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async findOne(id) {
    const data = await dbContext.Comments.findOne({ _id: id })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async create(body) {
    return await dbContext.Comments.create(body)
  }

  async delete(id, creatorId) {
    const data = await dbContext.Comments.findOneAndDelete({ _id: id, creatorId })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted'
  }
}

export const commentsService = new CommentsService()
