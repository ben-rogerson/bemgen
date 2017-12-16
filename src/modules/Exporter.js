import React from 'react'
import ExportItem from './ExportItem'

const Exporter = ({ listItems, blockName }) => {
  return (
    <div class="exporter">
      <div class="layout -halves">

        <div class="layout__item">

          <div className="code -html" contentEditable spellcheck="false">

            {`<div class="${blockName}">`}<br/><br/>
              {listItems.map( (item, index) => {
                const exportProps = { item, listItems, blockName, index }
                return <ExportItem type="html" {...exportProps} />
              })}
            {'</div>'}

          </div>
        </div>

        <div class="layout__item">

          <div className="code -scss" contentEditable spellcheck="false">

            .{blockName}{' { '}<br/><br/>
              {listItems.map( (item, index) => {
                const exportProps = { item, listItems, blockName, index }
                return <ExportItem type="scss" {...exportProps} />
              })}
            { '}'}
          </div>

        </div>

      </div>
    </div>
  )
}

export default Exporter
