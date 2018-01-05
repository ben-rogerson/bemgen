import { connect } from 'react-redux'
import Item from '../modules/Item'

const mapStateToProps = (state, etc) => {
  return {
    exampleName: state.examples.block,
    ...etc
  }
}

const mapDispatchToProps = dispatch => {
  return {dispatch}
}

const ItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Item)

export default ItemContainer
