import React from 'react';
import { FormConfig, FormItem, Rule, rules } from './types';
import {FormField,  DefaultFormTags } from './FormField';
import reducerGenerator from './Reducer';
import evaluateRule from './Condtional';

const Formactory : React.FC<FormConfig> = ({ form, schema, rules  }) => {
  /**
   * FormTags is a custom component that will be used to render the form
   * If customComponent is not provided, DefaultFormTags will be used
   * DefaultFormTags is a form tags
   * formProps is a prop that will be passed to the custom component
   * formProps is a named prop that will be passed to the DefaultFormTags
   * @param {form|Object} form - form configuration
   * @param {schema|Array} schema - form fields
   * @returns {JSX.Element} - returns a form element based on the form configuration
   */


  const FormTags = React.useMemo(
    () => form.customComponent ? form.customComponent : DefaultFormTags,
     [form.customComponent]
  );

  const formRudcer = React.useMemo(
    () => reducerGenerator(rules ?? []), [rules]
  );
  
  // local form state based on the schema
  const [formState, dispatch] = React.useReducer(formRudcer, schema);



  React.useEffect(() => {
    rules?.forEach((rule : Rule ) => {
       if (evaluateRule(rule.condition)){
          dispatch({type: rule.on, payload: {formState: formState}});
       }
    });

}, [form?.props?.data]); 


  return (
    <FormTags {...(form.customComponent ? {...form.props} : {formProps : form.props})}>
      {/* iterate and render form fields */}
      {schema.map((field, key) => (
          <FormField field={field} key={`${key}`} />
      ))}
    </FormTags>
  );
};

export default Formactory;