import { useContext, useState, useLayoutEffect } from 'react';
import { GridContext } from 'shared/contexts';
import Draggable from './Draggable';
import { Table } from 'react-bootstrap';
import Slot from './Slot';
import DraggableTd from './DraggableTd';
import withTimeTableProviders from './withTimetableProviders';
import SlotDialog from './SlotDialog';

const thElements = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
const leftColumnElements = ['8:15 - 9:00', '9:15 - 10:00', '10:15 - 11:00', '11:15 - 12:00'];

const Timetable = () => {
  const { grid, moveItem, removeItem, updateItem } = useContext(GridContext);

  const [slotDialogOpen, setSlotDialogOpen] = useState(false);
  const [slotIdForEdit, setSlotIdForEdit] = useState(null);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    const updateSize = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const dropCondition = (itemToDrop, destinationItem) => {
    return itemToDrop.id !== destinationItem.id && destinationItem.draggable === false;
  };

  const dragCondition = (itemToDrag) => {
    return itemToDrag.draggable;
  };

  const closeSlotDialog = () => {
    setSlotDialogOpen(false);
    setSlotIdForEdit(null);
  };

  const openSlotDialog = () => {
    setSlotDialogOpen(true);
  };

  const handleSlotEdit = (slotId) => {
    setSlotIdForEdit(slotId);
    openSlotDialog();
  };

  const handleUpdate = (data) => {
    updateItem(slotIdForEdit, data);
    closeSlotDialog();
  };

  const handleDelete = (slotId) => {
    removeItem(slotId);
    closeSlotDialog();
  };

  if (innerWidth < 1000) {
    return (
      <div className='d-flex flex-column align-items-center pt-5'>
        <h3 className='text-center p-3'>Your device needs to be atleast 1000px wide</h3>
      </div>
    )
  }

  return (
    <div className='d-flex flex-column align-items-center pt-5 position-relative'>
      <Table
        className='w-75'
        bordered
        style={{
          minWidth: 1000,
          maxWidth: 1000,
          tableLayout: 'fixed'
        }}
      >
        <thead>
          <tr>
            <th />
            {thElements.map((str, index) => <th key={index}>{str}</th>)}
          </tr>
        </thead>
        <tbody>
          {grid.map((row, rowIndex) =>
            <tr key={rowIndex}>
              <td>
                {leftColumnElements[rowIndex]}
              </td>
              {row.map(cell => 
                <Draggable
                  key={cell.id}
                  item={cell}
                  onMoveItem={moveItem}
                  dropCondition={dropCondition}
                  dragCondition={dragCondition}
                  type='TIMETABLE_SLOT'
                >
                  <DraggableTd columns={row.length + 1}>
                    <Slot
                      item={cell}
                      onEdit={handleSlotEdit}
                      slotDialogOpen={slotDialogOpen}
                    />
                  </DraggableTd>
                </Draggable>
              )}
            </tr>
          )}
        </tbody>
      </Table>

      {slotDialogOpen &&
        <SlotDialog
          onClose={closeSlotDialog}
          onSubmit={handleUpdate}
          onDelete={handleDelete}
          slotId={slotIdForEdit}
          leftColumnElements={leftColumnElements}
          thElements={thElements}
        />
      }
    </div>
  );
};

export default withTimeTableProviders(Timetable);