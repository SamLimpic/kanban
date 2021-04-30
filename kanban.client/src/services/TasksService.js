import { AppState } from '../AppState'
import { api } from './AxiosService'
import { listsService } from './ListsService'

class TasksService {
  // async getTaskById(id) {
  //   const res = await api.get(`api/tasks/${id}`)
  //   AppState.tasks = res.data
  // }
  setTaskToMove(task) {
    AppState.activeTask = task
  }

  async moveTask(task, newListId) {
    const edit = {
      listId: newListId
    }

    await this.editTask(newListId, task.id, edit)

    await listsService.getTasksByListId(task.listId)

    // oldList[oldIndex] = oldList[oldIndex].filter(t => t.id !== task.id)

    // AppState.tasks[newListId].push(task)
  }

  async getCommentsByTaskId(taskId) {
    const res = await api.get(`api/tasks/${taskId}/comments`)
    AppState.comments[taskId] = res.data
  }

  async createTask(listId, data) {
    const res = await api.post('api/tasks', data)
    AppState.tasks[listId].push(res.data)
  }

  async editTask(listId, taskId, edit) {
    await api.put(`api/tasks/${taskId}`, edit)
    await listsService.getTasksByListId(listId)
  }

  async deleteTask(listId, taskId) {
    await api.delete(`api/tasks/${taskId}`)
    AppState.tasks[listId] = AppState.tasks[listId].filter(task => task.id !== taskId)
  }
}

export const tasksService = new TasksService()
