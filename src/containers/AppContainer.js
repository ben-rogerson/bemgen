import { connect } from 'react-redux'
import App from '../App'

const mapStateToProps = state => {
  return {
    isExport: state.options.isExport,
    blockName: state.block.title,
    isConfigOpen: state.options.isConfigOpen,
  }
}

const AppContainer = connect(
  mapStateToProps
)(App)

export default AppContainer
