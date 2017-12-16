import React from 'react'
import { bemChildTypePrefix } from '../utilities/utilities'
import { light } from './../utilities/utilities'

const ExportItem = ({ type, item, listItems, blockName, index }) => {

  const typeText = bemChildTypePrefix(item.typeId)
  const prevItem = typeof listItems[index-1] !== 'undefined' ? listItems[index-1] : []
  const nextItem = typeof listItems[index+1] !== 'undefined' ? listItems[index+1] : []
  const isNextItemModifier = nextItem.typeId === 1 || false
console.log(isNextItemModifier)
  const prefixHtml = blockName +
    (item.typeId === 1 && index > 0 ?
      (bemChildTypePrefix(prevItem.typeId) + prevItem.title)
      : '')
    + typeText

  const prefixScss = item.typeId === 1 && index > 0 ?
    bemChildTypePrefix(item.typeId) : typeText

  const props = {
    prefix: type === 'html' ? prefixHtml : prefixScss,
    classText: item.title,
    isModifier: item.typeId == 1,
    isNextItemModifier: isNextItemModifier
  }

  return (
    <span key={index}>
      { type === 'html' && <HtmlItem {...props} />}
      { type === 'scss' && <ScssItem {...props} />}
    </span>
  )
}

export default ExportItem


const spacing = <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
const breaking = <span><br/><br/></span>

const HtmlItem = ({prefix, classText, isModifier, isNextItemModifier}) =>
  <span>
    {isModifier &&
      <span>{' '}{light(prefix)}{classText}{light('"></div>')}{breaking}</span>
    }

    {!isModifier &&
      <span>
      {spacing}{light('<div class="' + prefix)}
        {classText}
      {!isNextItemModifier && <span>{light('"></div>')}{breaking}</span>}
      </span>
    }
  </span>

const ScssItem = ({prefix, classText, isModifier, isNextItemModifier}) =>
  <span>
    {isModifier && <span>{light('{')}{breaking}{spacing}</span>}

    {spacing}{light('&' + prefix)}{classText + ' '}
    {!isNextItemModifier && <span>{light('{}')}{breaking}</span>}

    {isModifier && <span>{spacing}{light('{')}{breaking}</span>}
  </span>
