import React from 'react'
import {SortableElement} from 'react-sortable-hoc'
import AutosizeInput from 'react-input-autosize'
import { applyNamingRules, enterKey } from '../utilities/utilities'

import {
  removeChild,
  toggleChildType,
  updateChildTitle,
} from '../actions'

const Item = SortableElement( props => {

  const { typeText, title, typeId, i, isDragging, dispatch } = props

  let input = []

  const inputProps = {
    value: title,
    onChange: e => dispatch( updateChildTitle(i, applyNamingRules(e.target.value)) ),
    onKeyDown: e => {
      if (e.which === enterKey && e.target.value.length > 0) e.target.blur()
    },
    onBlur: e => (e.target.value === '') ? dispatch( removeChild(i) ) : null,
    ref: x => input[i] = x,
    onMouseEnter: e => {
      e.target.selectionStart = e.target.selectionEnd = e.target.value.length
      input[i].focus()
    }
  }

  return (
    <div className={"child" + (isDragging ? ' child--is-dragging' : '') }>

      <div className="child__title">
        <div className="child__type">{typeText}</div>
      </div>

      <AutosizeInput className="child__input" maxLength="15" type="text" spellCheck="false" {...inputProps} />

      <div className="child__option-wrap">

          <label className={"child__option -element -type" + (typeId === 0 ? ' -is-checked' : '')}>
            <input
              className="button"
              type="radio"
              value="0"
              onClick={() => dispatch( toggleChildType(i) )}
              name={'typeId'+i}
              defaultChecked={typeId === 0}
            />
          </label>

          <label className={"child__option -modifier -type" + (typeId === 1 ? ' -is-checked' : '')}>
            <input
              className="button"
              type="radio"
              value="1"
              onClick={() => dispatch( toggleChildType(i) )}
              name={'typeId'+i}
            />
          </label>

        <div className="child__option">
          <button
            className="button -remove"
            onClick={() => dispatch( removeChild(i) ) }>
              Remove
          </button>
        </div>

      </div>

    </div>
  )
})

export default Item
