const {average} = require('../utils/for_testing');

describe('average', () => {
  test('of one value if the value itself', () => {
    const result = average([1]);

    expect(result).toBe(1);
  });
  test('of many is calculated right', () => {
    const result = average([1, 2, 3, 4, 5, 6]);
    expect(result).toBe(3.5);
  });
  test('of empty array is zero', () => {
    expect(average([])).toBe(0);
  });
});
