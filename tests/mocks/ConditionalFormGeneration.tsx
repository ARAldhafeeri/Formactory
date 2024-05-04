import React from 'react'
import { FormConfig } from '../../src/types';
import { Formactory } from '../../src/index';

export default function ConditionalFormGeneration(props) {

  const [data, setData] = React.useState({
    username: "",
    email: "",
    password: "",
    new: "",
  });
  const [toggle, setToggle] = React.useState(false);
 
const userForm : FormConfig = {
    form: {
      props : {
        className: "form-group",
        data: data,
        setData: setData,
        onCLick: props.onSubmit,
        ["data-testid"]:"user-form",
      },
    }, 
    schema : [
      {
        name: "username",
        key: "username", // Unique key for the field
        props: {
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
            ["data-testid"]: "toggle-input",
            className: "form-control",
            onChange:  (e) => setToggle(e.target.checked),
          },
        },
  ],
  rules : [
    {
      on: "showNewInput",
      condition: {operator: "equal", values: [toggle, true ]},
      action: function(schema) {
        return {
          schema: [...schema, {
            name: "new",
            type: "input",
            key: "new",
            props: {
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
          }]
        }
      }
    },
    {
      on: "hideNewInput",
      condition: {operator: "equal", values: [toggle, false ]},
      action: function (schema) { return schema.filter((field) => field.key !== "password")}
    }
  ]
}

  return (
    <Formactory {...userForm} />
  )
}
