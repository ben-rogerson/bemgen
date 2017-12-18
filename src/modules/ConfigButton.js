import React from 'react'

const ConfigButton = ({toggleConfig}) =>
  <div>
    <button
      onClick={toggleConfig}
      className="config-btn">
      <img className="config-btn__img" src="config.svg" alt="Config" />
    </button>
  </div>

export default ConfigButton
