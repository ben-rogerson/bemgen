import React from 'react'
import {SortableElement} from 'react-sortable-hoc'
import AutosizeInput from 'react-input-autosize'
import { applyNamingRules } from './../utilities/utilities'

const Item = SortableElement( ({ typeText, item, updateItem, removeByKey, i, isDragging }) => {

  const inputProps = {
    value: item.title,
    onChange: e => updateItem('title', applyNamingRules(e.target.value), i)
  }

  return (
    <div className={"child" + (isDragging ? ' child--is-dragging' : '') }>

      <div className="child__title">
        <div className="child__type">{typeText}</div>
      </div>

      <AutosizeInput className="child__input" maxLength="15" type="text" spellCheck="false" {...inputProps} />

      <div className="child__option-wrap">

          <label className={"child__option -element -type" + (item.typeId === 0 ? ' -is-checked' : '')
          + (i === 0 ? ' -is-disabled' : '')}>
            <input
              className="button"
              type="radio"
              value="0"
              onClick={e => updateItem('typeId', parseInt(e.target.value, 10), i)}
              name={'typeId'+i}
              defaultChecked={item.typeId === 0}
              disabled={i === 0}
            />
          </label>

          <label className={"child__option -modifier -type" + (item.typeId === 1 ? ' -is-checked' : '')
          + (i === 0 ? ' -is-disabled' : '')}>
            <input
              className="button"
              type="radio"
              value="1"
              onClick={e => updateItem('typeId', parseInt(e.target.value, 10), i)}
              name={'typeId'+i} disabled={i === 0}
            />
          </label>

        <div className="child__option">
          <button
            className="button -remove"
            onClick={() => removeByKey(i)}>
              Remove
          </button>
        </div>

      </div>

    </div>
  )
})

export default Item
