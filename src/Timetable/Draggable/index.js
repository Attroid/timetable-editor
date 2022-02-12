import React, { memo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { childrenPropType } from 'shared/utils/propTypeSchemas';

const propTypes = {
  item: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  onMoveItem: PropTypes.func.isRequired,
  children: childrenPropType,
  dropCondition: PropTypes.func,
  dragCondition: PropTypes.func,
  type: PropTypes.string.isRequired
};

const defaultProps = {
  dropCondition: null,
  dragCondition: null
};

const Draggable = memo(({ item, onMoveItem, children, dropCondition, dragCondition, type }) => {
  const ref = useRef(null);

  const [{ isDragging }, connectDrag] = useDrag({
    type: type,
    item,
    canDrag: () => typeof dragCondition !== 'function' || dragCondition(item),
    collect: monitor => ({ isDragging: monitor.isDragging() })
  });

  const [, connectDrop] = useDrop({
    accept: type,
    drop(itemToDrop) {
      const destinationItem = item;

      if (typeof dropCondition !== 'function' || dropCondition(itemToDrop, destinationItem)) {
        onMoveItem(itemToDrop.id, destinationItem.id);
      }
    }
  });

  connectDrag(ref);
  connectDrop(ref);

  return React.Children.map(children, child =>
    React.cloneElement(child, {
      forwardedRef: ref,
      isDragging
    })
  );
});

Draggable.propTypes = propTypes;
Draggable.defaultProps = defaultProps;

export default Draggable;