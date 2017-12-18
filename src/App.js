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
import { randomItem, enterKey, isDev } from './utilities/utilities'
import fakerState from './utilities/fakerState'

export default class extends React.Component {

  constructor(props) {

    super(props)

    // Start GA tracking
    ReactGA.initialize('UA-111321688-1', {
      debug: isDev,
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

    this.state = isDev ?
      fakerState : {
        blockName: '',
        hasName: false,
        isExport: false,
        listItems: [],
        exampleName: nameExample,
        exampleChild: childExample,
        exportConfig: {
          html: 'classic',
          selector: 'nested',
          element: 'classic',
          modifier: 'classic',
        },
      }

  }

  updateConfig = (name, value) => {
    const array = this.state.exportConfig
    let newArray = update(array, {
      [name]: {
        $set: value
      }
    })
    this.setState({ exportConfig: newArray })
  }

  toggleExport = () => {
    this.setState({ isExport: !this.state.isExport })
    if (this.state.isExport) {
      ReactGA.event({
        category: 'Exporting',
        action: 'Saw the Code',
      })
    }
  }

  handleKeyDown = (e) => {
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
    this.setState({ listItems: this.state.listItems.concat(objs) })
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
    this.setState({ listItems: newArray })
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

    const exportButtonProps = {
      isExport:     this.state.isExport,
      toggleExport: this.toggleExport,
    }

    const exporterProps = {
      blockName:    this.state.blockName,
      listItems:    this.state.listItems,
      updateConfig: this.updateConfig,
      config:       this.state.exportConfig,
    }

    return (
      <div className="container">

        <Logo />
        <GithubLink />

        { ! this.state.hasName ?
          <BlockNamer {...blockNamerProps} /> :
          <span>
            <ElementList {...elementListProps} />
            <ExportButton {...exportButtonProps} />
          </span>
        }

        { this.state.isExport && <Exporter {...exporterProps} /> }

      </div>
    )
  }

}
