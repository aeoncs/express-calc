const { calculateMean, calculateMedian, calculateMode } = require('./helpers');

describe("calculateMean", () => {
  test("calculates the mean of a list of numbers", () => {
    const result = calculateMean([1, 2, 3, 4, 5]);
    expect(result).toBe(3);
  });

  test("returns correct mean for decimal numbers", () => {
    const result = calculateMean([1.5, 2.5, 3.5]);
    expect(result).toBeCloseTo(2.5);
  });
});

describe("calculateMedian", () => {
  test("calculates the median of odd-length list", () => {
    const result = calculateMedian([1, 3, 2]);
    expect(result).toBe(2);
  });

  test("calculates the median of even-length list", () => {
    const result = calculateMedian([1, 2, 3, 4]);
    expect(result).toBe(2.5);
  });
});

describe("calculateMode", () => {
  test("returns the mode for one most frequent number", () => {
    const result = calculateMode([1, 1, 2, 3]);
    expect(result).toBe(1);
  });

  test("returns multiple modes if tied", () => {
    const result = calculateMode([1, 1, 2, 2, 3]);
    expect(result).toEqual([1, 2]);
  });

  test("returns 'No mode' if all numbers occur equally", () => {
    const result = calculateMode([1, 2, 3]);
    expect(result).toBe("No mode");
  });
});
