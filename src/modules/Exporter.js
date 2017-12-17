import React from 'react'
import ExportItem from './ExportItem'
import { light } from './../utilities/utilities'
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default class Exporter extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      copiedHtml: false,
      copiedScss: false,
      html: '',
      scss: '',
    }
  }

  componentDidMount() {
    this.setState({
      html: this.html.innerText,
      scss: this.scss.innerText,
    })
  }

  render() {

    const {
      listItems,
      blockName,
    } = this.props

    const showEndBlock = typeof listItems[0] !== 'undefined' ? listItems[0].typeId === 0 : true

    return (
      <div className="exporter">
        <div className="layout -halves">

          <div className="layout__item">

            <div ref={content => this.html = content} className="code -html" contentEditable spellCheck="false">

              {light('<div class="')}{blockName}

              {showEndBlock && <span>{light('">')}<br/><br/></span>}

              {listItems.map( (item, index) => {
                const exportProps = { item, listItems: listItems, blockName: blockName, index }
                return <ExportItem type="html" {...exportProps} />
              })}

              {light('</div>')}

            </div>

            <CopyToClipboard text={this.state.html}
              onCopy={() => this.setState({copiedHtml: true})}>
              <button className="copy-btn">{this.state.copiedHtml ? 'copied' : 'copy'}</button>
            </CopyToClipboard>

          </div>

          <div className="layout__item">

            <div ref={content => this.scss = content} className="code -scss" contentEditable spellCheck="false">

              {light('.')}{blockName}{light(' {')}<br/><br/>

              {listItems.map( (item, index, listItems, blockName) => {
                const exportProps = { item, listItems, blockName, index }
                return <ExportItem type="scss" {...exportProps} />
              })}

              {light('}')}

            </div>

            <CopyToClipboard text={this.state.scss}
              onCopy={() => this.setState({copiedScss: true})}>
              <button className="copy-btn">{this.state.copiedScss ? 'copied' : 'copy'}</button>
            </CopyToClipboard>

          </div>

        </div>
      </div>
    )
  }
}
