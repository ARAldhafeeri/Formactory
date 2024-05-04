import React from "react";

export interface FormConfig {
  form: {
    customComponent?: any; 
    props: any; 
  };
  schema: FormItem[];
  rules?: rules;
}

export interface FormItem {
  name: string;
  type: string;
  label?: {
    text: string;
    props: any;
  };
  error?: {
    text: string;
    props : any;
  }
  props: any;
  children?: React.ReactNode; // Or a more specific type
  component?: React.FC<any> | string; 
  key?: string;
  fields?: FormItem[];
}

export interface FormFieldProps {
  field: FormItem;
  key: string;
}

export type Rule = {
  on: string;
  condition: {operator: string, values: any};
  action: Function;
};

export type rules = Rule[];