import React from 'react'
import {SortableContainer} from 'react-sortable-hoc'
import Item from './Item'
import { bemChildTypePrefix } from './../utilities'

const ItemList = SortableContainer( props => {

  const
    listItems = props.listItems,
    noItems = listItems.length === 0

  return (
    <div className="child-list">
      {listItems.map( (item, index) => {

        const
          prevItem = (typeof listItems[index-1] !== 'undefined') ? listItems[index-1] : [],
          childPrefix = item.typeId === 1 && index > 0
            ? (bemChildTypePrefix(prevItem.typeId) + prevItem.title)
            : '',
          itemProps = {
            typeText: childPrefix + bemChildTypePrefix(item.typeId),
            item,
            updateItem: props.updateItem,
            removeByKey: props.removeByKey,
            i: index,
            isDragging: item.isDragging,
          }

        return <Item key={`child-${index}`} index={index} {...itemProps} />

      } )}

      {noItems && <div className="instruction instruction--light instruction--empty">the child will appear here</div>}
    </div>
  )
})

export default ItemList
