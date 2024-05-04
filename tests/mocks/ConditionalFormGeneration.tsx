import React, { useEffect } from 'react'
import { FormConfig } from '../../src/types';
import { Formactory, evaluateRule, reducerGenerator } from '../../src/index';

const useFormReactivity = () => {
  const [ data , setData ] = React.useState({});
  const [ toggle, setToggle ] = React.useState(false);

  const handleSubmit  = (e) => {
    e.preventDefault();
    console.log(data);
  }

  const handleFormChange = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  }

  const settings = {
    form : {
      props : {
        className: "form-group",
        data: data,
        onCLick: handleFormChange,
        ["data-testid"]:"user-form",
      },
    }, 
    schema : [
      {
        name: "username",
        key: "username", // Unique key for the field
        props: {
          name: "username",
          ["data-testid"]: "username-input",
          className: "form-control",
          placeholder: "Enter username",
          type: "text",
          onChange: (e) => setData({...data, username: e.target.value}),
        },
        type: "input",
        label: {
          text: "Username",
          props: {
            ["data-testid"]: "username-label", // Unique key for the label
            className: "form-label",
          }
        },
        }, 
        {
          name: "email",
          type: "input",
          key: "email",
          props: {
            name: "email",
            ["data-testid"]: "email-input",
            className: "form-control",
            placeholder: "Enter email",
            type: "email",
            onChange: (e) => setData({...data, email: e.target.value}),
          },
          label: {
            text: "Email",
            props: {
              ["data-testid"]: "email-label",
              className: "form-label",
            }
          }
        },
        {
          name: "toggle",
          type: "checkbox",
          key: "toggle",
          props: {
            name: "toggle",
            ["data-testid"]: "toggle-input",
            className: "form-control",
            onChange:  (e) => setToggle((prev) => !prev),
          },
        },
    ],
    rules: [
      {
        on: "showNewInput",
        condition: {operator: "equal", values: [toggle, true ]},
        action: function(settings) {
          return {
            ...settings , 
            schema: [
              ...settings.schema, {
                name: "new",
                type: "input",
                props: {
                  name: "new",
                  ["data-testid"]: "new-input",
                  className: "form-control",
                  placeholder: "Enter new",
                  type: "text",
                  onChange: (e) => setData({...data, new: e.target.value}),
                },
                label: {
                  text: "New",
                  props: {
                    ["data-testid"]: "new-label",
                    className: "form-label",
                  }
                }
              }
            ]
          }
        },
    },
      {
        on: "hideNewInput",
        condition: {operator: "equal", values: [toggle, false ]},
        action: function (settings) { 
          return {
          ...settings, schema: settings.schema.filter((field) => field.name !== "new")
          }
        }
      },
    ]
  }

    // generate reducer based on the rules
    const formRudcer = reducerGenerator(settings.rules);
    
    // local form state based on the schema
    const [formReactivity, mutator] = React.useReducer(formRudcer,settings);
    
    useEffect(() => {
        // evaluate conditional rules and mutate form
        settings.rules.forEach((rule) => {
          if (evaluateRule(rule.condition)){
          mutator({type: rule.on, payload: {formState: formReactivity}});
          }
      });
    }, [data, toggle]) 

    return { formReactivity }
}

export default function ConditionalFormGeneration(props) {
  props?.onSubmit && props.onSubmit();
  const { formReactivity } = useFormReactivity();
  return (
    <Formactory form={formReactivity.form} schema={formReactivity.schema} />
  )
}
