import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { getBrightnessByHex } from 'shared/utils/javascript';
import PropTypes from 'prop-types';
import { slotPropType } from 'shared/utils/propTypeSchemas';
import './TimetableSlot.css';

const propTypes = {
  item: slotPropType,
  onEdit: PropTypes.func.isRequired,
  slotDialogOpen: PropTypes.bool.isRequired
};

const Slot = ({ item, onEdit, slotDialogOpen }) => {
  const [textColor, setTextColor] = useState('white');
  const slotRef = useRef(null);

  useEffect(() => {
    // keep high contrast between color and backgroundColor so text is more visible to eyes
    const brightness = getBrightnessByHex(item.color);
    setTextColor(brightness > 125 ? 'black' : 'white');
  }, [item.color]);

  const handleEdit = () => {
    if (!slotDialogOpen) {
      onEdit(item.id);
    }
  };

  const colorStyles = {
    color: textColor,
    backgroundColor: item.color || '#fff'
  };

  const innerShadowClass = !slotDialogOpen
    ? ' inner-shadow-on-hover'
    : '';

  return (
    <div
      ref={slotRef}
      onClick={handleEdit}
      className={`d-flex flex-column align-items-center pt-2 timetable-slot${innerShadowClass}`}
      style={colorStyles}
    >
      {item.draggable &&
        <>
          <p className='fw-bold m-0'>{item.course}</p>
          <p className='mb-0'>{item.instructor || <>&nbsp;</>}</p>
          <p className='m-0'>{item.location}</p>
        </>
      }
    </div>
  );
};

Slot.propTypes = propTypes;

export default Slot;
