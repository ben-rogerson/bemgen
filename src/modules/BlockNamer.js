import React from 'react'
import { applyNamingRules } from './../utilities/utilities'

export default class BlockNamer extends React.Component {
  componentDidMount() {
    this.addBlock && this.addBlock.focus()
  }

  render() {
    const {handleKeyDown, exampleName} = this.props

    return (
      <div className="input-wrap -full">
        <div className="input-large input-large--has-ends">
          <input
            ref={input => this.addBlock = input}
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
    )
  }
}


