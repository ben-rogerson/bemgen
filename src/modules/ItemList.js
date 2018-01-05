import React from 'react'
import {SortableContainer} from 'react-sortable-hoc'
import { bemChildTypePrefix } from './../utilities/utilities'
import ItemContainer from '../containers/ItemContainer';

const ItemList = SortableContainer( props => {

  const { children } = props
  const noItems = children.length === 0

  return (
    <div className="child-list">
      { children.map( (item, index) => {

        const prevItem = (typeof children[index-1] !== 'undefined') ?
          children[index-1] : []
        const childPrefix = item.typeId === 1 && index > 0 ?
          (bemChildTypePrefix(prevItem.typeId) + prevItem.title) :
          ''
        const itemProps = {
          typeText: childPrefix + bemChildTypePrefix(item.typeId),
          title: item.title,
          typeId: item.typeId,
          i: index,
          isDragging: item.isDragging,
        }

        return <ItemContainer key={`child-${index}`} index={index} {...itemProps} />

      })}

      { noItems && <div className="instruction instruction--light instruction--empty">the child will appear here</div>}
    </div>
  )
})

export default ItemList
