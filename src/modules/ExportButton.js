import React from 'react'

const ExportButton = ({ toggleExport, isExport }) => (
  <button onClick={toggleExport} className="export-btn">
    <span className="export-btn__inner">{ isExport ? 'back' : 'view code' }</span>
  </button>
)

export default ExportButton
