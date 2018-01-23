import React from 'react'
import './Link.css'

const Link = (props) => {
  return <a className={props.className}
            onClick={props.onClick}
            href={props.href}> {props.children} </a>
}

export default Link