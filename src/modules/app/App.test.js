import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import App from './App'
import Header from './header/Header'
import Main from './main/Main'
import Footer from './footer/Footer'
import { NAVIGATE_TO_PATH, navigateToPath } from './appActions'
import { initial_app_state } from './appReducer'
import { store } from '../../index'
import { parsePath } from './appHelpers'

import appReducer from './appReducer'

describe('rendering', ()=>{

  it('renders app', () => {
    // create wrap element
    let wrap = document.createElement('div')
    // render app into wrap
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>, wrap)
    // there should be one child element of wrap, app
    expect(wrap.children.length).toBe(1)
    let app = wrap.children[0]
    expect(app.id).toBe('app')
    // app should have 3 child elements, header, main, and footer
    expect(app.children.length).toBe(3)
    expect(app.children[0].nodeName).toBe('HEADER')
    expect(app.children[1].nodeName).toBe('MAIN')
    expect(app.children[2].nodeName).toBe('FOOTER')
  });

  it('renders header', ()=> {
    let wrap = document.createElement('div')
    ReactDOM.render(
      <Provider store={store}>
        <Header />
      </Provider>, wrap)
    expect(wrap.children.length).toBe(1)
    let header = wrap.children[0]
    expect(header.nodeName).toBe('HEADER')
  })

  it('renders main', ()=> {
    let wrap = document.createElement('div')
    ReactDOM.render(
      <Provider store={store}>
        <Main />
      </Provider>, wrap)
    expect(wrap.children.length).toBe(1)
    let main = wrap.children[0]
    expect(main.nodeName).toBe('MAIN')
  })

  it('render footer', ()=>{
    let wrap = document.createElement('div')
    ReactDOM.render(<Main />, wrap)
    expect(wrap.children.length).toBe(1)
    let main = wrap.children[0]
    expect(main.nodeName).toBe('MAIN')
  })

})

describe('actions', ()=>{
  it('creates an navigateToPath action', ()=>{
    let path = '/test'
    expect(navigateToPath(path)).toEqual({
      type: NAVIGATE_TO_PATH,
      path: path
    })
  })
})

describe('reducers', ()=>{
  it('reduces navigateToPath correctly', ()=> {
    let path = '/test'
    let action = navigateToPath(path)
    let result = appReducer(undefined, action)
    expect(result).toEqual({
      action: 'index',
      controller: 'test',
      flash: null,
      id: undefined,
      path
    })
  })
})

describe('action helpers', ()=>{

  it('parses index path correctly', ()=>{
    let path = '/'
    expect(parsePath(path)).toEqual({
      controller: 'index',
      action: 'show',
      id: undefined,
      slug: undefined,
    })
  })

  it('parses components path correctly', ()=>{
    let expected_result = {
      controller: 'components',
      action: 'index',
      id: undefined,
      slug: undefined,
    }
    expect(parsePath('/components')).toEqual(expected_result)
    expect(parsePath('/components/')).toEqual(expected_result)
    expect(parsePath('/components/1')).toEqual({
      ...expected_result,
      id: '1',
      action: 'show'
    })
    expect(parsePath('/components/1/edit')).toEqual({
      ...expected_result,
      id: '1',
      action: 'edit'
    })
    expect(parsePath('/components/new')).toEqual({
      ...expected_result,
      id: undefined,
      action: 'new'
    })
    expect(parsePath('/components/test-name')).toEqual({
      ...expected_result,
      id: undefined,
      slug: 'test-name',
      action: 'show',
    })
  })



})
