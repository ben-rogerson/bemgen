import React from 'react'

const ExportButton = ({toggleExporter, isExport}) =>
  <button onClick={toggleExporter} className="export-btn">
    <span className="export-btn__inner">{ isExport ? 'back' : 'view code' }</span>
  </button>

export default ExportButton
