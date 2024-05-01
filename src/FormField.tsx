import React from 'react';
import { FormFieldProps, FormItem } from './types'

const renderField = (field: FormItem) => {
  switch (field.type) {
    case 'input':
      return field.children ? <input {...field.props}> {field.children} </input> : <input {...field.props} />;
    case 'select':
      return <select {...field.props}>{field.children}</select>;
    case 'option':
      return field.children ? <option {...field.props}> {field.children} </option> : <option {...field.props} />;
    case 'radio':
      return field.children ? <input type="radio" {...field.props}> {field.children} </input> : <input type="radio" {...field.props} />;
    case 'checkbox':
      return field.children ? <input type="checkbox" {...field.props}> {field.children} </input> : <input type="checkbox" {...field.props} />;
    case 'textarea':
      return field.children ? <textarea {...field.props}> {field.children} </textarea> : <textarea {...field.props} />;
    case 'custom':
      return field.children ? <field.component {...field.props}> {field.children} </field.component> : <field.component {...field.props} />;
    default:
      return null;
  }
};


export const FormField : React.FC<FormFieldProps> = ({field, key} ) => {
  return (
    <React.Fragment key={key}> {/* Wrapper for field, label, and error */}
        {field.label && (
          <label {...field.label.props}>
            {field.label.text}
            {field.error && <span {...field.error.props}>{field.error.text}</span>}
          </label>
        )}
        {renderField(field)}
    </ React.Fragment>
  );
};

export const DefaultFormTags = ({children, formProps}) => {
  return (
    <form {...formProps}>
      {...children}
    </form>
  );
}

