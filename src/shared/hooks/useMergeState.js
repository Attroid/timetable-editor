import { useState, useCallback } from 'react';

/**
 * Hook that acts like useState but brings merge feature
 * example:
 *  > console.log(state) | { course: '', color: '' }
 *  > mergeState({ course: 'S' })
 *  > console.log(state) | { course: 'S', color: '' }
 * @param { Object } initialState initial state
 * @returns { [0: Object, 1: Function] } 0: current state 1: function for state merging
 */
const useMergeState = initialState => {
  const [state, setState] = useState(initialState || {});

  const mergeState = useCallback(newState => {
    if (typeof newState === 'function') {
      setState(currentState => ({ ...currentState, ...newState(currentState) }));
    } else {
      setState(currentState => ({ ...currentState, ...newState }));
    }
  }, []);

  return [state, mergeState];
};

export default useMergeState;