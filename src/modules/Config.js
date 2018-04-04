import React from 'react'

const Config = ({ updateConfig, config, isConfigOpen }) => {

  const configStyles = [{
    name: 'html',
    label: 'html style',
    items: ['classic', 'jsx'],
    current: config.html
  },{
    name: 'selector',
    label: 'selector style',
    items: ['nested', 'expanded'],
    current: config.selector
  },{
    name: 'element',
    label: 'element style',
    items: ['classic', 'abbreviated'],
    current: config.element
  },{
    name: 'modifier',
    label: 'modifier style',
    items: ['classic', 'abbreviated'],
    current: config.modifier
  }]

  return (
    <div className={"config config" + (isConfigOpen ? '--is-open' : '--is-closed')}>
      {configStyles.map((configItem, i) => {
        const configItems = configItem.items.map( (name, index) => {
          const itemId = `${name}-${i}-${index}`,
          classes = (configItem.current === name ? ' choice__input--is-current' : '')
          return (
            <span key={itemId} className="choice">
              <input type="radio" id={itemId} name="html-style" value={name}
              className={'choice__input' + classes}
              onClick={e => updateConfig(configItem.name, e.target.value)} />
              <label htmlFor={itemId} className="choice__label">{name}</label>
            </span>
          )
        })
        return (
          <div key={'ch'+i} className="config__item">
            <div className="config__type">{configItem.label}</div>
            <div className="config__choices">{configItems}</div>
          </div>
        )
      })}

    </div>
  )
}

export default Config



