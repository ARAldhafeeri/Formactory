const evaluateRule = (condition) => {
  /**
   * Evaluate the condition based on the operator and values
   * @param {condition|Object} condition - condition to evaluate
   * @returns {boolean} - returns the result of the evaluation
   * @throws {Error} - throws an error if the operator is not supported
   * @example
   * const condition = {
   *  operator: "greaterThan",
   * values: [1, 2]
   * }
   * evaluateRule(condition) // returns false
   * @example
   * const condition = {
   * operator: "when",
   * values: toggle // asumming toggle is a boolean and is true
   * }
   * 
   */
    const { operator, values } = condition;

    let a : any;
    let b : any;

    Array.isArray(values) && ([a,b] = values);

    switch (operator) {
      case "greaterThan":
        return a > b;
      case "lessThan":
        return a < b;
      case "equal": // Handle strict equality for consistency
        return a === b;
      case "notEqual":
        return a !== b;
      case "greaterThanEqual":
        return a >= b;
      case "lessThanEqual":
        return a <= b;
      case 'or':
        return a || b;
      case 'and':
        return a && b;
      case 'when':
        return values;
      default:
        // Throw error for unsupported operators
        throw new Error(`Unsupported operator: ${operator}`);
    }
};

export default evaluateRule;