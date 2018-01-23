var crypto = require('crypto')
var http = require('http')

var users = {}

var sessions = {}

var activity = {}

var tokens = []

var posts = {}

var comments = {}

const generateRandom = (length=20)=> crypto.randomBytes(length).toString('hex')

const generateSession = (req, res)=> {
  let username = req.body.username
  let password = req.body.password
  if(username in users && users[username].password == password){
    status = 200
    let start = new Date().getTime()
    let expires = start + 60 * 60 * 1000
    let key = generateRandom()
    let session = {
      user:  req.body.username,
      key:   generateRandom(),
      start,
      expires
    }
    let hash = crypto.createHmac('sha1', key).update(JSON.stringify(session)).digest('hex')
    sessions[hash] = session
    response = {
      hash
    }
  } else {
    status = 401
    response = {
      error: '401 not authorized'
    }
  }
  res.writeHead(status)
  res.end(JSON.stringify(response))
}

const generateToken = (req, res)=> {
  let token = generateRandom(32)
  if(tokens.indexOf(token)>=0){
    generateToken(req, res)
  } else {
    tokens.push(token)
    users[tokens.length] = token
    res.writeHead(200)
    res.end(JSON.stringify({
      token,
      id: tokens.length,
    }))
  }
}

const verifySession = (req, res)=> {
  status = 200
  res.writeHead(status)
  res.end(JSON.stringify(response))
}

const registerUser = (req, res)=> {
  let user = {
    username: req.body.username,
    password: req.body.password
  }
  users[user.username] = user
  status = 200
  res.writeHead(status)
  res.end(JSON.stringify({username: user.username}))
}

var server = http.createServer((req, res)=> {
  let session_id = undefined
  var status = 500
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if(req.url == '/token'){
    generateToken(req, res)
  }
})

server.listen(3001)