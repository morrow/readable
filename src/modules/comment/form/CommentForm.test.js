import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import { UPDATE_POST, updateComment } from '../commentActions'
import { store } from '../../../index'

import Comment from '../Comment'
import CommentForm from './CommentForm'
import CommentFormContainer from './CommentFormContainer'
import commentReducer from '../commentReducer'

const test_data = {
  id:   '1',
  name: 'Test Name',
  type: 'Test Type'
}

const getMockCommentData = (data={}) => {
  return {
    ...test_data,
    data
  }
}

describe('render', ()=>{

  it('renders form', ()=> {
    let wrap = document.createElement('div')
    let form_data = getMockCommentData()
    ReactDOM.render(
      <Provider store={store}>
        <CommentForm data={form_data}/>
      </Provider>, wrap)
    expect(wrap.children.length).toBe(1)
    let form = wrap.children[0]
    expect(form.nodeName).toBe('FORM')
    expect(form.children.length).toBe(6)
  })

  it('renders CommentFormContainer', ()=>{
    let wrap = document.createElement('div')
    let mock_data = getMockCommentData()
    ReactDOM.render(
      <Provider store={store}>
        <CommentFormContainer data={mock_data} />
      </Provider>, wrap)
    expect(wrap.children.length).toBe(1)
  })

})