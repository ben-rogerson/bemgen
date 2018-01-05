import React from 'react'
import Config from './Config'
import { light } from '../utilities/utilities'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import ConfigButton from './ConfigButton'
import ExportItemContainer from '../containers/ExportItemContainer';

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
    const { children, blockName, config, updateConfig, toggleConfigOverlay, isConfigOpen } = this.props
    console.log(this.props)
    const showEndBlock = typeof children[0] !== 'undefined' ? children[0].typeId === 0 : true
    const classStyle = config.html === 'classic' ? 'class' : 'className'
    const isSelectorNested = config.selector === 'nested'

    const configProps = {
      updateConfig: updateConfig,
      config:       config,
      isConfigOpen: isConfigOpen,
    }

    return (
      <div className="exporter">
        <div className="layout -halves">

          <div className="layout__item">

            <div ref={content => this.html = content} className="code -html" contentEditable spellCheck="false">

              {light(`<div ${classStyle}="`)}{blockName}

              {showEndBlock && <span>{light('">')}<br/><br/></span>}

              {children.map( (item, index) => {
                const exportProps = { item, index }
                return <ExportItemContainer type="html" {...exportProps} />
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

              {children.map( (item, index) => {
                const exportProps = {
                  item,
                  children,
                  blockName,
                  index,
                  config: config,
                  isSelectorNested,
                }
                return <ExportItemContainer type="scss" {...exportProps} />
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

        <ConfigButton toggleConfig={toggleConfigOverlay} />
        <div
        className={'overlay overlay--' + (isConfigOpen ? 'is-open' : 'is-closed')}
        onClick={toggleConfigOverlay}>
        </div>

      </div>
    )
  }
}
