import React from "react";
import update from 'immutability-helper';
// https://github.com/kolodny/immutability-helper
import {SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc';
// https://github.com/clauderic/react-sortable-hoc

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      blockName: '',
      hasName: false,
      listItems: [],
      isExport: false,
      // hasName: true,
      // blockName: 'breadcrumbs',
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
    if (e.which === enterKey) this.addName()
  }

  handleKeyUp = (e) => {
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
    return (
      <div className="container">

        { this.state.hasName && 
          <ElementList
            removeByKey={this.removeByKey}
            listName={this.state.blockName}
            addListItem={this.addListItem}
            listItems={this.state.listItems}
            updateItem={this.updateItem}
            onSortEnd={this.onSortEnd}
          />
        }

        { this.state.hasName && <ExportButton isExport={this.state.isExport} toggleExport={this.toggleExport} /> }

        { this.state.isExport && <Exporter {...this.state} /> }

        { !this.state.hasName && (
          <div className="input-wrap -full">
            <div className="input-large">
              <input 
                ref={(input) => {this.addBlock = input}}
                type="text" 
                maxLength="15"
                placeholder="foo" 
                value={this.state.blockName}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
              />
            </div>
            <div className="instruction">Give your block a name</div>
          </div>
        )
        }
      </div>
    )
  }

}

const ExportButton = ({toggleExport}) => <button onClick={() => {toggleExport()}} className="export-btn"><span className="export-btn__inner">show scss</span></button>


const DragHandle = SortableHandle( () => <span className="drag"><span className="drag__inner">: :</span></span> )

const Element = SortableElement( ({ typeText, item, updateItem, removeByKey, i }) => {

  const inputProps = {
    value: item.title,
    onChange: e => {
      updateItem('title', e.target.value, i)
    }
  }

  return (
    <div className="child">

      <div className="child__title">
        <div className="child__type">{typeText}</div>
        <input className="child__input" type="text" {...inputProps} />
      </div>

      <div className="child__option-wrap">

        <label className={"child__option -element -type" + (item.typeId === 0 ? ' -is-checked' : '')}>
          <input 
            className="button"
            type="radio" value="0"
            onClick={e => {updateItem('typeId', parseInt(e.target.value), i);}}
            name={'typeId'+i}
            defaultChecked={item.typeId === 0} />
        </label>

        <label className={"child__option -modifier -type" + (item.typeId === 1 ? ' -is-checked' : '')}>
          <input 
            className="button"
            type="radio" value="1"
            onClick={e => {updateItem('typeId', parseInt(e.target.value), i)}}
            name={'typeId'+i} />
        </label>

        <div className="child__option">
          <button 
            className="button -remove" 
            onClick={() => removeByKey(i)}>Remove</button>
        </div>

      </div>

      <DragHandle />

    </div>
  )
})

const ItemList = SortableContainer((props) => {

  const updateItem  = props.updateItem
  const removeByKey = props.removeByKey
  const listItems   = props.listItems

  return (
    <div className="child-list">
      {props.items.map( (item, index) => {

        let prevItem = typeof listItems[index-1] !== 'undefined' ? listItems[index-1] : []
        let childPrefix = item.typeId === 1 && index > 0 ?
        (prevItem.typeId === 0 ? '__' + prevItem.title : '--' + prevItem.title) :
        ''
        let typeText = childPrefix + (item.typeId === 0 ? '__' : '--')

        const i = index
        const elementProps = { typeText, item, updateItem, removeByKey, i }

        return <Element key={`child-${index}`} index={index} {...elementProps} />

      } )}
    </div>
  )
})

class ElementList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listName: this.props.listName,
      elementName: '',
    };
  }

  componentDidMount() {
    this.addChild.focus()
  }

  handleChange = (e) => {
    this.setState({
      elementName: e.target.value
    })
  }

  handleKeyDown = (e) => {
    const enterKey = 13
    if (e.which === enterKey) {
      this.props.addListItem(this.state.elementName)
      e.target.value = ''
    }
  }

  onSortEnd = ({oldIndex, newIndex}) => this.props.onSortEnd(oldIndex, newIndex)

  render() {

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
                value={this.elementName}
                onChange={this.handleChange} 
                onKeyDown={this.handleKeyDown}
              />
            </div>
            <div className="instruction">Add an __element or --modifier</div>
          </div>
        </div>
        
        <div className="layout__item">
          <h1>{this.state.listName}</h1>
          <ItemList 
            {...this.props} 
            items={this.props.listItems} 
            onSortEnd={this.onSortEnd} 
            useDragHandle={true} 
            lockAxis="y" />
        </div>
      </div>
    )
  }

}

const Exporter = ({ listItems, blockName}) => {
  return (
    <div className="code" contentEditable>

      {blockName}{' { '}<br/><br/>

      {listItems.map( (item, index) => {
        const exportProps = { item, listItems, blockName, index }
        return <ExportItem {...exportProps} />
      })}

      { '}'}
    </div>
  )
}

const ExportItem = ({ item, listItems, blockName, index }) => {

  let typeText = item.typeId === 0 ? '__' : '--'
  let prevItem = typeof listItems[index-1] !== 'undefined' ? listItems[index-1] : []
  let childPrefix = item.typeId === 1 && index > 0 ?
    (prevItem.typeId === 0 ? '__' + prevItem.title : '--' + prevItem.title) :
    ''

  return (
    <div key={index}>
      &nbsp;&nbsp;&nbsp;&nbsp;&{childPrefix}{typeText}{item.title + ' {}'}<br/><br/>
    </div>
  )

}
