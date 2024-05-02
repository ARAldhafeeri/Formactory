import React from 'react';
import { FormConfig, FormItem } from './types';
import {FormField,  DefaultFormTags } from './FormField';

const Formactory : React.FC<FormConfig> = ({ form, schema  }) => {
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
  const FormTags = form.customComponent ? form.customComponent : DefaultFormTags ;


  React.useEffect(() => {
    
}, [form?.props?.data, schema]); 


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