import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Link from './Link'
import LinkContainer from './LinkContainer'
import { Provider } from 'react-redux'
import { navigateToPath } from '../appActions'
import { initial_state as initial_app_state } from '../../../reducers'
import { createStore } from 'redux'
import { mapStateToProps, mapDispatchToProps } from './LinkContainer'
import appReducer from '../appReducer'
import { store } from '../../../index'
import { getAbsolutePath } from '../appHelpers'

describe('container functions', ()=>{

  it('it renders a link', ()=>{
    let ele = document.createElement('div')
    let link = ReactDOM.render(
      <Provider store={store}>
        <LinkContainer href='/test-href'>test body</LinkContainer>
      </Provider>, ele)
  })

  let default_was_prevented

  const testClick = (event, expected_path)=>{
    const dispatch = (action)=> {
      expect(action).toEqual({
        type: 'NAVIGATE_TO_PATH',
        path: getAbsolutePath(expected_path)
      })
    }
    const props = {}
    default_was_prevented = false
    mapDispatchToProps(dispatch, props).onClick(event)
    expect(default_was_prevented).toBe(true)
  }



  it('maps props to state', ()=>{
    expect(mapStateToProps({})).toEqual({})
  })

  it('gets an absolute path from a relative one', ()=>{
    let path = 'test'
    expect(getAbsolutePath(path)).toBe('/test')
  })

  it('maps a relative URL to absolute in mapsStateToProps', ()=> {
    const ownProps = {
      href: 'test'
    }
    expect(mapStateToProps({}, ownProps)).toEqual({
      href: '/test'
    })
  })

  it('navigates when clicked', ()=> {
    let link = document.createElement('a')
    link.href = 'test'
    let mock_event = {
      preventDefault: ()=>{
        default_was_prevented = true
      },
      target: link
    }
    testClick(mock_event, 'test')
  })

  it('navigates when child element is clicked', ()=> {
    let link = document.createElement('a')
    link.href = 'image-test'
    let img = document.createElement('img')
    link.appendChild(img)
    let mock_event = {
      preventDefault: ()=>{
        default_was_prevented = true
      },
      target: img
    }
    testClick(mock_event, 'image-test')
  })

})
