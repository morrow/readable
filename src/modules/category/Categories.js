import React from 'react'
import LinkContainer from '../app/link/LinkContainer'
import { getCategoryLink } from './categoryHelpers'
import { getSlug } from '../app/appHelpers'

const Categories = props => {
  return (
    <div id='categories' className='sidebar'>
      <h2>Categories</h2>
      {
        props.categories.map(category=> {
          if(props.currentCategory === getSlug(category)){
            return <LinkContainer className='current' href={getCategoryLink(category)}>{category}</LinkContainer>
          } else {
            return <LinkContainer href={getCategoryLink(category)}>{category}</LinkContainer>
          }
        })
      }
    </div>
  )
}

export default Categories