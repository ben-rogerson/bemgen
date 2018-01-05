import { connect } from 'react-redux'
import Exporter from '../modules/Exporter'

import {
  setConfigOption,
  toggleConfig,
} from './../actions'

const mapStateToProps = state => {
  return {
    blockName: state.block.title,
    children: state.children,
    config: state.config,
    isConfigOpen: state.options.isConfigOpen,
  }
}

const mapDispatchToProps = (dispatch, etc) => {
  const { isConfigOpen } = etc
  return {
    updateConfig: (name, value) => {
      dispatch( setConfigOption(name, value) )
    },
    toggleConfigOverlay: () => {
      dispatch( toggleConfig(isConfigOpen) )
    }
  }
}

const ExporterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Exporter)

export default ExporterContainer
