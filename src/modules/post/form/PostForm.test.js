import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import { UPDATE_POST, updatePost } from '../postActions'
import { store } from '../../../index'

import Post from '../Post'
import PostForm from './PostForm'
import PostFormContainer from './PostFormContainer'
import postReducer from '../postReducer'

const test_data = {
  id:   '1',
  name: 'Test Name',
  type: 'Test Type'
}

const getMockPostData = (data={}) => {
  return {
    ...test_data,
    data
  }
}

describe('render', ()=>{

  it('renders form', ()=> {
    let wrap = document.createElement('div')
    let form_data = getMockPostData()
    ReactDOM.render(
      <Provider store={store}>
        <PostForm data={form_data}/>
      </Provider>, wrap)
    expect(wrap.children.length).toBe(1)
    let form = wrap.children[0]
    expect(form.nodeName).toBe('FORM')
    expect(form.children.length).toBe(6)
  })

  it('renders PostFormContainer', ()=>{
    let wrap = document.createElement('div')
    let mock_data = getMockPostData()
    ReactDOM.render(
      <Provider store={store}>
        <PostFormContainer data={mock_data} />
      </Provider>, wrap)
    expect(wrap.children.length).toBe(1)
  })

})