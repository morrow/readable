export const NAVIGATE_TO_PATH = 'NAVIGATE_TO_PATH'
export const FLASH_MESSAGE = 'FLASH_MESSAGE'


export const navigateToPath = (path)=> {
  return {
    type: NAVIGATE_TO_PATH,
    path
  }
}

export const flashMessage = (message, flash_type)=> {
  return {
    type: FLASH_MESSAGE,
    message,
    flash_type,
  }
}