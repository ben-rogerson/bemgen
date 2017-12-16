import React from 'react'
import ReactGA from 'react-ga'
import update from 'immutability-helper'
import {arrayMove} from 'react-sortable-hoc'

import Exporter from './modules/Exporter'
import GithubLink from './modules/GithubLink'
import ExportButton from './modules/ExportButton'
import Logo from './modules/Logo'
import BlockNamer from './modules/BlockNamer'
import ElementList from './modules/ElementList'
import { randomItem } from './utilities/utilities'

export default class extends React.Component {

  constructor(props) {

    super(props)

    // Start GA tracking
    ReactGA.initialize('UA-111321688-1', {
      debug: process.env.NODE_ENV === 'development',
      titleCase: false,
    })

    ReactGA.pageview('/');

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

        <Logo />
        <GithubLink />

        { ! this.state.hasName && <BlockNamer {...blockNamerProps} /> }

        { this.state.hasName && <ElementList {...elementListProps} /> }
        { this.state.hasName && <ExportButton isExport={this.state.isExport} toggleExport={this.toggleExport} /> }

        { this.state.isExport && <Exporter listItems={this.state.listItems} blockName={this.state.blockName} /> }

      </div>
    )
  }

}
