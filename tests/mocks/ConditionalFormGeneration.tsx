import React from 'react'
import { FormConfig } from '../../src/types';
import Emitter from '../../src/Events'
import { Formactory } from '../../src/index';

export default function ConditionalFormGeneration(props) {
  const emitter = new Emitter();

  const [data, setData] = React.useState({
    username: "",
    email: "",
    password: "",
    toggle: false,
    new: "",
  });

  const onToggleChange = (e) => {
    const value = e.target.checked;
    value ? emitter.emit("toggle:active") : emitter.emit("toggle:inactive");
    setData({...data, toggle: value});

  }

  const [schema , setSchema] = React.useState<FormConfig["schema"]>([
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
          onChange: onToggleChange,
        },
      },
]);

 
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
    schema : schema,

    rules: [
      {
          on: "toggle:active",
          "condition": data?.toggle === false,
          action: () => {
            setSchema((schema) => [...schema, 
              {
                name: "new",
                type: "input",
                key: "new",
                props: {
                  ["data-testid"]: "new-input",
                  className: "form-control",
                  placeholder: "Enter password",
                  type: "text",
                  onChange: (e) => setData({...data, new: e.target.value}),
                }
              }
            ]);
          },
    
      }, 
      {
          on: "toggle:inactive",
          "condition": data?.toggle === true,
          action: () => {
            setSchema((schema) => schema.filter((item) => item.key !== "new"));
          }
      }
    ],
}


  return (
    <Formactory {...userForm} emitter={emitter}/>
  )
}
