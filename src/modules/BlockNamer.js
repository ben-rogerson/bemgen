import React from 'react'
import { applyNamingRules } from './../utilities/utilities'

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

export default BlockNamer
