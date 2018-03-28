import { getSlug, titleCase } from '../app/appHelpers'

export const getCategoryLink = (input)=> `/categories/${getSlug(input)}`

export const getCategories = state => state.post.posts.map(p=>titleCase(p.category)).filter((c,i,a)=>c!='' && a.indexOf(c) == i)