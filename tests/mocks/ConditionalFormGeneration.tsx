import React from 'react'
import { FormConfig } from '../../src/types';
import { Formactory } from '../../src/index';

export default function ConditionalFormGeneration(props) {

  const [data, setData] = React.useState({
    username: "",
    email: "",
    password: "",
    toggle: false,
    new: "",
  });

  const handleToggle = (e) => {
    setData({...data, toggle: e.target.checked});
    setSchema([
      ...schema,
      {
        name: "password",
        type: "input",
        key: "password",
        props: {
          ["data-testid"]: "new-input",
          className: "form-control",
          placeholder: "Enter password",
          type: "password",
          onChange: (e) => setData({...data, password: e.target.value}),
        },
        label: {
          text: "Password",
          props: {
            ["data-testid"]: "password-label",
            className: "form-label",
          }
        }
      }
    ])
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
          onChange:  handleToggle,
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
}


  return (
    <Formactory {...userForm} />
  )
}
