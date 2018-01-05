import { connect } from 'react-redux'
import ExportItem from '../modules/ExportItem'

const mapStateToProps = (state, etc) => {
  return {
    children: state.children,
    blockName: state.block.title,
    config: state.config,
    ...etc
  }
}

const ExportItemContainer = connect(
  mapStateToProps
)(ExportItem)

export default ExportItemContainer
