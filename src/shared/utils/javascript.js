/**
 * Generetas new empty timeslot with default values and given id
 * @param { Number } } id for new timeslot
 * @returns { Object } new empty timeslot with given id
 */
export const generateEmptyTimeSlot = id => ({
  id,
  draggable: false,
  course: '',
  color: '#FFFFFF',
  instructor: '',
  location: ''
});

/**
 * Generetas initial grid data for timetable
 * @returns { Array.<Array> } initial grid data for timetable
 */
export const generateSampleData = () => {
  const data = [];

  for (let i = 0; i < 5*4; i++) {
    if (i % 5 === 0) data.push([]);

    data[Math.trunc(i / 5)].push(generateEmptyTimeSlot(i));  
  }

  return data;
};

/**
 * Converts hex colors to rgb values
 * @param { String } hex hex color code
 * @returns { { r: Number, g: Number, b: Number } | null } rgb values converted from given hex
 */
export function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Calculates brightness value of hex color code
 * @param { String } hex hex color code
 * @returns { Number } Number that tells given hex color code brightness from 0 to 255
 */
export function getBrightnessByHex(hex) {
  const { r, g, b } = hexToRgb(hex);
  return Math.round((r * 299 + g * 587 + b * 114) / 1000)
}