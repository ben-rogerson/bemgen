import React from 'react'
import ExportItem from './ExportItem'
import Config from './Config'
import { light } from './../utilities/utilities'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import ConfigButton from './ConfigButton'

export default class Exporter extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      copiedHtml: false,
      copiedScss: false,
      html: '',
      scss: '',
      isConfigOpen: false,
    }
  }

  componentDidMount() {
    this.setState({
      html: this.html.innerText,
      scss: this.scss.innerText,
    })
  }

  toggleConfig = () => {
    this.setState({
      isConfigOpen: !this.state.isConfigOpen,
    })
  }

  render() {
    const {listItems, blockName} = this.props
    const showEndBlock = typeof listItems[0] !== 'undefined' ? listItems[0].typeId === 0 : true
    const classStyle = this.props.config.html === 'classic' ? 'class' : 'className'
    const isSelectorNested = this.props.config.selector === 'nested'
    const configProps = {
      updateConfig: this.props.updateConfig,
      config:       this.props.config,
      isConfigOpen: this.state.isConfigOpen,
    }

    return (
      <div className="exporter">
        <div className="layout -halves">

          <div className="layout__item">

            <div ref={content => this.html = content} className="code -html" contentEditable spellCheck="false">

              {light(`<div ${classStyle}="`)}{blockName}

              {showEndBlock && <span>{light('">')}<br/><br/></span>}

              {listItems.map( (item, index) => {
                const exportProps = {
                  item,
                  index,
                  listItems: listItems,
                  blockName: blockName,
                  config: this.props.config,
                }
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

              {light('.')}{blockName}{light(' {')}
              {!isSelectorNested && <span>{light('}')}</span>}
              <br/><br/>

              {listItems.map( (item, index) => {
                const exportProps = {
                  item,
                  listItems,
                  blockName,
                  index,
                  config: this.props.config,
                  isSelectorNested,
                }
                return <ExportItem type="scss" {...exportProps} />
              })}

              {isSelectorNested && <span>{light('}')}</span>}

            </div>

            <CopyToClipboard text={this.state.scss}
              onCopy={() => this.setState({copiedScss: true})}>
              <button className="copy-btn">{this.state.copiedScss ? 'copied' : 'copy'}</button>
            </CopyToClipboard>

            <Config {...configProps} />

          </div>

        </div>

        <ConfigButton toggleConfig={this.toggleConfig} />

      </div>
    )
  }
}
