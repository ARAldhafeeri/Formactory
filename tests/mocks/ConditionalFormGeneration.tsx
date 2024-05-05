import React, { useEffect } from 'react'
import { FormConfig } from '../../src/types';
import { Formactory, evaluateRule, reducerGenerator, useFormMutator, useFormReactivity } from '../../src/index';
import { useForm, useFormContext } from 'react-hook-form';
    
export default function ConditionalFormGeneration(props) {
  const { appendFild, removeField, fieldExists } = useFormMutator();
  const { register, handleSubmit, formState, watch } = useForm({
    defaultValues: {
      username: "",
      email: "",
      toggle: false,
      new: "",
    },
  });

  const toggle  = watch('toggle', false)
  console.log('toggle', toggle)

  const ss = (data) => {
    console.log(data);
  }

  const settings = {
    form : {
      props : {
        onSubmit: handleSubmit(props.onSubmit || ss),
      },
    }, 
    schema : [
      {
        name: "username",
        type: "input",
        props: {
          ['data-testid']: "username-input",
          ...register("username"),
        },
        label: {
          text: "Username",
          props: {
            ['data-testid']: "username-label",
            className: "form-label",
          }
        },
        }, 
        {
          name: "email",
          type: "input",
          props: {
            ...register("email"),
          },
          label: {
            text: "Email",
            props: {
              ['data-testid']: "email-label",
              className: "form-label",
            }
          }
        },
        {
          name: "toggle",
          type: "checkbox",
          key: "toggle",
          props: {
            ['data-testid']: "toggle-input",
            ...register("toggle"),
          },
        },
        {
          "name": "submit",
          "type": "input",
          "key": "submit",
          "props": {
            "type": "submit",
            "name": "submit",
          },
        },
    ],
    rules: [
      {
        on: "showNewInput",
        condition: {operator: "equal", values: [toggle, true] },
        action: function(settings) {
          const field = {
            name: "new",
            type: "input",
            props: {
              type: "text",
              ['data-testid']: "new-input",
              ...register("new"),
            },
            label: {
              text: "New",
              props: {
              }
            }
          };

          return fieldExists(settings, "new") ? settings : appendFild(settings, field);
        }
    },
      {
        on: "hideNewInput",
        condition: {operator: "equal", values: [toggle, false]},
        action: function(settings) {
          return fieldExists(settings, "new") ? removeField(settings, "new") : settings;
        }
      },
    ]
  };


  const { formReactivity } = useFormReactivity(settings, [toggle]);
  console.count("ConditionalFormGeneration");
  return (
    <Formactory form={formReactivity.form} schema={formReactivity.schema} />
  )
}