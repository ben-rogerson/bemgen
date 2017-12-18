import React from 'react'
import { applyNamingRules, enterKey } from './../utilities/utilities'
import ItemList from './ItemList'

export default class ElementList extends React.Component {

  componentDidMount() {
    this.addChild.focus()
  }

  handleKeyDown = (e) => {
    if (e.which === enterKey && e.target.value.length > 0) {
      this.props.addListItem(e.target.value)
      e.target.value = ''
    }
  }

  render() {
    const itemListProps = {
      updateItem:  this.props.updateItem,
      removeByKey: this.props.removeByKey,
      listItems:   this.props.listItems,
    }

    const sortableConfig = {
      onSortEnd:   ({ oldIndex, newIndex }) => this.props.onSortEnd(oldIndex, newIndex),
      onSortStart: ({ index }) => this.props.onSortStart(index),
      lockAxis:    "y",
    }

    return (
      <div className="layout layout--halves">

        <div className="layout__item">
          <div className="input-wrap input-wrap--half input-wrap--has-arrow">
            <div className="input-large">
              <input
                ref={(input) => {this.addChild = input}}
                type="text"
                maxLength="15"
                placeholder="add child name"
                spellCheck="false"
                onChange={e => e.target.value = applyNamingRules(e.target.value)}
                onKeyDown={this.handleKeyDown}
              />
            </div>
            <div className="instruction">add a child element without any prefix, eg: &ldquo;{this.props.exampleChild}&rdquo;</div>
          </div>
        </div>

        <div className="layout__item">
          <h1 className="blockname">{this.props.listName}</h1>
          <ItemList {...itemListProps} {...sortableConfig} />
        </div>

      </div>
    )
  }

}
