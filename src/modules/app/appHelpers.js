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

export const getSlug = input => {
  try {
    return input.toLowerCase().replace(/ /g, '-')
  } catch(e){
    console.log('error getting slug for ', input)
    return ''
  }
}

export const capitalize = input => input[0].toUpperCase() + input.slice(1)

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
      } else {
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

export const isAuthorizedToUpdate = (user, obj)=> parseInt(obj.user_id) === parseInt(user.id)

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
    } else if(parseInt(parts[1]).toString().length === parts[1].length){
      parsed.id = parts[1]
    } else {
      parsed.slug = parts[1]
    }
  }
  else if(parts.length === 3){
    parsed.controller = parts[0]
    if(parseInt(parts[1]).toString().length === parts[1].length){
      parsed.id = parts[1]
    } else {
      parsed.slug = parts[1]
    }
    parsed.action = parts[2]
  }
  return parsed
}

export const getIdFromPath = (path)=> {
  let paths = path.split('/').filter(p => p != '')
  if(paths.length > 0){
    return paths[1]
  }
}

export const getSlugFromPath = (path)=> {
  let id = getIdFromPath(path)
  if(parseInt(id).toString().length === id.length){
    return null
  }
  return id
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