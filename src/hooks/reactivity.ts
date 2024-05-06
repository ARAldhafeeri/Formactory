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
  
  const evaluateAndSet = useCallback((rule) => {
    
    setTimeout(() => {

    if (evaluateRule(rule.condition)){
      setFormReactivity( (prevSettings) => ({ 
        ...prevSettings,
        schema : rule.action(prevSettings).schema
      })
      );
    }
  }, 0);

  }, [dependencies] );

  // local form state based on the schema
  const [formReactivity, setFormReactivity] = React.useState({...settings});
  
  useEffect(() => {
    // evaluate conditional rules and mutate form
    // when the condition is met
    settings.rules.forEach(evaluateAndSet);    

// dependencies that the form will be reactive to
}, dependencies) 


  return { formReactivity }
}

export default useFormReactivity;