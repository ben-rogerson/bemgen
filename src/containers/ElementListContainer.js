import ReactGA from 'react-ga'
import { connect } from 'react-redux'
import ElementList from '../modules/ElementList'
import { enterKey } from '../utilities/utilities'
import {
  addChild,
} from '../actions'

const mapStateToProps = state => {
  return {
    listName: state.block.title,
    children: state.children,
    exampleChild: state.examples.child,
  }
}

const mapDispatchToProps = dispatch => {

  return {
    handleKeyDown: e => {
      const childName = e.target.value
      if (e.which === enterKey && childName.length > 0) {
        dispatch( addChild(childName) )
        e.target.value = ''
        ReactGA.event({
          category: 'Editing',
          action: 'Added a Child Item',
          label: childName,
        })
      }
    }
  }
}

const ElementListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ElementList)

export default ElementListContainer
