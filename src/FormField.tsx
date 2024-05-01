import React from 'react';
import { FormFieldProps, FormItem } from './types'

const renderField = (field: FormItem) => {
  switch (field.type) {
    case 'input':
      return <input {...field.props} />;
    case 'select':
      return <select {...field.props}>{field.children}</select>;
    case 'option':
      return <option {...field.props}>{field.children}</option>;
    case 'radio':
      return <input type="radio" {...field.props} />;
    case 'checkbox':
      return <input type="checkbox" {...field.props} />;
    case 'textarea':
      return <textarea {...field.props} />;
    case 'custom':
      return <field.component {...field.props} />;

    default:
      return null;
  }
};

const FieldChildren : React.FC<FormFieldProps> = ({ field, key }) => {
  return (
    <React.Fragment key={key}>
    {
      field.children && field.children.map((item, key) => (
          <>
          {item.label && (
              <label key={key} {...item.label.props}>
                {item.label.text} 
                {item.error && <span key={key} {...item.error.props}>{item.error.text}</span>}
              </label>
            )}
          {renderField(item)}
          </>
      ))
    }  
  </React.Fragment>  
  )
}

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
        <FieldChildren field={field}  key={`children-${key}`} />
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

