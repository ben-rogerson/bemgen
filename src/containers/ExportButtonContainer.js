import ReactGA from 'react-ga'
import { connect } from 'react-redux'
import { toggleExport } from '../actions'
import ExportButton from '../modules/ExportButton'

const mapStateToProps = state => {
  return {
    isExport: state.options.isExport,
  }
}

const mapDispatchToProps = (dispatch, etc) => {
  return {
    toggleExporter: () => {
      const { isExport } = etc
      dispatch( toggleExport(isExport) )
      if (isExport) {
        ReactGA.event({
          category: 'Exporting',
          action: 'Saw the Code',
        })
      }
    }
  }
}

const ExportButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExportButton)

export default ExportButtonContainer
