// https://redux.js.org/docs/basics/Reducers.html

// Actions describe the fact that something happened,
// but don't specify how the application's state changes
// in response. This is the job of reducers.
import update from 'immutability-helper'
import { combineReducers } from 'redux'

import {
  ADD_BLOCK,
  ADD_BLOCK_TITLE_EXAMPLE,
  ADD_CHILD,
  REMOVE_CHILD,
  SET_CHILDREN,
  SET_CHILD_TITLE,
  ADD_CHILD_TITLE_EXAMPLE,
  TOGGLE_CHILD_TYPE,
  TOGGLE_CHILD_DRAGGING,
  TOGGLE_EXPORT,
  TOGGLE_CONFIG,
  SET_CONFIG_OPTION,
} from './actions'

function block(state = [], action) {
  switch (action.type) {

    case ADD_BLOCK:
      return {...state, ...{
        title: action.title,
        hasTitle: true,
      }}

    default:
      return state
  }
}

function examples(state = [], action) {
  switch (action.type) {

    case ADD_BLOCK_TITLE_EXAMPLE:
      return {...state, ...{ block: action.title }}

    case ADD_CHILD_TITLE_EXAMPLE:
      return {...state, ...{ child: action.title }}

    default:
      return state
  }
}

function children(state = [], action) {
  switch (action.type) {

    case ADD_CHILD:
      return [
        ...state, {
          title: action.title,
          typeId: action.typeId,
          isDragging: false,
        }
      ]

    case SET_CHILDREN:
      return action.children

    case REMOVE_CHILD: {
      return [
        ...state.filter( (item, i) => i !== action.index )
      ]
    }

    case SET_CHILD_TITLE:
      return update(state, {
        [action.index]: {
          [action.fieldName]: {
            $set: action.value
          }
        }
      })

    case TOGGLE_CHILD_TYPE:
      const actionValue =
        typeof action.value === 'undefined' ?
          (state[action.index][action.fieldName] ? 0 : 1) :
          parseInt(action.value, 10)
      return update(state, {
        [action.index]: {
          [action.fieldName]: {
            $set: actionValue
          }
        }
      })

    case TOGGLE_CHILD_DRAGGING:
      return update(state, {
        [action.index]: {
          [action.fieldName]: {
            $set: !state[action.index][action.fieldName]
          }
        }
      })

    default:
      return state
  }
}

function options(state = [], action) {
  switch (action.type) {

    case TOGGLE_EXPORT:
      return {...state, ...{ isExport: !state['isExport'] }}

    case TOGGLE_CONFIG:
      return {...state, ...{ isConfigOpen: !state['isConfigOpen'] }
    }

    default:
      return state
  }
}

function config(state = [], action) {
  switch (action.type) {

    case SET_CONFIG_OPTION:
      return update(state, {
        [action.fieldName]: {
          $set: action.value
        }
      })

    default:
      return state
  }
}

const bemgenApp = combineReducers({
  block,
  children,
  options,
  config,
  examples,
})

export default bemgenApp
