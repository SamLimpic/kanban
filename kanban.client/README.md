CodeWorks Vue Starter
=====================

SUBDOCS

In Server => Models => Schema
Subdocs are for data that is irrelevant without the Parent: Tasks => Comments
Entirely handled in the Back End

 TASK MODEL <!-- SECTION -->
  ``` JS
const Comment = new Schema({
  body: {type: String, required: true},
  creatorId: { type: String, ref: 'Account', required: true }
},
  { timestamps: true, toJSON: { virtuals: true } }
)

Comment.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

// NOTE Subdocs get their own Schema and Virtual *if required) declared inside the Parent Model, above the Parent Schema

const Task = new Schema(
  {
    title: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true },
    listId: { type: ObjectId, ref: 'List', required: true }
  },
  // NOTE Subdocs must be at the Bottom-Level of the Schema
  comments: [Comment]
  { timestamps: true, toJSON: { virtuals: true } }
)

Task.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Task
```



TASK CONTROLLER <!-- SECTION -->
``` JS
  async editTask(req, res, next) {
    try {
      req.body.creatorId == req.userInfo.id
      req.body.id = req.params.id
      // NOTE Prevents comments from overwriting itself when not being directly manipulated
      delete.req.body.comments
      const data = await tasksService.edit(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
```



TASK SERVICE <!-- SECTION -->
``` JS
  async findById(id) {
    const tasks = await dbContext.Tasks.findById(id)
      .populate('creator', 'name picture')
      .populate('comments.creator', 'name picture')
    // NOTE .populate('creator', 'name etc')
  }

async createComment(id, body) {
  const task = await this.findById(id)
  task.comments.push(body)
  await task.save()
  return task
  // NOTE ALternative Method:
  // const updated = await dbContext.Tasks.findOneAndUpdate({ _id: id }, { $push: { comments:body } }, { new:true })
  // if(!updated) {
  //   throw new BadRequest('Invalid Id')
  // }
  // return updated
}

async deleteComment(id, commentId, creatorId) {
  const task = await this.findById(id)
  const comment = task.comments.id(commentId)
  if (task.creatorId === creatorId || comment.creatorId === creatorId) {
    comment.remove()
    await task.save()
  return task
  }
  throw new BadRequest('You cannot delete comments you did not write on posts you did not create')
  // NOTE Alternative Method:
  // const updated = await dbContext.Tasks.findOneAndUpdate({ _id: id }, { $pull: { comments: { _id: commentId, creatorId } } }, { new:true })
  // if(!updated) {
  //   throw new BadRequest('Invalid Id')
  // }
  // return updated
}
```



CLIENT SIDE: PAGE <!-- SECTION -->
```JS
newCar: { taskId: route.params.id}

async addComment() {
      try {
      await carsService.addComment(state.newComment) {
      state.newComment = {taskId: route.params.id}
      Notification.toast('Commented', 'success')
    } catch (error) {
      Notification.toast('Error: ', error, 'error')
    }
  }
}
```


CLIENT SIDE: SERVICE
``` JS
async addComment(newComment) {
const res = await api.post(`api/tasks/${newComment.taskId}/comments`, newComment)
await this.getTaskById(newComment.task.id)
}