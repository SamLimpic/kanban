import { AppState } from '../AppState'
import { api } from './AxiosService'

class TasksService {
  // async getTaskById(id) {
  //   const res = await api.get(`api/tasks/${id}`)
  //   AppState.tasks = res.data
  // }

  async getCommentsByTaskId(taskId) {
    const res = await api.get(`api/tasks/${taskId}/comments`)
    AppState.comments[taskId] = res.data
  }

  async createTask(listId, data) {
    const res = await api.post('api/tasks', data)
    AppState.tasks[listId].push(res.data)
  }

  async editTask(listId, taskId, edit) {
    const res = await api.put(`api/tasks/${taskId}`, edit)
    AppState.tasks[listId] = res.data
  }

  async deleteTask(listId, taskId) {
    await api.delete(`api/tasks/${taskId}`)
    AppState.tasks[listId] = AppState.tasks[listId].filter(task => task.id !== taskId)
  }
}

export const tasksService = new TasksService()
