export const getContainingElement = (element, selector)=>{
  if(element == null){
    return element
  }
  if(selector[0] === '#' && element.id === selector.slice(1)){
    return element
  }
  else if(selector[0] === '.' && element.className === selector.slice(1)){
    return element
  }
  else if(selector.toLowerCase() == element.nodeName.toLowerCase() ){
    return element
  }
  return getContainingElement(element.parentNode, selector)
}

export const processForm = form => {
  let obj = {}
  Array.from(form.elements)
    .filter(element => element.name && element.name != '')
    .forEach(element=> obj[element.name] = element.value)
  return obj
}

export const deepCopy = input => Object.assign((input instanceof Array ? [] : {}), input)

export const timeSince = (date)=>{
  var seconds = Math.floor((new Date() - date) / 1000)
  let times = [1, 60, 3600, 86400, 2592000, 31536000]
  let labels = ['second', 'minute', 'hour', 'day', 'month', 'year']
  var i = times.length - 1
  while(i >= 0){
    let interval = seconds / times[i]
    if(seconds < 1){
      return 'Just now'
    } else if(Math.floor(interval) === 1) {
      return `1 ${labels[i]} ago`
    } else if(interval > 1){
      return `${Math.floor(interval)} ${labels[i]}s ago`
    }
    i--
  }
}


export const capitalize = input => input ? input[0].toUpperCase() + input.slice(1) : ''

export const titleCase = input => input.toLowerCase().split(' ').map(s=>capitalize(s)).join(' ')

export const getDiff = (unordered_a, unordered_b)=> {
  if(unordered_a == undefined){
    return {
      before: unordered_a,
      after: unordered_b
    }
  }
  let diff = {}
  let a = {}
  let b = {}
  Object.keys(unordered_a).sort().map(k=> a[k] = unordered_a[k])
  Object.keys(unordered_b).sort().map(k=> b[k] = unordered_b[k])
  for(let key in a){
    if(JSON.stringify(a[key]) != JSON.stringify(b[key])){
      if(a[key] instanceof Object && b[key] instanceof Object){
        diff[key] = getDiff(a[key], b[key])
      } else if(a[key] && b[key]){
        diff[key] = {
          before: a[key],
          after: b[key],
        }
      }
    }
  }
  return diff
}

export const getAbsolutePath = path => {
  if(!!!path || path[0] == '/'){
    return path
  } else {
    return `${window.location.pathname}/${path}`.replace(/\/\//g, '/')
  }
}

export const getCurrentUser = ()=> window.localStorage['current_user'] === undefined ? {} : JSON.parse(window.localStorage['current_user'])

//export const isAuthorizedToUpdate = (obj, user=getCurrentUser())=> parseInt(obj.user_id) === parseInt(user.id)
export const isAuthorizedToUpdate = ()=> true
export const parsePath = path => {
  let parts = path.split('/').filter(p=>p!=='')
  var parsed = {
    controller: 'error',
    action: 'show',
    id: undefined,
    slug: undefined,
  }
  if(parts.length === 0){
    parsed.controller = 'index'
  }
  else if(parts.length === 1){
    parsed.controller = parts[0]
    parsed.action = 'index'
  }
  else if(parts.length === 2){
    parsed.controller = parts[0]
    if(parts[1] === 'new'){
      parsed.action = 'new'
    } else {
      if(parsed.controller == 'categories'){
        parsed.slug = parts[1]
      } else {
        parsed.id = parts[1].split('-')[0]
        parsed.slug = parts[1].split('-').slice(1).join('-')
      }
    }
  }
  else if(parts.length === 3){
    parsed.controller = parts[0]
    if(parts[1].indexOf('-') >= 0){
      parsed.id = parts[1].split('-')[0]
      parsed.slug = parts[1].split('-').slice(1).join('-')
    } else {
      parsed.id = parts[1]
    }
    parsed.action = parts[2]
  }
  return parsed
}

export const getSlug = (input, id) => {
  if(input === undefined ){
    return ''
  }
  let slug = input.toLowerCase().replace(/ /g, '-')
  if(id){
    return [id, slug].join('-')
  }
  return slug
}

export const getIdFromPath = (path)=> {
  let paths = path.split('/').filter(p => p != '')
  if(paths.length > 0){
    return paths[1]
  }
}

export const getControllerFromPath = (path)=> {
  let controller = 'error'
  let paths = path.split('/').filter(p => p != '')
  if(paths.length === 0){
    return 'home'
  }
  return paths[0]
}

export const getActionFromPath = (path)=> {
  let paths = path.split('/').filter(p => p != '')
  if(paths.length == 3){
    if(['edit','delete'].indexOf(paths[2])){
      return paths[2]
    }
    return 'show'
  }
  if(paths.length == 2){
    return 'show'
  }
  if(paths.length == 1){
    return 'index'
  }
}