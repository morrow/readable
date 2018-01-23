import { UPDATE_POST,
          CREATE_POST } from './postTypes'

export const updatePost = (post)=> {
  return {
    type: UPDATE_POST,
    post
  }
}

export const createPost = (post)=> ({
  type: CREATE_POST,
  post
})