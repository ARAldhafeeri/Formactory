import React from 'react';
import { FormConfig, FormItem } from './types';
import {FormField,  DefaultFormTags } from './FormField';


const Formactory : React.FC<FormConfig> = ({ form, schema }) => {

  const FormTags = form.customComponent ? form.customComponent : DefaultFormTags ;
  
  return (
    <FormTags {...(form.customComponent ? {...form.props} : {formProps : form.props})}>
      {schema.map((field, key) => (
          <FormField field={field} key={`${key}`} />
      ))}
    </FormTags>
  );
};

export default Formactory;