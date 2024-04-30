import React from 'react';
import { FormConfig, FormItem } from './types';


const Formactory : React.FC<FormConfig> = ({ form, schema }) => {


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
  
  return (
   <>
   {form.customComponent ? (
    <form.customComponent {...form.props} >
      {schema.map((field, key) => (
          <>
          {field.label && (
            <label key={key} {...field.label.props}>
            {field.label.text}
            {field.error && <span {...field.error.props}>{field.error.text}</span>}          
            </label>      
          )}
          {renderField(field)}
          <div>
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
          </div>  
          </>
      ))}
    </form.customComponent>
   ) : (
    <form {...form.props} >
      {schema.map((field, key) => (
          <>
          {field.label && (
            <label key={key} {...field.label.props}>
            {field.label.text}
            {field.error && <span {...field.error.props}>{field.error.text}</span>}          
            </label>      
          )}
          {renderField(field)}
          <div>
            {
              field.children && field.children.map((item, key) => (
                  <>
                  {item.label && (
                      <label key={key} {...item.label.props}>
                        {item.label.text} 
                        {item.error && <span {...item.error.props}>{item.error.text}</span>}
                      </label>
                    )}
                  {renderField(item)}
                  </>
              ))

            }  
          </div>  
          </>
      ))}
    </form>
   )}
   </>
  );
};

export default Formactory;