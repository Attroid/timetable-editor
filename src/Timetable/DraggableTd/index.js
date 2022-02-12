import PropTypes from 'prop-types';
import { childrenPropType } from 'shared/utils/propTypeSchemas';

const propTypes = {
  isDragging: PropTypes.bool,
  children: childrenPropType,
  columns: PropTypes.number.isRequired
};

const DraggableTd = ({ forwardedRef, isDragging, children, columns }) => (
  <td
    className={`opacity-${isDragging ? 50 : 100} p-0`}
    ref={forwardedRef}
    style={{ maxWidth: `${100 / columns}%`, width: `${100 / columns}%` }}
  >
    {children}
  </td>
);

DraggableTd.propTypes = propTypes;

export default DraggableTd;
