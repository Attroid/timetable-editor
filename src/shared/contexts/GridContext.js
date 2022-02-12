import { useEffect } from 'react';
import { createContext } from 'react';
import { useMergeState } from 'shared/hooks';
import { generateEmptyTimeSlot } from 'shared/utils/javascript';
import Array2D from 'shared/utils/Array2D';

const GridContext = createContext();

export const GridProvider = ({ children, data, onChange }) => {
  // all context functions need to be placed in state in order
  // to GridProvider render everytime when grid is updating
  const [state, mergeState] = useMergeState({
    grid: data,
    moveItem,
    removeItem,
    findItemById,
    updateItem,
  });

  useEffect(() => {
    const event = {
      data: state.grid
    };

    onChange(event);
  }, [state.grid]);

  function moveItem(sourceId, destinationId) {
    mergeState(prevState => {
      const { grid } = prevState;
      const source = Array2D.findById(grid, sourceId);
      const destination = Array2D.findById(grid, destinationId);

      // If source/destination is unknown, do nothing.
      if (source === null || destination === null) {
        return;
      }

      return {
        grid: Array2D.swapElements(grid, source, destination)
      }
    });
  };

  function removeItem(slotId) {
    mergeState(prevState => {
      const { grid } = prevState;
      const emptySlot = generateEmptyTimeSlot(slotId);

      return {
        grid: Array2D.replaceItemById(grid, slotId, emptySlot)
      };
    });
  }

  function findItemById(slotId) {
    let result = null;
    
    // we need to use mergeState to use current state grid. returning {} does not effect current state
    mergeState(prevState => {
      const { grid } = prevState;
      const { y, x } = Array2D.findById(grid, slotId);
      result = {
        item: grid[y][x],
        rowIndex: y,
        columnIndex: x
      };

      return {};
    });

    return result;
  }

  function updateItem(slotId, update) {
    mergeState(prevState => {
      const { grid } = prevState;

      return {
        grid: Array2D.updateById(grid, slotId, update)
      };
    });
  }

  return (
    <GridContext.Provider value={state}>
      {children}
    </GridContext.Provider>
  );
};

export default GridContext;