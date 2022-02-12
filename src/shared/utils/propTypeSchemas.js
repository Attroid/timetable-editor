import PropTypes from 'prop-types';

export const childrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node
]);

export const slotPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  draggable: PropTypes.bool.isRequired,
  course: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  instructor: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
});