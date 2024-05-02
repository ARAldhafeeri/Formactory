import React from 'react';
import { FormFieldProps, FormItem } from './types'

const genKey =() => Math.random().toString(36).substring(7);;

const renderField = (field: FormItem) => {
  /**
   * renderField is a function that will render a form field based on the field type
   * field is an object that contains the field type, props, and children
   * @param {field|Object} field - form field
   * @returns {JSX.Element} - returns a form field based on the field type
   */
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
    case 'fieldset':
      return <fieldset {...field.props}>
        {field.fields.map((field, key) => (
          <FormField field={field} key={`${genKey()}`} />
        ))}
      </fieldset>;
    default:
       throw new Error(`Unsupported field type: ${field.type}`);
  }
};


export const FormField : React.FC<FormFieldProps> = ({field} ) => {
  /**
   * FormField is a function component that will render a form field or custom jsx, or fieldsets
   * field is an object that contains the field type, props, label, and error
   * key is a unique key for the form field
   * @param {field|Object} field - form field
   * @param {key|String} key - unique key for the form field
   */
  return (
    <React.Fragment key={genKey()}> {/* Wrapper for field, label, and error */}
        {field.label && (
          <label {...field.label.props} key={genKey()}>
            {field.label.text}
            {field.error && <span {...field.error.props}>{field.error.text}</span>}
          </label>
        )}
        {renderField(field)}
    </ React.Fragment>
  );
};

export const DefaultFormTags = ({children, formProps}) => {
  /**
   * DefaultFormTags is a function component that will render a form element
   * children is an array of form fields
   * formProps is a prop that will be passed to the form element
   * @param {children|Array} children - form fields
   * @param {formProps|Object} formProps - form props
   * @returns {JSX.Element} - returns a form element
   */
  return (
    <form {...formProps}>
      {...children}
    </form>
  );
}

