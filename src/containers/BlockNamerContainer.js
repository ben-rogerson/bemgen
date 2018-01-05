import ReactGA from 'react-ga'
import { connect } from 'react-redux'
import { addBlock } from '../actions'
import BlockNamer from '../modules/BlockNamer'
import { enterKey } from '../utilities/utilities'

const mapStateToProps = state => {
  return {
    exampleName: state.examples.block
  }
}

const mapDispatchToProps = dispatch => {

  return {
    handleKeyDown: e => {
      const blockName = e.target.value
      if (e.which === enterKey && blockName.length > 0) {
        dispatch( addBlock(blockName) )
        ReactGA.event({
          category: 'Editing',
          action: 'Added a Block Name',
          label: blockName,
        })
      }
    }
  }
}

const BlockNamerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockNamer)

export default BlockNamerContainer
