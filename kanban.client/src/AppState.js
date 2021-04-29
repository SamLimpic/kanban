import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data

// NOTE tasks, comments, lists are empty objects
// NOTE this is because we are rendering multiples of the same on every board.
// NOTE They must be collections in the Appstate - contained within the empty object
// NOTE each collection is identified by the ID of it's parent element
export const AppState = reactive({
  user: {},
  account: {},
  boards: [],
  lists: {},
  tasks: {},
  comments: {},
  newPost: {}
})
