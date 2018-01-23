import { UPDATE_COMMENT,
          CREATE_COMMENT } from './commentTypes'

export const updateComment = (comment)=> {
  return {
    type: UPDATE_COMMENT,
    comment
  }
}

export const createComment = (comment)=> ({
  type: CREATE_COMMENT,
  comment
})