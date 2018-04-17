import { errorRouter } from '../error/errorRouter'
import { homeRouter } from '../home/homeRouter'
import { postRouter } from '../post/postRouter'
import { commentRouter } from '../comment/commentRouter'
import { categoryRouter } from '../category/categoryRouter'
import { userRouter } from '../user/userRouter'

const routers = {
  error: errorRouter,
  index:  homeRouter,
  posts: postRouter,
  comments: commentRouter,
  categories: categoryRouter,
  user: userRouter,
  users: userRouter,
}

const aliases = {
  '/login': 'session',
  '/register': 'user',
}

export const appRouter = (state, route=state.app.controller) => {
  if(state.app.path in aliases){
    route = aliases[state.app.path]
  }
  if(route && route in routers){
    let result = routers[route](state, route)
    if(result != null){
      if(result.redirect){
        return appRouter(state, result.redirect)
      }
      return result
    }
  }
  return routers.error(state)
}