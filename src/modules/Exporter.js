import React from 'react'
import ExportItem from './ExportItem'
import { light } from './../utilities/utilities'

const Exporter = ({ listItems, blockName }) => {
  return (
    <div class="exporter">
      <div class="layout -halves">

        <div class="layout__item">

          <div className="code -html" contentEditable spellcheck="false">

            {light('<div class="')}{blockName}{light('">')}<br/><br/>

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


const HtmlItem = ({classText}) =>
  <div>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <span className="code__light">{'<div class="'}</span>
    <span>{ classText }</span>
    <span className="code__light">{'">'}</span><br/><br/>
  </div>
