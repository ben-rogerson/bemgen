// https://redux.js.org/docs/basics/Actions.html

// Actions are payloads of information that send data
// from your application to your store.

/*
 * action types
 */

export const ADD_BLOCK               = 'ADD_BLOCK'
export const ADD_BLOCK_TITLE_EXAMPLE = "ADD_BLOCK_TITLE_EXAMPLE"
export const ADD_CHILD               = 'ADD_CHILD'
export const SET_CHILDREN            = 'SET_CHILDREN'
export const REMOVE_CHILD            = 'REMOVE_CHILD'
export const ADD_CHILD_TITLE_EXAMPLE = "ADD_CHILD_TITLE_EXAMPLE"
export const TOGGLE_CHILD_TYPE       = 'TOGGLE_CHILD_TYPE'
export const SET_CHILD_TITLE         = 'SET_CHILD_TITLE'
export const TOGGLE_CHILD_DRAGGING   = 'TOGGLE_CHILD_DRAGGING'
export const TOGGLE_EXPORT           = "TOGGLE_EXPORT"
export const TOGGLE_CONFIG           = "TOGGLE_CONFIG"
export const SET_CONFIG_OPTION       = "SET_CONFIG_OPTION"


/*
 * action creators
 */

export function addBlock(title) {
  return {type: ADD_BLOCK, title}
}

export function addBlockTitleExample(title) {
  return {type: ADD_BLOCK_TITLE_EXAMPLE, title}
}

export function addChild(title, typeId = 0) {
  return {type: ADD_CHILD, title, typeId}
}

export function updateChildren(children) {
  return {type: SET_CHILDREN, children}
}

export function updateChildTitle(index, value) {
  return {type: SET_CHILD_TITLE, index, value, fieldName: 'title'}
}

export function removeChild(index) {
  return {type: REMOVE_CHILD, index}
}

export function toggleChildType(index, value) {
  return {type: TOGGLE_CHILD_TYPE, index, value, fieldName: 'typeId'}
}

export function toggleChildDragging(index) {
  return {type: TOGGLE_CHILD_DRAGGING, index, fieldName: 'isDragging'}
}

export function addChildTitleExample(title) {
  return {type: ADD_CHILD_TITLE_EXAMPLE, title}
}

export function toggleExport(exported) {
  return {type: TOGGLE_EXPORT, exported}
}

export function toggleConfig(config) {
  return {type: TOGGLE_CONFIG, config}
}


export function setConfigOption(fieldName, value) {
  return {type: SET_CONFIG_OPTION, fieldName, value}
}
