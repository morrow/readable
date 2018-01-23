import {  UPDATE_POST,
          CREATE_POST } from './postTypes'
import { deepCopy, getCurrentUser, getSlug } from '../app/appHelpers'

export const initial_post_state = {
  posts: [
    {
      id: 1,
      title: 'Test Post',
      category: 'test category',
      body: 'Post Body',
      author: 'Test AUthor',
      user_id: 1,
      slug: 'test-post'
    }
  ]
}

export const permissions = {
  title: true,
  category: true,
  body: true,
  author: false,
  id: false,
  user_id: false,
  slug: false,
}

const postReducer = (state = initial_post_state, action) => {
  let actions = {
    [CREATE_POST]: ()=> {
      let posts = deepCopy(state.posts)
      posts.push(action.post)
      return {
        ...state,
        posts
      }
    },
    [UPDATE_POST]: ()=>{
      let posts = state.posts.map((c) => {
        if(c.id === action.post.id && c.user_id == getCurrentUser().id){
          let updated_post = {}
          for(let attribute in permissions){
            if(permissions[attribute] === true){
              updated_post[attribute] = action.post[attribute]
            } else {
              updated_post[attribute] = c[attribute]
            }
          }
          return {
            ...updated_post,
            slug: getSlug(updated_post.title)
          }
        }
        else {
          return {
            ...c,
            slug: getSlug(c.title)
          }
        }
      })
      return {
        ...state,
        posts
      }
    }
  }
  if(action.type in actions){
    return actions[action.type]()
  } else {
    return state
  }
}

export default postReducer