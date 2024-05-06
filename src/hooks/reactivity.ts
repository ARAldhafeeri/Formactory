import React, { useCallback, useEffect } from 'react'
import evaluateRule from '../Condtional'
import { FormConfig } from '../types';

const useFormReactivity = (settings : FormConfig,  dependencies : any[]) => {
  /*
    * @description A hook that evaluates conditional rules and mutates the form based on the condition.
    * @param settings FormConfig
    * @param dependencies Array<any>
    * @returns { formReactivity: FormConfig }
  */

  // local form state based on the schema
  const [formReactivity, setFormReactivity] = React.useState({...settings});
  

  
  useEffect(() => {
    // evaluate conditional rules and mutate form
    // when the condition is met
    settings.rules.forEach((rule) => {
      if (evaluateRule(rule.condition)){
        setFormReactivity(rule.action(formReactivity)):
      }
    });

// dependencies that the form will be reactive to
}, dependencies) 


  return { formReactivity }
}

export default useFormReactivity;