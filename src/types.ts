import React from "react";

export interface FormConfig {
  form: {
    customComponent: React.FC<any>; 
    props: any; 
  };
  schema: FormItem[];
}

export interface FormItem {
  name: string;
  type: "input" | "select" | "radio" | "checkbox" | "option" |  "textarea" | "custom"; 
  label: {
    text: string;
    props: any;
  };
  error: {
    text: string;
    props : any;
  }
  props: any;
  children?: FormItem[]; // Or a more specific type
  component?: React.FC<any>; 
  key: string;
}

export interface FormFieldProps {
  field: FormItem;
  key: string;
}