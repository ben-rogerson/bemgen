import React from 'react'
import { bemChildTypePrefix } from '../utilities/utilities'
import { light } from './../utilities/utilities'

const ExportItem = ({ type, item, listItems, blockName, index }) => {

  const typeText = bemChildTypePrefix(item.typeId)
  const prevItem = typeof listItems[index-1] !== 'undefined' ? listItems[index-1] : []
  const nextItem = typeof listItems[index+1] !== 'undefined' ? listItems[index+1] : []
  const isNextItemModifier = nextItem.typeId === 1 || false

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
    isModifier: item.typeId === 1,
    isNextItemModifier: isNextItemModifier,
    index: index,
  }

  return (
    <span key={index}>
      { type === 'html' && <HtmlItem {...props} />}
      { type === 'scss' && <ScssItem {...props} />}
    </span>
  )
}

export default ExportItem


const spacingSmall = <span>&nbsp;&nbsp;</span>
const breaking = <span><br/><br/></span>

const HtmlItem = ({prefix, classText, isModifier, isNextItemModifier, index}) =>
  <span>
    {isModifier &&
      <span>{' '}{light(prefix)}{classText}
      {index === 0 && <span>{light('">')}</span>}
      {index !== 0 && <span>{light('"></div>')}</span>}
      {breaking}</span>
    }

    {!isModifier &&
      <span>
      {spacingSmall}{light('<div class="' + prefix)}
        {classText}
      {!isNextItemModifier && <span>{light('"></div>')}{breaking}</span>}
      </span>
    }
  </span>

const ScssItem = ({prefix, classText, isModifier, isNextItemModifier, index}) =>
  <span>
    {isModifier && index !== 0 && <span>{light('{')}{breaking}{spacingSmall }</span>}

    {spacingSmall}{light('&' + prefix)}{classText + ' '}
    {!isNextItemModifier && <span>{light('{}')}{breaking}</span>}

    {isModifier && index !== 0 && <span>{spacingSmall}{light('}')}{breaking}</span>}
  </span>
