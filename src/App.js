import React from 'react'

// https://github.com/kolodny/immutability-helper
import update from 'immutability-helper'

// https://github.com/clauderic/react-sortable-hoc
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc'

// https://github.com/JedWatson/react-input-autosize
import AutosizeInput from 'react-input-autosize'

import Exporter from './modules/Exporter'

import { bemChildTypePrefix, randomItem, applyNamingRules } from './utilities/utilities'

export default class extends React.Component {

  constructor(props) {

    super(props)

    // Start GA tracking
    ReactGA.initialize('UA-111321688-1', {
      debug: process.env.NODE_ENV === 'development',
      titleCase: false,
    })

    const nameExample = randomItem([
      'breadcrumbs',
      'header',
      'footer',
      'card',
      'tile',
    ])

    const childExample = randomItem([
      'title',
      'wrap',
      'list',
      'item',
      'button',
    ])

    this.state = {
      blockName: '',
      hasName: false,
      isExport: false,
      listItems: [],
      exampleName: nameExample,
      exampleChild: childExample,

      // blockName: 'breadcrumbs',
      // hasName: true,
    }
  }

  toggleExport = () => {
    this.setState({
      isExport: !this.state.isExport
    })
    if (!this.state.isExport) {
      ReactGA.event({
        category: 'Exporting',
        action: 'Toggled Export',
        label: !this.state.isExport
      })
    }
  }

  componentDidMount() {
    this.addBlock && this.addBlock.focus()
  }

  handleKeyDown = (e) => {
    const enterKey = 13
    if (e.which === enterKey && e.target.value.length > 0) this.addName(e)
  }

  addName(e) {
    this.setState({
      hasName: true,
      blockName: e.target.value
    })
    ReactGA.event({
      category: 'Editing',
      action: 'Added a Block Name',
      label: e.target.value
    })
  }

  addListItem = (item) => {
    const objs = {
      title: item,
      typeId: 0,
      'isDragging': false,
    }
    this.setState({
      listItems: this.state.listItems.concat(objs)
    })
    ReactGA.event({
      category: 'Editing',
      action: 'Added a List Item',
      label: item
    })
  }

  removeByKey = (itemKey) => {
    const array = this.state.listItems
    const listItems = array.filter((item, index) => index !== itemKey)
    if (listItems) this.setState({listItems: listItems})
  }

  onSortStart = (index) => {
    this.updateItem('isDragging', true, index)
  }

  onSortEnd = (oldIndex, newIndex) => {
    this.updateItem('isDragging', false, oldIndex)
    // Don't allow modifiers to modify upon the block
    if (newIndex === 0) this.updateItem('typeId', 0, oldIndex)

    this.setState({
      listItems: arrayMove(this.state.listItems, oldIndex, newIndex),
    })
  }

  updateItem = (fieldName, value, index) => {
    const array = this.state.listItems
    let newArray = update(array, {
      [index]: {
        [fieldName]: {
          $set: value
        }
      }
    })

    this.setState({
      listItems: newArray
    })
  }

  render() {
    const elementListProps = {
      blockName:    this.state.blockName,
      removeByKey:  this.removeByKey,
      listName:     this.state.blockName,
      addListItem:  this.addListItem,
      listItems:    this.state.listItems,
      updateItem:   this.updateItem,
      onSortStart:  this.onSortStart,
      onSortEnd:    this.onSortEnd,
      exampleChild: this.state.exampleChild,
    }

    const blockNamerProps = {
      blockName:     this.state.blockName,
      handleChange:  this.handleChange,
      handleKeyDown: this.handleKeyDown,
      addBlock:      this.addBlock,
      exampleName:   this.state.exampleName,
    }

    return (
      <div className="container">
        <div className="logo"><img className="logo__img" src="logo.svg" alt="Bem Gen" /></div>
        <a href="https://github.com/ben-rogerson/bemgen" target="_blank" rel="noopener noreferrer" className="github"><img className="github__img" src="github.svg" alt="Check it out on github" /></a>

        { ! this.state.hasName && <BlockNamer {...blockNamerProps} /> }

        { this.state.hasName && <ElementList {...elementListProps} /> }
        { this.state.hasName && <ExportButton isExport={this.state.isExport} toggleExport={this.toggleExport} /> }

        { this.state.isExport && <Exporter listItems={this.state.listItems} blockName={this.state.blockName} /> }

      </div>
    )
  }

}


const BlockNamer = ({blockName, handleChange, handleKeyDown, addBlock, exampleName}) =>
  <div className="input-wrap -full">
    <div className="input-large">
      <input
        ref={(input) => {addBlock = input}}
        type="text"
        maxLength="15"
        placeholder="add block name"
        onChange={e => e.target.value = applyNamingRules(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck="false"
      />
    </div>
    <div className="instruction">give your block a name, eg: &ldquo;{exampleName}&rdquo;  or &ldquo;o-{exampleName}&rdquo;</div>
  </div>


class ElementList extends React.Component {

  componentDidMount() {
    this.addChild.focus()
  }

  handleKeyDown = (e) => {
    const enterKey = 13
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
          <div className="input-wrap -half">
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


const ItemList = SortableContainer((props) => {

  const listItems = props.listItems
  const noItems = listItems.length === 0

  return (
    <div className="child-list">
      {listItems.map( (item, index) => {

        const prevItem = (typeof listItems[index-1] !== 'undefined') ? listItems[index-1] : []
        const childPrefix = item.typeId === 1 && index > 0 ?
          (bemChildTypePrefix(prevItem.typeId) + prevItem.title) :
          ''
        const itemProps = {
          typeText: childPrefix + bemChildTypePrefix(item.typeId),
          item,
          updateItem: props.updateItem,
          removeByKey: props.removeByKey,
          i: index,
          isDragging: item.isDragging,
        }

        return <Item key={`child-${index}`} index={index} {...itemProps} />

      } )}

      { noItems && <div className="instruction instruction--light">child will appear here</div>}
    </div>
  )
})


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


const ExportButton = ({toggleExport, isExport}) =>
  <button onClick={toggleExport} className="export-btn">
    <span className="export-btn__inner"> {isExport ? 'back' : 'view export' }</span>
  </button>
