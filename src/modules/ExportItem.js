import React from 'react'
import { bemChildTypePrefix } from '../utilities/utilities'
import { light } from './../utilities/utilities'

const isElement = item => item.typeId === 0
const isModifier = item => item.typeId === 1

const ExportItem = props => {

  const { type, item, listItems, blockName, index, config, isSelectorNested } = props

  const prevItem = typeof listItems[index-1] !== 'undefined' ? listItems[index-1] : []
  const nextItem = typeof listItems[index+1] !== 'undefined' ? listItems[index+1] : []
  const isNextItemModifier = nextItem.typeId == 1 || false

  const nonNestedPrefixStart = blockName +
  (item.typeId === 1 && index > 0 ?
    (bemChildTypePrefix(prevItem.typeId, config.element, config.modifier, true) + prevItem.title)
    : '')

  const prefix = type === 'html' ?
    (
      config.modifier === 'abbreviated' ?
      (item.typeId === 1 ? '' : nonNestedPrefixStart) :
      (item.typeId === 1 ? nonNestedPrefixStart : nonNestedPrefixStart)
    ) + bemChildTypePrefix(item.typeId, config.element, config.modifier, false) :
    bemChildTypePrefix(item.typeId, config.element, config.modifier, true)

  const nonNestedPrefix = '.' + nonNestedPrefixStart + prefix

  const itemProps = {
    prefix: prefix,
    classText: item.title,
    isModifier: item.typeId === 1,
    isNonBlockModifier: item.typeId === 1 && index !== 0,
    isNextItemModifier: isNextItemModifier,
    index: index,
    config: config,
    classStyle: config.html === 'classic' ? 'class' : 'className',
    isSelectorNested: isSelectorNested,
    blockName: blockName,
    scssPrefix: isSelectorNested ? '&' + prefix : nonNestedPrefix,
  }

  return (
    <span key={index}>
      { type === 'html' && <HtmlItem {...itemProps} />}
      { type === 'scss' && <ScssItem {...itemProps} />}
    </span>
  )
}

export default ExportItem

const spacing = <span>&nbsp;&nbsp;</span>
const breaking = <span><br/><br/></span>

const HtmlItem = ({prefix, classText, isModifier, isNextItemModifier, index, classStyle}) => {
  return (
    <span>
      {isModifier &&
        <span>{' '}{light(prefix)}{classText}
        {index === 0 ? <span>{light('">')}</span> : <span>{light('"></div>')}</span>}
        {breaking}</span>
      }

      {!isModifier &&
        <span>
        {spacing}{light('<div '+classStyle+'="' + prefix)}
          {classText}
        {!isNextItemModifier && <span>{light('"></div>')}{breaking}</span>}
        </span>
      }
    </span>
  )
}

const ScssItem = ({scssPrefix, classText, isNonBlockModifier, isNextItemModifier, isSelectorNested}) =>
  <span>
    {isNonBlockModifier && isSelectorNested && <span>{light('{')}{breaking}{spacing}</span>}

    {isSelectorNested ?
      <span>{spacing}{light(scssPrefix)}</span> :
      <span>{light(scssPrefix)}</span>
    }
    {classText + ' '}

    {!isNextItemModifier && isSelectorNested && <span>{light('{}')}{breaking}</span>}

    {!isSelectorNested && <span>{light('{}')}{breaking}</span>}

    {isNonBlockModifier && isSelectorNested && <span>{spacing}{light('}')}{breaking}</span>}
  </span>
