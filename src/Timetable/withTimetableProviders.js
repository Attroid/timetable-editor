import { GridProvider } from 'shared/contexts/GridContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'

const withTimeTableProviders = (Component) => ({ data, onChange }) => (
  <DndProvider backend={HTML5Backend}>
    <GridProvider data={data} onChange={onChange}>
      <Component />
    </GridProvider>
  </DndProvider>
);

export default withTimeTableProviders;