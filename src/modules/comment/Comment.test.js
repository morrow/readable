import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import { UPDATE_COMMENT, updateComment } from './commentActions'
import { store } from '../../index'

import Comment from './Comment'
import commentReducer from './commentReducer'

const test_data = {
  id:   '1',
  name: 'Test Name',
  type: 'Test Type',
  user_id: '1',
}

const getMockCommentData = (data={}) => {
  return {
    ...test_data,
    data
  }
}

describe('rendering', ()=>{

  it('renders a comment', () => {
    // create wrap element
    let wrap = document.createElement('div')
    // render comment into wrap
    ReactDOM.render(
      <Provider store={store}>
        <Comment data={getMockCommentData()} />
      </Provider>, wrap)
    // there should be one child element of wrap, comment
    expect(wrap.children.length).toBe(1)
    let comment = wrap.children[0]
    expect(comment.id).toBe('1')
    expect(comment.className).toBe('comment')
    // comment should have 2 child elements, name and type
    expect(comment.children.length).toBe(2)
    expect(comment.children[0].className).toBe('name')
    expect(comment.children[1].className).toBe('type')
  });

})

describe('actions', ()=>{
  it('creates an updateComment action', ()=>{
    expect(updateComment({})).toEqual({
      type: UPDATE_COMMENT,
      comment: {}
    })
  })
})

describe('reducers', ()=>{
  it('reduces updateComment correctly', ()=> {
    let new_data = {
      ...test_data,
      name: 'Updated Name'
    }
    let action = updateComment(new_data)
    let result = commentReducer(undefined, action).comments[0]
    expect(result).toEqual({
      id: '1',
      name: 'Updated Name',
      type: 'Test Type',
      user_id: '1',
      slug: 'updated-name'
    })
  })
  it('does not allow updateComment to update protected attributes', ()=> {
    let new_data = {
      ...test_data,
      name: 'Updated Name',
      user_id: '2',
    }
    let action = updateComment(new_data)
    let result = commentReducer(undefined, action).comments[0]
    expect(result).toEqual({
      id: '1',
      name: 'Updated Name',
      type: 'Test Type',
      user_id: '1',
      slug: 'updated-name'
    })
  })
})
