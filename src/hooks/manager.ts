import { FormConfig, FormItem } from "../types";

const useFormMutator = () => {
  /**
   * Mutate formactory settings.
   */
  
  const appendField = (settings : FormConfig, field : FormItem ) => {
    /**
     * @description Append a new field to the schema.
     * @param settings FormConfig
     * @param field FormItem
     * @returns FormConfig
     * @example
     * const settings = {
     *  schema: [
     *   {name: 'name', type: 'text'},
     *  {name: 'email', type: 'email'}
     * ]};
     * appendField(settings, {name: 'password', type: 'password'});
     * @returns FormConfig
     */
    return {
      ...settings, schema: [...settings.schema, field]
    }
  };

  const removeField = (settings : FormConfig, fieldName : string) => {
    /**
     * @description Remove a field from the schema.
     * @param settings FormConfig
     * @param fieldName string
     * @returns FormConfig
     * @example
     * const settings = {
     * schema: [
     * {name: 'name', type: 'text'},
     * {name: 'email', type: 'email'}
     * ]};
     * removeField(settings, 'email');
     * @returns FormConfig
     */
    return {
      ...settings, schema: settings.schema.filter((field) => field.name !== fieldName)
    }
  };

  const fieldExists = (settings : FormConfig , fieldName : string ) => {
    /**
     * @description Check if a field exists in the schema.
     * @param settings FormConfig
     * @param fieldName string
     * @returns boolean
     * @example
     * const settings = {
     * schema: [
     * {name: 'name', type: 'text'},
     * {name: 'email', type: 'email'}
     * ]};
     * fieldExists(settings, 'email');
     * @returns boolean
     */
    return settings.schema.some((field) => field.name === fieldName);
  };

  const swapField = (settings : FormConfig, fielOneIndex : number, fieldTwoIndex: number) => {
    /**
     * @description Swap the position of two fields in the schema.
     * @param settings FormConfig
     * @param fielOneIndex number
     * @param fieldTwoIndex number
     * @returns FormConfig
     * @example
     * const settings = {
     * schema: [
     * {name: 'name', type: 'text'},
     * {name: 'email', type: 'email'}
     * ]};
     * swapField(settings, 0, 1);
     * @returns FormConfig
     */
    const schema = [...settings.schema];
    [schema[fielOneIndex], schema[fieldTwoIndex]] = [schema[fieldTwoIndex], schema[fielOneIndex]];
    return {...settings, schema};
  };


  const replaceField = (settings : FormConfig, fieldName : string, field : FormItem) => {
    /**
     * @description Replace a field in the schema.
     * @param settings FormConfig
     * @param fieldName string
     * @param field FormItem
     * @returns FormConfig
     * @example
     * const settings = {
     * schema: [
     * {name: 'name', type: 'text'},
     * {name: 'email', type: 'email'}
     * ]};
     * replaceField(settings, 'email', {name: 'password', type: 'password'});
     */
    return {
      ...settings, schema: settings.schema.map((f) => f.name === fieldName ? field : f)
    }
  }

  const appendProp = (settings : FormConfig, fieldName : string, name : string, value: any) => {
    /**
     * @description Append an attribute to a field.
     * @param settings FormConfig
     * @param fieldName string
     * @param attribute string
     * @param appendProp any
     * @returns FormConfig
     * @example
     * const settings = {
     * schema: [
     * {name: 'name', type: 'text'},
     * {name: 'email', type: 'email'}
     * ]}
     * 
     * appendAttribute(settings, 'email', 'required');
     * @returns FormConfig
    **/
    return {
      ...settings, schema: settings.schema.map((field) => field.name === fieldName ? {...field, [field.props]: {...field.props, name : value}} : field)
    }
  };

  const removeProp = (settings : FormConfig, fieldName : string, name : string) => {
    /**
     * @description Remove an attribute from a field.
     * @param settings FormConfig
     * @param fieldName string
     * @param name string
     * @returns FormConfig
     * @example
     * const settings = {
     * schema: [
     * {name: 'name', type: 'text'},
     * {name: 'email', type: 'email'}
     * ]}
     * // remove the required prop from the email field
     * removeAttribute(settings, 'email', 'required');
     * @returns FormConfig
     * */

    const field = settings.schema.find((field) => field.name === fieldName);
    field && delete field.props[name];
    return settings;
  };

  const updateProp = (settings : FormConfig, fieldName : string, name : string, value: any) => {
    /**
     * @description Update an attribute of a field.
     * @param settings FormConfig
     * @param fieldName string
     * @param name string
     * @param value any
     * @returns FormConfig
     * @example
     * const settings = {
     * schema: [
     * {name: 'name', type: 'text'},
     * {name: 'email', type: 'email'}
     * ]}
     * // update the required prop of the email field
     * updateAttribute(settings, 'email', 'required', true);
     * @returns FormConfig
     * */

    return {
      ...settings, schema: settings.schema.map((field) => field.name === fieldName ? {...field, [field.props]: {...field.props, name : value}} : field)
    };
  };

  return {
    appendField,
    removeField,
    fieldExists,
    swapField,
    replaceField
  };
  
};


export default useFormMutator;

