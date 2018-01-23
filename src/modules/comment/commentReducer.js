import {  UPDATE_COMMENT,
          CREATE_COMMENT,
          UPVOTE_COMMENT,
          DOWNVOTE_COMMENT } from './commentTypes'
import { deepCopy, getCurrentUser, getSlug } from '../app/appHelpers'

export const initial_comment_state = {
  comments: [
    {
      id: 1,
      score:19,
      post_id: 1,
      text: 'Test COmment',
    }
  ]
}

export const permissions = {
  id: false,
  text: true,
  score: false,
  user_id: false,
  post_id: false,
}

const commentReducer = (state = initial_comment_state, action) => {
  let actions = {
    [CREATE_COMMENT]: ()=> {
      let comments = deepCopy(state.comments)
      comments.push(action.comment)
      return {
        ...state,
        comments
      }
    },
    [UPVOTE_COMMENT]: ()=> {

    },
    [DOWNVOTE_COMMENT]: ()=> {

    },
    [UPDATE_COMMENT]: ()=>{
      let comments = state.comments.map((c) => {
        if(c.id === action.comment.id && c.user_id == getCurrentUser().id){
          let updated_comment = {}
          for(let attribute in permissions){
            if(permissions[attribute] === true){
              updated_comment[attribute] = action.comment[attribute]
            } else {
              updated_comment[attribute] = c[attribute]
            }
          }
          return {
            ...updated_comment,
            slug: getSlug(updated_comment.name)
          }
        }
        else {
          return {
            ...c,
            slug: getSlug(c.name)
          }
        }
      })
      return {
        ...state,
        comments
      }
    }
  }
  if(action.type in actions){
    return actions[action.type]()
  } else {
    return state
  }
}

export default commentReducer