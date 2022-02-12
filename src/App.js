import Timetable from './Timetable';
import { useState } from 'react';
import { generateSampleData } from 'shared/utils/javascript';

const getInitialData = () => {
  const gridData = localStorage.getItem('grid_data');

  return typeof gridData === 'string'
    ? JSON.parse(gridData)
    : generateSampleData()
};

const App = () => {
  const [state, setState] = useState(getInitialData());

  const handleChange = (event) => {
    const { data } = event;

    localStorage.setItem('grid_data', JSON.stringify(data));
    setState(data);
  }

  return (
    <>
      <Timetable
        data={state}
        onChange={handleChange}
      />
    </>
  );
};

export default App;
