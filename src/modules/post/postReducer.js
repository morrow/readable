import {  UPDATE_POST,
          CREATE_POST,
          UPVOTE_POST,
          DOWNVOTE_POST,
          DELETE_POST,
          SORT_POSTS,
          INCREASE_COMMENT_TOTAL,
          DECREASE_COMMENT_TOTAL,
          UPDATE_POST_STATE, } from './postTypes'
import { deepCopy, getCurrentUser, getSlug } from '../app/appHelpers'

export const initial_post_state = {
  posts: [
    {
      id: 1,
      title: 'Test Post',
      category: 'test category',
      body: 'Post Body',
      user_id: 1,
      slug: '1-test-post',
      score: 0,
      comment_total: 0,
      date: (new Date).toISOString(),
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
  score: false,
  date: false,
  comment_total: false,
}

const postReducer = (state = initial_post_state, action) => {
  let actions = {
    [UPDATE_POST_STATE]: ()=> {
      return action.state.post
    },
    [CREATE_POST]: ()=> {
      let posts = deepCopy(state.posts)
      action.post.slug = getSlug(action.post.title, action.post.id)
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
            slug: getSlug(updated_post.title, updated_post.id)
          }
        }
        else {
          return {
            ...c,
            slug: getSlug(c.title, c.id)
          }
        }
      })
      return {
        ...state,
        posts
      }
    },
    [UPVOTE_POST]: ()=> {
      let posts = deepCopy(state.posts)
      return {
        ...state,
        posts: posts.map(post => {
          if(parseInt(post.id) === parseInt(action.vote.target)){
            post.score = parseInt(post.score) + 1
          }
          return post
        })
      }
    },
    [DOWNVOTE_POST]: ()=> {
     let posts = deepCopy(state.posts)
      return {
        ...state,
        posts: posts.map(post => {
          if(parseInt(post.id) === parseInt(action.vote.target)){
            post.score = parseInt(post.score - 1)
          }
          return post
        })
      }
    },
    [DELETE_POST]: ()=> {
      let posts = deepCopy(state.posts).filter(p=> p.id !== action.post.id)
      return {
        ...state,
        posts
      }
    },
    [SORT_POSTS]: ()=> {
      let posts = deepCopy(state.posts)
      let sorted_by = action.sort.attribute
      let initial_order = posts.map(p=>p.id).join()
      var sortMethod = (a,b)=> a - b
      var sortReversed = false
      if(sorted_by === 'date'){
        sortMethod = (a, b)=> (new Date(a.date)) - (new Date(b.date))
      } else if(sorted_by === 'score'){
        sortMethod = (a, b)=> parseInt(a.score) - parseInt(b.score)
      } else if(sorted_by === 'comments'){
        sortMethod = (a, b)=> parseInt(a.comments) - parseInt(b.comments)
      }
      //posts = posts.sort(sortMethod)
      if(initial_order == posts.sort(sortMethod).map(p=>p.id).join()){
        // posts = posts.reverse()
        sortReversed = true
      }
      return {
        ...state,
        sortMethod,
        sortReversed,
      }
    },
    [INCREASE_COMMENT_TOTAL]: ()=> {
      let posts = deepCopy(state.posts)
      return {
        ...state,
        posts: posts.map(post => {
          if(parseInt(post.id) === parseInt(action.post_id)){
            if(post.comment_total == undefined){
              post.comment_total = 0
            }
            post.comment_total = parseInt(post.comment_total) + 1
          }
          return post
        })
      }
    },
    [DECREASE_COMMENT_TOTAL]: ()=> {
      let posts = deepCopy(state.posts)
      return {
        ...state,
        posts: posts.map(post => {
          if(parseInt(post.id) === parseInt(action.post_id)){
            post.comment_total = parseInt(post.comment_total) - 1
          }
          return post
        })
      }
    },
  }
  if(action.type in actions){
    let result = actions[action.type]()
    return result
  } else {
    return state
  }
}

export default postReducer