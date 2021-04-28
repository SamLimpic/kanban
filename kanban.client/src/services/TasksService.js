import { AppState } from '../AppState'
import { api } from './AxiosService'

class TasksService {
  async getTaskById(id) {
    const res = await api.get(`api/tasks/${id}`)
    AppState.activeTask = res.data
  }

  async getCommentsByTaskId(id) {
    const res = await api.get(`api/tasks/${id}/comments`)
    AppState.comments = res.data
  }

  async createTask(data) {
    const res = await api.post('api/tasks', data)
    AppState.tasks.push(res.data)
  }

  async editTask(id, edit) {
    const res = await api.put(`api/tasks/${id}`, edit)
    AppState.activeTask = res.data
    // this.getTaskById(res.data.id)
  }

  async deleteTask(id) {
    await api.delete(`api/tasks/${id}`)
    AppState.tasks = AppState.tasks.filter(task => task.id !== id)
  }
}

export const tasksService = new TasksService()
