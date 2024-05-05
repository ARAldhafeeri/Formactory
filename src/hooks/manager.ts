import { FormConfig, FormItem } from "../types";

const useFormMutator = () => {
  /**
   * Mutate formactory settings.
   */
  
  const appendFild = (settings : FormConfig, field : FormItem ) => {
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

  return {
    appendFild,
    removeField,
    fieldExists,
    swapField,
    replaceField
  };
  
};

export default useFormMutator;

