var fs = require('fs')
var http = require('http')
var crypto = require('crypto')

const APP_PORT = 3000
const SERVER_PORT = 3001

const initial_app_state = {
  user: {
    users: [],
  },
  post: {
    posts: [],
  },
  comment: {
    comments: [],
  },
}

const LOG_FILE = 'src/db/actions.log'

const createStore = (initial_app_state)=> {
  var state = initial_app_state
  setState = (s) => state = s,
  getState = ( ) => state
  return { getState, setState }
}

const reduce = (state=initial_app_state, action) => {
  var state_copy = JSON.parse(JSON.stringify(state))
  switch(action.type){
    case 'UPDATE_POST':
      var posts = state_copy.post.posts.map(p => {
        if(p.id == action.post.id){
          ['title', 'category', 'body', 'slug'].map(attribute => {
            p[attribute] = action.post[attribute]
          })
        }
        return p
      })
      return {
        ...state,
        post: {
          posts
        }
      }
    break;
    case 'CREATE_POST':
      return {
        ...state,
        post: {
          posts: [...state.post.posts,
                action.post]
        }
      }
    break
    case 'UPVOTE_POST':
      var posts = state_copy.post.posts.map(p => {
        if(parseInt(p.id) === parseInt(action.vote.target)){
          p.score = parseInt(p.score) + 1
        }
        return p
      })
      return {
        ...state,
        post: {
          posts
        }
      }
    break
    case 'DOWNVOTE_POST':
      var posts = state_copy.post.posts.map(p => {
        if(parseInt(p.id) === parseInt(action.vote.target)){
          p.score = parseInt(p.score) - 1
        }
        return p
      })
      return {
        ...state,
        post: {
          posts
        }
      }
    break
    case 'DELETE_POST':
      return {
        ...state,
        post: {
          posts: state_copy.post.posts.filter(p=> parseInt(p.id) != parseInt(action.post.id))
        }
      }
    break
    case 'CREATE_COMMENT':
      return {
        ...state,
        comment: {
          comments: [...state.comment.comments,
                action.comment]
        }
      }
    break
    case 'UPVOTE_COMMENT':
      return {
        ...state,
        comment: {
          comments: state_copy.comment.comments.map(c => {
            if(parseInt(c.id) === parseInt(action.vote.target)){
              c.score = parseInt(c.score) + 1
            }
            return c
          })
        }
      }
    break
    case 'DOWNVOTE_COMMENT':
      return {
        ...state,
        comment: {
          comments: state_copy.comment.comments.map(c => {
            if(parseInt(c.id) === parseInt(action.vote.target)){
              c.score = parseInt(c.score) - 1
            }
            return c
          })
        }
      }
    break
    case 'DELETE_COMMENT':
      return {
        ...state,
        comment: {
          comments: state_copy.comment.comments.filter(c=> parseInt(c.id) != parseInt(action.comment.id))
        }
      }
    break
    case 'CREATE_USER':
      return {
        ...state,
        user: {
          users: [
            ...state_copy.user.users,
            action.user
          ]
        }
      }
    break
    case 'INCREASE_COMMENT_TOTAL':
      return {
        ...state,
        post: {
          posts: state_copy.post.posts.map(p => {
            if(parseInt(p.id) === parseInt(action.post_id)){
              p.comment_total = parseInt(p.comment_total) + 1
            }
            return p
          })
        }
      }
    break
    case 'DECREASE_COMMENT_TOTAL':
      return {
        ...state,
        post: {
          posts: state_copy.post.posts.map(p => {
            if(parseInt(p.id) === parseInt(action.post_id)){
              p.comment_total = parseInt(p.comment_total) - 1
            }
            return p
          })
        }
      }
    break
    case 'DELETE_COMMENTS':
      return {
        ...state,
        comment: {
          comments: state_copy.comment.comments.filter(c=> parseInt(c.post_id) != parseInt(action.post_id))
        }
      }
    break
  }
  return {
    ...state,
  }
}

const dispatch = (action)=> {
  let old_state = store.getState()
  let new_state = reduce(old_state, action)
  store.setState(new_state)
  console.log('action dispatched: ', JSON.stringify(action, null, 2))
  console.log('======================================================')
  return new_state
}

const createUser = state => ({
  token: crypto.randomBytes(32).toString('hex'),
  id: state.user.users.length + 1,
})

const store = createStore(initial_app_state)

// load actions from log
if(fs.existsSync(LOG_FILE)){
  console.log('Loading actions from log file to re-construct server state')
  let actions = fs.readFileSync(LOG_FILE, 'utf8').split('\n').filter(a=>a!='')
  actions.forEach(a=>dispatch(JSON.parse(a)))
  console.log(`Server state reconstructed from log. Opening browser to localhost://${APP_PORT} now...`)
}

// create log
var stream = fs.createWriteStream(LOG_FILE, {flags:'a'})

const saveAction = action => stream.write(JSON.stringify(action) + "\n")

var server = http.createServer((req, res)=> {
  const state = store.getState()
  let session_id = undefined
  var status = 500
  const options = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': `http://localhost:${APP_PORT}`,
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Authorization,Content-Type,X-Timestamp',
  }
  Object.keys(options).map(key=> res.setHeader(key, options[key]))
  if(req.url == '/user'){
    let user = createUser(state)
    let action = {
      type: 'CREATE_USER',
      ...user,
    }
    dispatch(action)
    saveAction(action)
    res.writeHead(200)
    res.end(JSON.stringify(user))
  }
  else if(req.url == '/sync'){
    res.writeHead(200)
    res.end(JSON.stringify({
      hash: crypto.createHash('md5').update(JSON.stringify(state, null, 0)).digest('hex')
    }))
  }
  else if(req.url == '/state'){
    if(req.method == 'OPTIONS'){
      res.end(JSON.stringify(options, null, 2).slice(1,-1).replace(/"/g, '').replace(/,\n/g, '\n'))
    }
    if(req.method == 'GET'){
      res.end(JSON.stringify(state, null, 2))
    }
    else if(req.method == 'POST'){
      var body = ''
      req.on('data', function (data) {
        body += data;
      })
      req.on('end', ()=>{
        if(body != ''){
          res.writeHead(200)
          let action = JSON.parse(body)
          var result = dispatch(action)
          saveAction(action)
          res.end(JSON.stringify(result))
        } else {
          res.end(JSON.stringify({500:'error'}))
        }
      })
    }
  }
})

server.listen(SERVER_PORT)