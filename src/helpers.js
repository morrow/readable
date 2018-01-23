
export const getRootElement = ()=>{
  let root_element
  if(document.getElementById('root')){
    root_element = document.getElementById('root')
  } else {
    root_element = document.createElement('div')
    root_element.id = 'root'
    root_element.dataset = {
      isVirtual: true
    }
  }
  return root_element
}

export const deepCopy = obj => JSON.parse(JSON.stringify(obj))