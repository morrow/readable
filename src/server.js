'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var fs = require('fs');
var http = require('http');
var crypto = require('crypto');

var APP_PORT = 3000;
var SERVER_PORT = 3001;

var initial_app_state = {
  user: {
    users: []
  },
  post: {
    posts: []
  },
  comment: {
    comments: []
  }
};

var LOG_FILE = 'src/db/actions.log';

var createStore = function createStore(initial_app_state) {
  var state = initial_app_state;
  const setState = function setState(s) {
    return state = s;
  }
  const getState = function getState() {
    return state;
  };
  return { getState: getState, setState: setState };
};

var reduce = function reduce() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initial_app_state;
  var action = arguments[1];

  var state_copy = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'UPDATE_POST':
      var posts = state_copy.post.posts.map(function (p) {
        if (p.id == action.post.id) {
          ['title', 'category', 'body', 'slug'].map(function (attribute) {
            p[attribute] = action.post[attribute];
          });
        }
        return p;
      });
      return _extends({}, state, {
        post: {
          posts: posts
        }
      });
      break;
    case 'CREATE_POST':
      return _extends({}, state, {
        post: {
          posts: [].concat(_toConsumableArray(state.post.posts), [action.post])
        }
      });
      break;
    case 'UPVOTE_POST':
      var posts = state_copy.post.posts.map(function (p) {
        if (parseInt(p.id) === parseInt(action.vote.target)) {
          p.score = parseInt(p.score) + 1;
        }
        return p;
      });
      return _extends({}, state, {
        post: {
          posts: posts
        }
      });
      break;
    case 'DOWNVOTE_POST':
      var posts = state_copy.post.posts.map(function (p) {
        if (parseInt(p.id) === parseInt(action.vote.target)) {
          p.score = parseInt(p.score) - 1;
        }
        return p;
      });
      return _extends({}, state, {
        post: {
          posts: posts
        }
      });
      break;
    case 'DELETE_POST':
      return _extends({}, state, {
        post: {
          posts: state_copy.post.posts.filter(function (p) {
            return parseInt(p.id) != parseInt(action.post.id);
          })
        }
      });
      break;
    case 'CREATE_COMMENT':
      return _extends({}, state, {
        comment: {
          comments: [].concat(_toConsumableArray(state.comment.comments), [action.comment])
        }
      });
      break;
    case 'UPVOTE_COMMENT':
      return _extends({}, state, {
        comment: {
          comments: state_copy.comment.comments.map(function (c) {
            if (parseInt(c.id) === parseInt(action.vote.target)) {
              c.score = parseInt(c.score) + 1;
            }
            return c;
          })
        }
      });
      break;
    case 'DOWNVOTE_COMMENT':
      return _extends({}, state, {
        comment: {
          comments: state_copy.comment.comments.map(function (c) {
            if (parseInt(c.id) === parseInt(action.vote.target)) {
              c.score = parseInt(c.score) - 1;
            }
            return c;
          })
        }
      });
      break;
    case 'DELETE_COMMENT':
      return _extends({}, state, {
        comment: {
          comments: state_copy.comment.comments.filter(function (c) {
            return parseInt(c.id) != parseInt(action.comment.id);
          })
        }
      });
      break;
    case 'CREATE_USER':
      return _extends({}, state, {
        user: {
          users: [].concat(_toConsumableArray(state_copy.user.users), [action.user])
        }
      });
      break;
    case 'INCREASE_COMMENT_TOTAL':
      return _extends({}, state, {
        post: {
          posts: state_copy.post.posts.map(function (p) {
            if (parseInt(p.id) === parseInt(action.post_id)) {
              p.comment_total = parseInt(p.comment_total) + 1;
            }
            return p;
          })
        }
      });
      break;
    case 'DECREASE_COMMENT_TOTAL':
      return _extends({}, state, {
        post: {
          posts: state_copy.post.posts.map(function (p) {
            if (parseInt(p.id) === parseInt(action.post_id)) {
              p.comment_total = parseInt(p.comment_total) - 1;
            }
            return p;
          })
        }
      });
      break;
    case 'DELETE_COMMENTS':
      return _extends({}, state, {
        comment: {
          comments: state_copy.comment.comments.filter(function (c) {
            return parseInt(c.post_id) != parseInt(action.post_id);
          })
        }
      });
      break;
  }
  return _extends({}, state);
};

var dispatch = function dispatch(action) {
  var old_state = store.getState();
  var new_state = reduce(old_state, action);
  store.setState(new_state);
  console.log('action dispatched: ', JSON.stringify(action, null, 2));
  console.log('======================================================');
  return new_state;
};

var createUser = function createUser(state) {
  return {
    token: crypto.randomBytes(32).toString('hex'),
    id: state.user.users.length + 1
  };
};

var store = createStore(initial_app_state);

// load actions from log
if (fs.existsSync(LOG_FILE)) {
  console.log('Loading actions from log file to re-construct server state');
  var actions = fs.readFileSync(LOG_FILE, 'utf8').split('\n').filter(function (a) {
    return a != '';
  });
  actions.forEach(function (a) {
    return dispatch(JSON.parse(a));
  });
  console.log('Server state reconstructed from log. Opening browser to localhost://' + APP_PORT + ' now...');
}

// create log
var stream = fs.createWriteStream(LOG_FILE, { flags: 'a' });

var saveAction = function saveAction(action) {
  return stream.write(JSON.stringify(action) + "\n");
};

var server = http.createServer(function (req, res) {
  var state = store.getState();
  var session_id = undefined;
  var status = 500;
  var options = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:' + APP_PORT,
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Authorization,Content-Type,X-Timestamp'
  };
  Object.keys(options).map(function (key) {
    return res.setHeader(key, options[key]);
  });
  if (req.url == '/user') {
    var user = createUser(state);
    var action = _extends({
      type: 'CREATE_USER'
    }, user);
    dispatch(action);
    saveAction(action);
    res.writeHead(200);
    res.end(JSON.stringify(user));
  } else if (req.url == '/sync') {
    res.writeHead(200);
    res.end(JSON.stringify({
      hash: crypto.createHash('md5').update(JSON.stringify(state, null, 0)).digest('hex')
    }));
  } else if (req.url == '/state') {
    if (req.method == 'OPTIONS') {
      res.end(JSON.stringify(options, null, 2).slice(1, -1).replace(/"/g, '').replace(/,\n/g, '\n'));
    }
    if (req.method == 'GET') {
      res.end(JSON.stringify(state, null, 2));
    } else if (req.method == 'POST') {
      var body = '';
      req.on('data', function (data) {
        body += data;
      });
      req.on('end', function () {
        if (body != '') {
          res.writeHead(200);
          var _action = JSON.parse(body);
          var result = dispatch(_action);
          saveAction(_action);
          res.end(JSON.stringify(result));
        } else {
          res.end(JSON.stringify({ 500: 'error' }));
        }
      });
    }
  }
});

server.listen(SERVER_PORT);