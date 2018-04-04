import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { light } from './../utilities'
import ExportItem from './ExportItem'
import Config from './Config'
import ConfigButton from './ConfigButton'

export default class Exporter extends Component {

  state = {
    copiedHtml: false,
    copiedScss: false,
    html: '',
    scss: '',
  }

  componentDidMount() {
    this.setState({
      html: this.html.innerText,
      scss: this.scss.innerText,
    })
  }

  render() {
    const
      { listItems, blockName } = this.props,
      showEndBlock = typeof listItems[0] !== 'undefined' ? listItems[0].typeId === 0 : true,
      classStyle = this.props.config.html === 'classic' ? 'class' : 'className',
      isSelectorNested = this.props.config.selector === 'nested',
      configProps = {
        updateConfig: this.props.updateConfig,
        config:       this.props.config,
        isConfigOpen: this.props.isConfigOpen,
      }

    return (
      <div className="exporter">
        <div className="layout -halves">

          <div className="layout__item">

            <div ref={content => this.html = content} className="code -html" contentEditable suppressContentEditableWarning spellCheck="false">

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
                return <ExportItem key={'exhtml'+index} type="html" {...exportProps} />
              })}

              {light('</div>')}

            </div>

            <CopyToClipboard text={this.state.html}
              onCopy={() => this.setState({copiedHtml: true})}>
              <button className="copy-btn">{this.state.copiedHtml ? 'copied' : 'copy'}</button>
            </CopyToClipboard>

          </div>

          <div className="layout__item">

            <div ref={content => this.scss = content} className="code -scss" contentEditable suppressContentEditableWarning spellCheck="false">

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
                return <ExportItem key={'excss'+index} type="scss" {...exportProps} />
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

        <ConfigButton toggleConfig={this.props.toggleConfigOverlay} />
        <div
          className={'overlay overlay--' + (this.props.isConfigOpen ? 'is-open' : 'is-closed')}
          onClick={this.props.toggleConfigOverlay}>
        </div>

      </div>
    )
  }
}
