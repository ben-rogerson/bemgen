import React from 'react'
import { bemChildTypePrefix } from '../utilities/utilities'

const ExportItem = ({ type, item, listItems, blockName, index }) => {
  const typeText = bemChildTypePrefix(item.typeId)
  const prevItem = typeof listItems[index-1] !== 'undefined' ? listItems[index-1] : []
  const childPrefix = item.typeId === 1 && index > 0 ?
    (bemChildTypePrefix(prevItem.typeId) + prevItem.title) : ''

  const text = type === 'html' ?
    '<div class="' + blockName + childPrefix + typeText + item.title + '"></div>' :
    '&' + childPrefix + typeText + item.title + ' {}'
  
  return (
    <div key={index}>
      &nbsp;&nbsp;&nbsp;&nbsp;{text}<br/><br/>
    </div>
  )
}

export default ExportItem
