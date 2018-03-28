export const NAVIGATE_TO_PATH = 'NAVIGATE_TO_PATH'
export const FLASH_MESSAGE = 'FLASH_MESSAGE'
export const SORT_PAGE = 'SORT_PAGE'

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

export const sortPage = (sort)=> ({
  type: SORT_PAGE,
  sort
})