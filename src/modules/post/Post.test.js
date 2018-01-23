import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import { UPDATE_POST, updatePost } from './postActions'
import { store } from '../../index'

import Post from './Post'
import postReducer from './postReducer'

const test_data = {
  id:   '1',
  name: 'Test Name',
  type: 'Test Type',
  user_id: '1',
}

const getMockPostData = (data={}) => {
  return {
    ...test_data,
    data
  }
}

describe('rendering', ()=>{

  it('renders a post', () => {
    // create wrap element
    let wrap = document.createElement('div')
    // render post into wrap
    ReactDOM.render(
      <Provider store={store}>
        <Post data={getMockPostData()} />
      </Provider>, wrap)
    // there should be one child element of wrap, post
    expect(wrap.children.length).toBe(1)
    let post = wrap.children[0]
    expect(post.id).toBe('1')
    expect(post.className).toBe('post')
    // post should have 2 child elements, name and type
    expect(post.children.length).toBe(2)
    expect(post.children[0].className).toBe('name')
    expect(post.children[1].className).toBe('type')
  });

})

describe('actions', ()=>{
  it('creates an updatePost action', ()=>{
    expect(updatePost({})).toEqual({
      type: UPDATE_POST,
      post: {}
    })
  })
})

describe('reducers', ()=>{
  it('reduces updatePost correctly', ()=> {
    let new_data = {
      ...test_data,
      name: 'Updated Name'
    }
    let action = updatePost(new_data)
    let result = postReducer(undefined, action).posts[0]
    expect(result).toEqual({
      id: '1',
      name: 'Updated Name',
      type: 'Test Type',
      user_id: '1',
      slug: 'updated-name'
    })
  })
  it('does not allow updatePost to update protected attributes', ()=> {
    let new_data = {
      ...test_data,
      name: 'Updated Name',
      user_id: '2',
    }
    let action = updatePost(new_data)
    let result = postReducer(undefined, action).posts[0]
    expect(result).toEqual({
      id: '1',
      name: 'Updated Name',
      type: 'Test Type',
      user_id: '1',
      slug: 'updated-name'
    })
  })
})
