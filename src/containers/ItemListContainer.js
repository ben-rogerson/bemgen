import { connect } from 'react-redux'
import ItemList from '../modules/ItemList'
import {arrayMove} from 'react-sortable-hoc'
import {
  updateChildren,
  toggleChildDragging,
} from '../actions'

const mapDispatchToProps = (dispatch, props) => {

  return {
    onSortEnd: ({ oldIndex, newIndex }) => {
      const { children } = props
      if (
        Object.keys(children).length <= 1 ||
        oldIndex === newIndex
      ) return

      const newChildren = arrayMove(children, oldIndex, newIndex)

      dispatch( updateChildren(newChildren) )
      dispatch( toggleChildDragging(oldIndex) )
    },

    onSortStart: ({ index }) => dispatch( toggleChildDragging(index) ),
    lockAxis: "y",
  }
}

const mapStateToProps = state => {
  return {
    children: state.children,
  }
}

const ItemListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemList)

export default ItemListContainer
