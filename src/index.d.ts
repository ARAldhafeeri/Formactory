import React from "react";

type FormConfig  = {
  form: {
    customComponent: React.FC<any>; 
    props: any; 
    data: any; 
    setData: any; 
  };
  schema: FormItem[];
};

type FormItem =  {
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
};