import React from 'react'
import Category from './Category'
import './Category.css'
import Posts from '../post/Posts'
import { getSlug, titleCase } from '../app/appHelpers'
import LinkContainer from '../app/link/LinkContainer'
import { getCategoryLink, getCategories } from './categoryHelpers'

export const categoryRouter = (state, route)=> {
  if(state.app.slug){
    let posts = state.post.posts.filter(p=>getSlug(p.category) == state.app.slug)
    let category = posts[0].category
    let comments = state.comment.comments
    return (
      <Posts title={`Category: ${titleCase(category)}`} posts={posts} comments={comments} sortMethod={state.app.sort.method} sortReversed={state.app.sort.reversed} />

    )
  }
  return (
    <div id='categories'>
      <h1>Categories </h1>
      { getCategories(state).map(c=><LinkContainer href={getCategoryLink(c)}>{c}</LinkContainer>) }
    </div>
  )
}