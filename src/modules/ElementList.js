import React from 'react'
import { applyNamingRules } from '../utilities/utilities'
import ItemListContainer from '../containers/ItemListContainer';

export default class ElementList extends React.Component {

  componentDidMount() {
    this.addChildInput.focus()
  }

  render() {
    const { listName, exampleChild, handleKeyDown, children } = this.props
    const itemListContainerProps = { children: children }

    return (
      <div className="layout layout--halves">

        <div className="layout__item">
          <div className="input-wrap input-wrap--half input-wrap--has-arrow">
            <div className="input-large">
              <input
                ref={input => {this.addChildInput = input}}
                type="text"
                maxLength="15"
                placeholder="add child name"
                spellCheck="false"
                onChange={e => e.target.value = applyNamingRules(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="instruction">
              add a child element without any prefix,
              eg: &ldquo;{exampleChild}&rdquo;
            </div>
          </div>
        </div>

        <div className="layout__item">
          <h1 className="blockname">{listName}</h1>
          <ItemListContainer {...itemListContainerProps} />
        </div>

      </div>
    )
  }

}
