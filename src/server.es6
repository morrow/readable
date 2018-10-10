const fs = require('fs')
const url = require('url')
const path = require('path')
const http = require('http')
const crypto = require('crypto')

const SERVER_PORT = process.argv[2] || 3000

const LOG_FILE = 'db/actions.log'

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
    break
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

// load initial actions from log
if(fs.existsSync(LOG_FILE)){
  console.log('Loading actions from log file to re-construct server state')
  let actions = fs.readFileSync(LOG_FILE, 'utf8').split('\n').filter(a=>a!='')
  actions.forEach(a=>dispatch(JSON.parse(a)))
  console.log(`Server state reconstructed from log. Opening browser to localhost://${SERVER_PORT} now...`)
}

// create log
var stream = fs.createWriteStream(LOG_FILE, {flags:'a'})

const saveAction = action => stream.write(JSON.stringify(action) + "\n")

// serve file
const serveFile = (req, res)=> {
  // extract URL path
  let pathname = 'build' + url.parse(req.url, true).path
  // get extension
  let extension = pathname.split('.')[pathname.split('.').length - 1]
  // set initial content type
  var content_type = 'text/plain'
  // maps file extention to MIME typere
  let content_type_extensions = {
    'html':  'text/html',
    'js':    'text/javascript',
    'css':   'text/css',
    'json':  'application/json',
    'ico':   'image/x-icon',
    'png':   'image/png',
    'jpg':   'image/jpeg',
    'svg':   'image/svg+xml',
  }
  // check if file exists
  fs.exists(pathname, function (exist) {
    if(!exist) {
      // file is not found, return index
      extension = 'html'
      pathname = 'build/index.html'
    }
    // if is a directory search for index file matching the extention
    else if (fs.statSync(pathname).isDirectory()){
      extension = 'html'
      pathname += 'index.' + extension
    }
    // read file from file system
    fs.readFile(pathname, function(err, data){
      if(err){
        // 500 internal server error
        res.statusCode = 500
        res.end(`Error loading file: ${err}.`)
      } else {
        // file is found, set Content-type and send data
        if(content_type_extensions[extension]){
          content_type = content_type_extensions[extension]
        }
        res.setHeader('Content-Type',  content_type)
        res.end(data)
      }
    })
  })
}

// route request
const route = (req, res, state)=>{
  // define routes
  let routes = {
    '/user': ()=> {
      let user = createUser(state)
      let action = {
        type: 'CREATE_USER',
        ...user,
      }
      dispatch(action)
      saveAction(action)
      res.setHeader('Content-Type', 'application/json')
      res.writeHead(200)
      res.end(JSON.stringify(user))
    },
    '/sync': ()=> {
      res.setHeader('Content-Type', 'application/json')
      res.writeHead(200)
      res.end(JSON.stringify({
        hash: crypto.createHash('md5').update(JSON.stringify(state, null, 0)).digest('hex')
      }))
    },
    '/state': ()=> {
      res.setHeader('Content-Type', 'application/json')
      let methods = {
        'OPTIONS': ()=>{
          res.writeHead(200)
          res.end(JSON.stringify(options, null, 2).slice(1,-1).replace(/"/g, '').replace(/,\n/g, '\n'))
        },
        'GET': ()=> {
          res.writeHead(200)
          res.end(JSON.stringify(state, null, 2))
        },
        'POST': ()=> {
          var body = ''
          req.on('data', function (data) {
            body += data
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
      if(req.method in methods){
        methods[req.method]()
      } else {
        res.end(JSON.stringnify({400:'Bad Request'}))
      }
    }
  }
  // route or serve file
  if(req.url in routes){
    routes[req.url]()
  } else {
    serveFile(req, res)
  }
}

// create server
var server = http.createServer((req, res)=> {
  const state = store.getState()
  // set headers
  const options = {
    'Access-Control-Allow-Origin': `http://localhost:${SERVER_PORT}`,
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Authorization,Content-Type,X-Timestamp',
  }
  Object.keys(options).map(key=> res.setHeader(key, options[key]))
  // route request
  route(req, res, state)
})

server.listen(SERVER_PORT)
