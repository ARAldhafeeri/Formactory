import { FormConfig } from "./types"
const reducerGenerator = (rules : FormConfig["rules"]) =>{
  /**
   * ReducerGenerator is a function that will generate a reducer based on the rules
   * rules is an array of rules
   * @param {rules|Array} rules - array of rules
   * @returns {Function} - returns a reducer function
   */
  const dynamicSwitch = new Map<string, Function>();

  rules.forEach(rule => {
    dynamicSwitch.set(rule.on, rule.action);
  });
  return (state : any, action : any) => {
    /**
     * Reducer function that will handle the state changes based on the action type
     * state is the current state
     * action is an object that contains the type and payload
     * @param {state|Object} state - current state of the form
     * @param {action|Object} action - action that mutates the form schema
     * @returns {Object} - returns the new schema
     */
    
    const { type, payload } = action;
    const actionFunction = dynamicSwitch.get(type);
    const newState =  actionFunction ? actionFunction(payload?.formState) : state;
    return newState;
  }
}

export default reducerGenerator;