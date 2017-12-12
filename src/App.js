import React from "react"

// https://github.com/kolodny/immutability-helper
import update from 'immutability-helper'

// https://github.com/clauderic/react-sortable-hoc
import {SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc'

export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      blockName: '',
      hasName: false,
      isExport: false,
      listItems: [],
    }
  }

  toggleExport = () => {
    this.setState({
      isExport: !this.state.isExport
    })
  }

  componentDidMount() {
    this.addBlock && this.addBlock.focus()
  }
 
  handleChange = (e) => {
    this.setState({
      blockName: e.target.value.toLowerCase()
    })
  }

  handleKeyDown = (e) => {
    const enterKey = 13
    if (e.which === enterKey && e.target.value.length > 0) this.addName()
  }

  handleKeyUp = (e) => {
    const spaceKey = 32
    if (e.which === spaceKey) e.target.value = e.target.value.replace(" ", "-")
    e.target.value = e.target.value.toLowerCase()
  }

  addName() {
    this.setState({
      hasName: true,
    })
  }

  addListItem = (item) => {
    const objs = {
      title: item,
      typeId: 0,
    }
    this.setState({
      listItems: this.state.listItems.concat(objs)
    })
  }

  removeByKey = (itemKey) => {
    const array = this.state.listItems
    const stuff = array.filter((item, index) => index !== itemKey)
    if (stuff) this.setState({listItems: stuff})
  }

  onSortEnd = (oldIndex, newIndex) => {
    // Convert first item to an element
    if (newIndex === 0) this.updateItem('typeId', 0, oldIndex)
    // Update ordering
    this.setState({
      listItems: arrayMove(this.state.listItems, oldIndex, newIndex),
    })
  }

  updateItem = (fieldName, value, key) => {
    const array = this.state.listItems
    let newArray = update(array, {
      [key]: {
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
      handleKeyUp: this.handleKeyUp,
      removeByKey: this.removeByKey,
      listName:    this.state.blockName,
      addListItem: this.addListItem,
      listItems:   this.state.listItems,
      updateItem:  this.updateItem,
      onSortEnd:   this.onSortEnd,
    }

    const blockNamerProps = {
      blockName:     this.state.blockName,
      handleChange:  this.handleChange,
      handleKeyDown: this.handleKeyDown,
      handleKeyUp:   this.handleKeyUp,
      addBlock:      this.addBlock,
    }

    return (
      <div className="container">

        { this.state.hasName && <ElementList {...elementListProps} /> }

        { this.state.hasName && <ExportButton isExport={this.state.isExport} toggleExport={this.toggleExport} /> }

        { this.state.isExport && <Exporter listItems={this.state.listItems} blockName={this.state.blockName} /> }

        { !this.state.hasName && (<BlockNamer {...blockNamerProps} />) }
        
      </div>
    )
  }

}

const BlockNamer = ({blockName, handleChange, handleKeyDown, handleKeyUp, addBlock}) => 
  <div className="input-wrap -full">
  <div className="input-large">
    <input 
      ref={(input) => {addBlock = input}}
      type="text" 
      maxLength="15"
      placeholder="foo" 
      value={blockName}
      onChange={(e) => handleChange(e)}
      onKeyDown={(e) => handleKeyDown(e)}
      onKeyUp={(e) => handleKeyUp(e)}
    />
  </div>
  <div className="instruction">Give your block a name</div>
  </div>

const ExportButton = ({toggleExport, isExport}) => 
  <button onClick={toggleExport} className="export-btn">
    <span className="export-btn__inner"> {isExport ? 'back' : 'view export' }</span>
  </button>

const DragHandle = SortableHandle( () => 
  <span className="drag"><span className="drag__inner">: :</span></span> )

const Element = SortableElement( ({ typeText, item, updateItem, removeByKey, i }) => {

  const inputProps = {
    value: item.title,
    onChange: e => updateItem('title', e.target.value, i)
  }

  return (
    <div className="child">

      <div className="child__title">
        <div className="child__type">{typeText}</div>
        <input className="child__input" type="text" {...inputProps} />
      </div>

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

      <DragHandle />

    </div>
  )
})

const ItemList = SortableContainer((props) => {

  const listItems = props.listItems

  return (
    <div className="child-list">
      {listItems.map( (item, index) => {

        const prevItem = (typeof listItems[index-1] !== 'undefined') ? listItems[index-1] : []
        const childPrefix = item.typeId === 1 && index > 0 ?
          ((prevItem.typeId === 0 ? '__' : '--') + prevItem.title) :
          ''
        const elementProps = { 
          typeText: childPrefix + (item.typeId === 0 ? '__' : '--'),
          item,
          updateItem: props.updateItem,
          removeByKey: props.removeByKey,
          i: index,
        }

        return <Element key={`child-${index}`} index={index} {...elementProps} />

      } )}
    </div>
  )
})

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

  onSortEnd = ({oldIndex, newIndex}) => this.props.onSortEnd(oldIndex, newIndex)

  render() {

    const itemListProps = { 
      updateItem:  this.props.updateItem,
      removeByKey: this.props.removeByKey,
      listItems:   this.props.listItems,
    }

    const sortableConfig = { 
      onSortEnd:     this.onSortEnd,
      useDragHandle: true,
      lockAxis:      "y",
    }
    
    return (
      <div className="layout -halves">
        
        <div className="layout__item">
          <div className="input-wrap -half">
            <div className="input-large">
              <input
                ref={(input) => {this.addChild = input}} 
                type="text" 
                maxLength="15"
                placeholder="Type here"
                onKeyUp={this.props.handleKeyUp}
                onKeyDown={this.handleKeyDown}
              />
            </div>
            <div className="instruction">Add an element or modifier</div>
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

const Exporter = ({ listItems, blockName }) => {
  return (
    <div className="code">

      <div className="export -scss" contentEditable spellcheck="false">

        .{blockName}{' { '}<br/><br/>
          {listItems.map( (item, index) => {
            const exportProps = { item, listItems, blockName, index }
            return <ExportItem type="scss" {...exportProps} />
          })}
        { '}'}
      </div>

      <div className="export -html" contentEditable spellcheck="false">

        {`<div class="${blockName}">`}<br/><br/>
          {listItems.map( (item, index) => {
            const exportProps = { item, listItems, blockName, index }
            return <ExportItem type="html" {...exportProps} />
          })}
        {'</div>'}
      </div>

    </div>
  )
}

const ExportItem = ({ type, item, listItems, blockName, index }) => {
  const typeText = item.typeId === 0 ? '__' : '--'
  const prevItem = typeof listItems[index-1] !== 'undefined' ? listItems[index-1] : []
  const childPrefix = item.typeId === 1 && index > 0 ?
    ((prevItem.typeId === 0 ? '__' : '--') + prevItem.title) : ''

  const text = type === 'html' ?
    '<div class="' + blockName + childPrefix + typeText + item.title + '"></div>' :
    '&' + childPrefix + typeText + item.title + ' {}'
  
  return (
    <div key={index}>
      &nbsp;&nbsp;&nbsp;&nbsp;{text}<br/><br/>
    </div>
  )
}
