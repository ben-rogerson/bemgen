import React from 'react'
import ExportItem from './ExportItem'
import { light } from './../utilities/utilities'

const Exporter = ({ listItems, blockName }) => {

  const showEndBlock = typeof listItems[0] !== 'undefined' ? listItems[0].typeId === 0 : true

  return (
    <div class="exporter">
      <div class="layout -halves">

        <div class="layout__item">

          <div className="code -html" contentEditable spellcheck="false">

            {light('<div class="')}{blockName}

            {showEndBlock && <span>{light('">')}<br/><br/></span>}

            {listItems.map( (item, index) => {
              const exportProps = { item, listItems, blockName, index }
              return <ExportItem type="html" {...exportProps} />
            })}

            {light('</div>')}

          </div>
        </div>

        <div class="layout__item">

          <div className="code -scss" contentEditable spellcheck="false">

            {light('.')}{blockName}{light(' {')}<br/><br/>

            {listItems.map( (item, index) => {
              const exportProps = { item, listItems, blockName, index }
              return <ExportItem type="scss" {...exportProps} />
            })}

            {light('}')}

          </div>

        </div>

      </div>
    </div>
  )
}

export default Exporter
