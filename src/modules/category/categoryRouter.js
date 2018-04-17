import React from 'react'
import Category from './Category'
import './Category.css'
import { getSlug, titleCase } from '../app/appHelpers'
import LinkContainer from '../app/link/LinkContainer'
import { getCategoryLink, getCategories } from './categoryHelpers'

export const categoryRouter = (state, route)=> {
  if(state.app.slug){
    return (
      <Category title={`Category: ${titleCase(state.app.slug.replace(/-/g, ' '))}`}
                posts={state.post.posts.filter(p=>getSlug(p.category) == state.app.slug)}
                comments={state.comment.comments}
                sortMethod={state.app.sort.method}
                sortReversed={state.app.sort.reversed} />
    )
  }
  return (
    <div id='categories'>
      <h1>Categories </h1>
      { getCategories(state).map(c=><LinkContainer href={getCategoryLink(c)}>{c}</LinkContainer>) }
    </div>
  )
}