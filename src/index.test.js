import React from 'react'
import ReactDOM from 'react-dom'
import { render } from './index'
import { getRootElement,
         deepCopy } from './helpers'

describe('rendering', ()=>{

  it('renders successfully', ()=>{
    let root_element = getRootElement()
    let rendered_root_element = render(root_element)
    expect(root_element).toEqual(rendered_root_element)
    expect(root_element.nodeName).toBe('DIV')
    expect(root_element.id).toBe('root')
  })

})

describe('helpers', ()=>{

  it('getRootElement returns a virtual root element', ()=>{
    let root_element = getRootElement()
    expect(root_element.id).toBe('root')
    expect(root_element.nodeName).toBe('DIV')
    expect(root_element.children.length).toBe(0)
    expect(root_element.dataset.isVirtual).toBeDefined()
  })

  it('getRootElement returns DOM root element when given a valid document', ()=>{
    document.getElementById = id => {
      let div = document.createElement('div')
      div.id = id
      div.dataset = {}
      return div
    }
    let root_element = getRootElement()
    expect(root_element.dataset.isVirtual).toBeUndefined()
  })

  it('deep copies objects', ()=>{
    const original = {
      name: 'original'
    }
    let copy = deepCopy(original)
    expect(copy).toEqual(original)
    expect(copy).not.toBe(original)
    copy.name = 'copy'
    expect(original.name).toEqual('original')
    expect(copy.name).toEqual('copy')
  })


})

