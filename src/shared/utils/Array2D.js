const Array2D = {
  /**
   * Returns new grid where two items are swapped without mutating original array
   * @param { Array.<Array> } grid multidimensional array from which items are searched
   * @param { { x: Number, y: Number } } a location a item that will be swapped with location b item
   * @param { { x: Number, y: Number } } b location b item that will be swapped with location a item
   * @returns { Array.<Array> } new grid where a and b items are swapped
   */
  swapElements: (grid, a, b) => {
    const c = grid.slice(0);
    [c[a.y][a.x], c[b.y][b.x]] = [c[b.y][b.x], c[a.y][a.x]];
    return c;
  },

  /**
   * Find location of item by id
   * @param { Array.<Array> } grid multidimensional array from which item is searched
   * @param { Number|String } id id of element that is being searched
   * @returns { { x: Number, y: Number } | null } location of item that was searched / null if not found
   */
  findById: (grid, id) => {
    const gridDepth = grid.length;
    const gridWidth = grid[0].length;

    for (let y = 0; y < gridDepth; y++) {
      for (let x = 0; x < gridWidth; x++) {
        if (grid[y][x].id === id) return { y, x };
      }
    }

    return null;
  },

  /**
   * Updates item in grid by id. Only replaces values from given update object fields
   * @param { Array.<Array> } grid multidimensional array
   * @param { Number|String } id id of element that is being updated
   * @param { Object } update fields to update from item that has given id
   * @returns { Array.<Array> } new grid where item with given id is updated by given values
   */
  updateById: (grid, id, update) => {
    return grid.map(row =>
      row.map(item =>
        item.id === id
          ? { ...item, ...update }
          : item
      )
    );
  },

  /**
   * Replaces item in grid by id
   * @param { Array.<Array> } grid multidimensional array
   * @param { Number|String } id id of element that is being replaced
   * @param { Object } itemForReplace new item that is going to replace item with given id
   * @returns { Array.<Array> } new grid where item with given id is replaced with given item
   */
  replaceItemById: (grid, id, itemForReplace) => {
    return grid.map(row =>
      row.map(item =>
        item.id === id
          ? itemForReplace
          : item
      )
    );
  }
};

export default Array2D;
