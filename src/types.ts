import React from "react";

export interface FormConfig {
  form: {
    customComponent?: any; 
    props: any; 
  };
  schema: FormItem[];
  rules?: Config;
  emitter?: IEmitter;
}

export interface FormItem {
  name: string;
  type: "input" | "select" | "radio" | "checkbox" | "option" |  "textarea" | "custom" | "fieldset"; 
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

export interface IEmitter {
  on(event: string, callback: Function): void;
  off(event: string, callback: Function): void;
  emit(event: string, ...args: any[]): void;
}



type Rule = {
  on: string;
  condition: boolean;
  action: Function;
};

export type Config = Rule[];