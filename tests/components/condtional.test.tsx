import evaluateRule from '../../src/Condtional';


let equals = {
  operator: "equal",
  values: [1, 1]
}

let diff = {
  operator: "equal",
  values: [1, 2]
}


describe('evaluateRule', () => {

  test('should return false', () => {
    expect(evaluateRule(equals)).toBe(true);
  });

  test('should return true', () => {
    expect(evaluateRule(diff)).toBe(false);
  });

  test('should throw an error', () => {
    try {
      evaluateRule({operator: "notSupported", values: [1, 2]});
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  test('should return true', () => {
    expect(evaluateRule({operator: "when", values: true})).toBe(true);
  });


  test('should return false', () => {
    expect(evaluateRule({operator: "when", values: false})).toBe(false);
  });

  test('should return true', () => {
    expect(evaluateRule({operator: "or", values: [true, false]})).toBe(true);
  });

  test('should return false', () => {
    expect(evaluateRule({operator: "or", values: [false, false]})).toBe(false);
  });

  test('should return true', () => {
    expect(evaluateRule({operator: "and", values: [true, true]})).toBe(true);
  });

  test('should return false', () => {
    expect(evaluateRule({operator: "and", values: [true, false]})).toBe(false);
  });

  test('should return true', () => {
    expect(evaluateRule({operator: "lessThanEqual", values: [1, 2]})).toBe(true);
  });

  test('should return true', () => {
    expect(evaluateRule({operator: "greaterThanEqual", values: [2, 2]})).toBe(true);
  });

  test('should return true', () => {
    expect(evaluateRule({operator: "notEqual", values: [1, 2]})).toBe(true);
  });

  test('should return false', () => {
    expect(evaluateRule({operator: "notEqual", values: [1, 1]})).toBe(false);
  });

  test('should return true', () => {
    expect(evaluateRule({operator: "lessThan", values: [1, 2]})).toBe(true);
  });

  test('should return false', () => {
    expect(evaluateRule({operator: "lessThan", values: [2, 2]})).toBe(false);
  });

  test('should return true', () => {
    expect(evaluateRule({operator: "greaterThan", values: [2, 1]})).toBe(true);
  });

  test('should return false', () => {
    expect(evaluateRule({operator: "greaterThan", values: [1, 1]})).toBe(false);
  });


  test('should return true', () => {
    expect(evaluateRule({operator: "equal", values: [1, 1]})).toBe(true);
  });

});
